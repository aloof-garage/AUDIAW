//! Audio file decoder using Symphonia
//!
//! Supports WAV and MP3 file formats, decoding them to PCM samples.

use audiaw_types::*;
use std::fs::File;
use std::path::Path;
use symphonia::core::audio::{AudioBufferRef, Signal};
use symphonia::core::codecs::{DecoderOptions, CODEC_TYPE_NULL};
use symphonia::core::errors::Error as SymphoniaError;
use symphonia::core::formats::FormatOptions;
use symphonia::core::io::MediaSourceStream;
use symphonia::core::meta::MetadataOptions;
use symphonia::core::probe::Hint;
use tracing::{error, info};

/// Decode an audio file to PCM samples
pub fn decode_audio_file<P: AsRef<Path>>(path: P) -> AudioResult<(Vec<Sample>, AudioMetadata)> {
    let path = path.as_ref();
    
    // Open the file
    let file = File::open(path)
        .map_err(|e| AudioError::IoError(format!("Failed to open file: {}", e)))?;
    
    // Create media source stream
    let mss = MediaSourceStream::new(Box::new(file), Default::default());
    
    // Create a hint to help the format registry guess the format
    let mut hint = Hint::new();
    if let Some(extension) = path.extension() {
        if let Some(ext_str) = extension.to_str() {
            hint.with_extension(ext_str);
        }
    }
    
    // Probe the media source
    let probed = symphonia::default::get_probe()
        .format(&hint, mss, &FormatOptions::default(), &MetadataOptions::default())
        .map_err(|e| AudioError::InvalidFormat(format!("Failed to probe file: {}", e)))?;
    
    let mut format = probed.format;
    
    // Find the default audio track
    let track = format
        .tracks()
        .iter()
        .find(|t| t.codec_params.codec != CODEC_TYPE_NULL)
        .ok_or_else(|| AudioError::InvalidFormat("No audio tracks found".to_string()))?;
    
    let track_id = track.id;
    let codec_params = &track.codec_params;
    
    // Get metadata
    let sample_rate = codec_params
        .sample_rate
        .ok_or_else(|| AudioError::InvalidFormat("Sample rate not found".to_string()))?;
    
    let channels = codec_params
        .channels
        .ok_or_else(|| AudioError::InvalidFormat("Channel count not found".to_string()))?
        .count();
    
    let bit_depth = codec_params.bits_per_sample;
    
    info!(
        "Decoding audio file: {} Hz, {} channels",
        sample_rate, channels
    );
    
    // Create decoder
    let mut decoder = symphonia::default::get_codecs()
        .make(&codec_params, &DecoderOptions::default())
        .map_err(|e| AudioError::InvalidFormat(format!("Failed to create decoder: {}", e)))?;
    
    // Decode all packets
    let mut samples = Vec::new();
    let mut total_frames = 0u64;
    
    loop {
        // Get the next packet
        let packet = match format.next_packet() {
            Ok(packet) => packet,
            Err(SymphoniaError::IoError(e)) if e.kind() == std::io::ErrorKind::UnexpectedEof => {
                break;
            }
            Err(e) => {
                error!("Error reading packet: {}", e);
                break;
            }
        };
        
        // Skip packets that don't belong to the selected track
        if packet.track_id() != track_id {
            continue;
        }
        
        // Decode the packet
        match decoder.decode(&packet) {
            Ok(decoded) => {
                // Convert to f32 samples
                let converted = convert_audio_buffer(decoded)?;
                total_frames += (converted.len() / channels) as u64;
                samples.extend(converted);
            }
            Err(SymphoniaError::DecodeError(e)) => {
                error!("Decode error: {}", e);
                continue;
            }
            Err(e) => {
                return Err(AudioError::InvalidFormat(format!("Decode failed: {}", e)));
            }
        }
    }
    
    let duration_seconds = total_frames as f64 / sample_rate as f64;
    
    let metadata = AudioMetadata {
        sample_rate,
        channels,
        duration_samples: total_frames,
        duration_seconds,
        format: get_format_name(path),
        bit_depth,
    };
    
    info!(
        "Decoded {} samples ({:.2}s)",
        samples.len(),
        duration_seconds
    );
    
    Ok((samples, metadata))
}

/// Convert Symphonia audio buffer to f32 samples
fn convert_audio_buffer(buffer: AudioBufferRef) -> AudioResult<Vec<Sample>> {
    match buffer {
        AudioBufferRef::F32(buf) => {
            // Already f32, just copy
            let mut samples = Vec::with_capacity(buf.frames() * buf.spec().channels.count());
            for plane in buf.planes().planes() {
                samples.extend_from_slice(plane);
            }
            Ok(samples)
        }
        AudioBufferRef::F64(buf) => {
            // Convert f64 to f32
            let mut samples = Vec::with_capacity(buf.frames() * buf.spec().channels.count());
            for plane in buf.planes().planes() {
                samples.extend(plane.iter().map(|&s| s as f32));
            }
            Ok(samples)
        }
        AudioBufferRef::S32(buf) => {
            // Convert i32 to f32 (normalize to -1.0 to 1.0)
            let mut samples = Vec::with_capacity(buf.frames() * buf.spec().channels.count());
            for plane in buf.planes().planes() {
                samples.extend(plane.iter().map(|&s| s as f32 / i32::MAX as f32));
            }
            Ok(samples)
        }
        AudioBufferRef::S16(buf) => {
            // Convert i16 to f32 (normalize to -1.0 to 1.0)
            let mut samples = Vec::with_capacity(buf.frames() * buf.spec().channels.count());
            for plane in buf.planes().planes() {
                samples.extend(plane.iter().map(|&s| s as f32 / i16::MAX as f32));
            }
            Ok(samples)
        }
        AudioBufferRef::S8(buf) => {
            // Convert i8 to f32 (normalize to -1.0 to 1.0)
            let mut samples = Vec::with_capacity(buf.frames() * buf.spec().channels.count());
            for plane in buf.planes().planes() {
                samples.extend(plane.iter().map(|&s| s as f32 / i8::MAX as f32));
            }
            Ok(samples)
        }
        AudioBufferRef::U32(buf) => {
            // Convert u32 to f32 (normalize to -1.0 to 1.0)
            let mut samples = Vec::with_capacity(buf.frames() * buf.spec().channels.count());
            for plane in buf.planes().planes() {
                samples.extend(plane.iter().map(|&s| {
                    let normalized = s as f32 / u32::MAX as f32;
                    (normalized * 2.0) - 1.0
                }));
            }
            Ok(samples)
        }
        AudioBufferRef::U16(buf) => {
            // Convert u16 to f32 (normalize to -1.0 to 1.0)
            let mut samples = Vec::with_capacity(buf.frames() * buf.spec().channels.count());
            for plane in buf.planes().planes() {
                samples.extend(plane.iter().map(|&s| {
                    let normalized = s as f32 / u16::MAX as f32;
                    (normalized * 2.0) - 1.0
                }));
            }
            Ok(samples)
        }
        AudioBufferRef::U8(buf) => {
            // Convert u8 to f32 (normalize to -1.0 to 1.0)
            let mut samples = Vec::with_capacity(buf.frames() * buf.spec().channels.count());
            for plane in buf.planes().planes() {
                samples.extend(plane.iter().map(|&s| {
                    let normalized = s as f32 / u8::MAX as f32;
                    (normalized * 2.0) - 1.0
                }));
            }
            Ok(samples)
        }
        AudioBufferRef::U24(buf) => {
            // Convert u24 to f32 (normalize to -1.0 to 1.0)
            let mut samples = Vec::with_capacity(buf.frames() * buf.spec().channels.count());
            for plane in buf.planes().planes() {
                samples.extend(plane.iter().map(|s| {
                    let value = s.inner() as f32 / 8388607.0; // 2^23 - 1
                    (value * 2.0) - 1.0
                }));
            }
            Ok(samples)
        }
        AudioBufferRef::S24(buf) => {
            // Convert i24 to f32 (normalize to -1.0 to 1.0)
            let mut samples = Vec::with_capacity(buf.frames() * buf.spec().channels.count());
            for plane in buf.planes().planes() {
                samples.extend(plane.iter().map(|s| {
                    s.inner() as f32 / 8388607.0 // 2^23 - 1
                }));
            }
            Ok(samples)
        }
    }
}

/// Get format name from file extension
fn get_format_name<P: AsRef<Path>>(path: P) -> String {
    path.as_ref()
        .extension()
        .and_then(|ext| ext.to_str())
        .map(|ext| ext.to_uppercase())
        .unwrap_or_else(|| "UNKNOWN".to_string())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Write;
    use tempfile::NamedTempFile;

    /// Helper function to create a simple WAV file for testing
    /// Creates a mono WAV file with a sine wave
    fn create_test_wav_file(sample_rate: u32, duration_samples: u32, channels: u16) -> NamedTempFile {
        let mut temp_file = tempfile::Builder::new()
            .suffix(".wav")
            .tempfile()
            .unwrap();
        
        // WAV header
        let data_size = duration_samples * channels as u32 * 2; // 16-bit samples
        let file_size = 36 + data_size;
        
        // RIFF header
        temp_file.write_all(b"RIFF").unwrap();
        temp_file.write_all(&file_size.to_le_bytes()).unwrap();
        temp_file.write_all(b"WAVE").unwrap();
        
        // fmt chunk
        temp_file.write_all(b"fmt ").unwrap();
        temp_file.write_all(&16u32.to_le_bytes()).unwrap(); // fmt chunk size
        temp_file.write_all(&1u16.to_le_bytes()).unwrap(); // PCM format
        temp_file.write_all(&channels.to_le_bytes()).unwrap();
        temp_file.write_all(&sample_rate.to_le_bytes()).unwrap();
        let byte_rate = sample_rate * channels as u32 * 2;
        temp_file.write_all(&byte_rate.to_le_bytes()).unwrap();
        let block_align = channels * 2;
        temp_file.write_all(&block_align.to_le_bytes()).unwrap();
        temp_file.write_all(&16u16.to_le_bytes()).unwrap(); // bits per sample
        
        // data chunk
        temp_file.write_all(b"data").unwrap();
        temp_file.write_all(&data_size.to_le_bytes()).unwrap();
        
        // Generate simple sine wave data
        for i in 0..duration_samples {
            for _ in 0..channels {
                let t = i as f32 / sample_rate as f32;
                let frequency = 440.0; // A4 note
                let sample = (t * frequency * 2.0 * std::f32::consts::PI).sin();
                let sample_i16 = (sample * i16::MAX as f32) as i16;
                temp_file.write_all(&sample_i16.to_le_bytes()).unwrap();
            }
        }
        
        temp_file.flush().unwrap();
        temp_file
    }

    #[test]
    fn test_get_format_name() {
        assert_eq!(get_format_name("test.wav"), "WAV");
        assert_eq!(get_format_name("test.mp3"), "MP3");
        assert_eq!(get_format_name("test.flac"), "FLAC");
        assert_eq!(get_format_name("test"), "UNKNOWN");
    }

    #[test]
    fn test_get_format_name_case_insensitive() {
        assert_eq!(get_format_name("test.WAV"), "WAV");
        assert_eq!(get_format_name("test.Mp3"), "MP3");
    }

    #[test]
    fn test_get_format_name_with_path() {
        assert_eq!(get_format_name("/path/to/file.wav"), "WAV");
        assert_eq!(get_format_name("C:\\path\\to\\file.mp3"), "MP3");
    }

    #[test]
    fn test_decode_wav_mono() {
        let temp_file = create_test_wav_file(48000, 1000, 1);
        let path = temp_file.path();
        
        let result = decode_audio_file(path);
        assert!(result.is_ok());
        
        let (samples, metadata) = result.unwrap();
        assert_eq!(metadata.sample_rate, 48000);
        assert_eq!(metadata.channels, 1);
        assert_eq!(metadata.format, "WAV");
        assert!(samples.len() > 0);
        assert_eq!(samples.len(), 1000); // 1000 samples for mono
    }

    #[test]
    fn test_decode_wav_stereo() {
        let temp_file = create_test_wav_file(48000, 1000, 2);
        let path = temp_file.path();
        
        let result = decode_audio_file(path);
        assert!(result.is_ok());
        
        let (samples, metadata) = result.unwrap();
        assert_eq!(metadata.sample_rate, 48000);
        assert_eq!(metadata.channels, 2);
        assert_eq!(metadata.format, "WAV");
        assert_eq!(samples.len(), 2000); // 1000 frames * 2 channels
    }

    #[test]
    fn test_decode_wav_44100() {
        let temp_file = create_test_wav_file(44100, 500, 2);
        let path = temp_file.path();
        
        let result = decode_audio_file(path);
        assert!(result.is_ok());
        
        let (_samples, metadata) = result.unwrap();
        assert_eq!(metadata.sample_rate, 44100);
        assert_eq!(metadata.channels, 2);
    }

    #[test]
    fn test_decode_metadata_duration() {
        let sample_rate = 48000;
        let duration_samples = 48000; // 1 second
        let temp_file = create_test_wav_file(sample_rate, duration_samples, 2);
        let path = temp_file.path();
        
        let result = decode_audio_file(path);
        assert!(result.is_ok());
        
        let (_, metadata) = result.unwrap();
        assert_eq!(metadata.duration_samples, duration_samples as u64);
        
        // Duration should be approximately 1 second
        let duration_seconds = metadata.duration_seconds;
        assert!((duration_seconds - 1.0).abs() < 0.01);
    }

    #[test]
    fn test_decode_sample_values_in_range() {
        let temp_file = create_test_wav_file(48000, 1000, 2);
        let path = temp_file.path();
        
        let result = decode_audio_file(path);
        assert!(result.is_ok());
        
        let (samples, _) = result.unwrap();
        
        // All samples should be in the range -1.0 to 1.0
        for sample in samples.iter() {
            assert!(sample >= &-1.0 && sample <= &1.0, "Sample out of range: {}", sample);
        }
    }

    #[test]
    fn test_decode_nonexistent_file() {
        let result = decode_audio_file("nonexistent_file.wav");
        assert!(result.is_err());
        
        match result {
            Err(AudioError::IoError(_)) => {},
            _ => panic!("Expected IoError"),
        }
    }

    #[test]
    fn test_decode_invalid_file() {
        let mut temp_file = NamedTempFile::new().unwrap();
        temp_file.write_all(b"This is not a valid audio file").unwrap();
        temp_file.flush().unwrap();
        
        let result = decode_audio_file(temp_file.path());
        assert!(result.is_err());
        
        match result {
            Err(AudioError::InvalidFormat(_)) => {},
            _ => panic!("Expected InvalidFormat error"),
        }
    }

    #[test]
    fn test_decode_empty_file() {
        let temp_file = NamedTempFile::new().unwrap();
        
        let result = decode_audio_file(temp_file.path());
        assert!(result.is_err());
    }

    #[test]
    fn test_decode_truncated_wav() {
        let mut temp_file = NamedTempFile::new().unwrap();
        // Write only partial WAV header
        temp_file.write_all(b"RIFF").unwrap();
        temp_file.write_all(&100u32.to_le_bytes()).unwrap();
        temp_file.flush().unwrap();
        
        let result = decode_audio_file(temp_file.path());
        assert!(result.is_err());
    }

    #[test]
    fn test_metadata_bit_depth() {
        let temp_file = create_test_wav_file(48000, 1000, 2);
        let path = temp_file.path();
        
        let result = decode_audio_file(path);
        assert!(result.is_ok());
        
        let (_, metadata) = result.unwrap();
        // WAV files should report bit depth
        assert!(metadata.bit_depth.is_some());
        assert_eq!(metadata.bit_depth.unwrap(), 16);
    }

    #[test]
    fn test_decode_very_short_file() {
        let temp_file = create_test_wav_file(48000, 10, 1);
        let path = temp_file.path();
        
        let result = decode_audio_file(path);
        assert!(result.is_ok());
        
        let (samples, metadata) = result.unwrap();
        assert_eq!(metadata.channels, 1);
        assert_eq!(samples.len(), 10);
    }

    #[test]
    fn test_decode_longer_file() {
        let temp_file = create_test_wav_file(48000, 48000, 2); // 1 second
        let path = temp_file.path();
        
        let result = decode_audio_file(path);
        assert!(result.is_ok());
        
        let (samples, metadata) = result.unwrap();
        assert_eq!(samples.len(), 96000); // 48000 frames * 2 channels
        assert_eq!(metadata.duration_samples, 48000);
    }

    #[test]
    fn test_convert_audio_buffer_consistency() {
        // This test verifies that the conversion maintains sample count
        let temp_file = create_test_wav_file(48000, 1000, 2);
        let path = temp_file.path();
        
        let result = decode_audio_file(path);
        assert!(result.is_ok());
        
        let (samples, metadata) = result.unwrap();
        let expected_samples = metadata.duration_samples as usize * metadata.channels;
        assert_eq!(samples.len(), expected_samples);
    }

    #[test]
    fn test_decode_multiple_files_sequentially() {
        // Test that decoder can handle multiple files without issues
        for i in 0..3 {
            let temp_file = create_test_wav_file(48000, 1000, 2);
            let result = decode_audio_file(temp_file.path());
            assert!(result.is_ok(), "Failed on iteration {}", i);
        }
    }

    #[test]
    fn test_metadata_format_field() {
        let temp_file = create_test_wav_file(48000, 1000, 2);
        let path = temp_file.path();
        
        let result = decode_audio_file(path);
        assert!(result.is_ok());
        
        let (_, metadata) = result.unwrap();
        assert_eq!(metadata.format, "WAV");
    }

    #[test]
    fn test_sample_rate_variations() {
        let sample_rates = vec![22050, 44100, 48000, 96000];
        
        for &rate in &sample_rates {
            let temp_file = create_test_wav_file(rate, 1000, 2);
            let result = decode_audio_file(temp_file.path());
            assert!(result.is_ok(), "Failed for sample rate {}", rate);
            
            let (_, metadata) = result.unwrap();
            assert_eq!(metadata.sample_rate, rate);
        }
    }

    #[test]
    fn test_channel_variations() {
        for channels in 1..=2 {
            let temp_file = create_test_wav_file(48000, 1000, channels);
            let result = decode_audio_file(temp_file.path());
            assert!(result.is_ok(), "Failed for {} channels", channels);
            
            let (samples, metadata) = result.unwrap();
            assert_eq!(metadata.channels, channels as usize);
            assert_eq!(samples.len(), 1000 * channels as usize);
        }
    }

    #[test]
    fn test_decode_preserves_audio_content() {
        let temp_file = create_test_wav_file(48000, 1000, 1);
        let path = temp_file.path();
        
        let result = decode_audio_file(path);
        assert!(result.is_ok());
        
        let (samples, _) = result.unwrap();
        
        // Check that we have a sine wave pattern (should have both positive and negative values)
        let has_positive = samples.iter().any(|&s| s > 0.1);
        let has_negative = samples.iter().any(|&s| s < -0.1);
        assert!(has_positive && has_negative, "Audio content not preserved correctly");
    }

    #[test]
    fn test_decode_zero_duration() {
        let temp_file = create_test_wav_file(48000, 0, 2);
        let result = decode_audio_file(temp_file.path());
        
        // Should either succeed with empty samples or fail gracefully
        if let Ok((samples, metadata)) = result {
            assert_eq!(samples.len(), 0);
            assert_eq!(metadata.duration_samples, 0);
        }
    }

    #[test]
    fn test_metadata_duration_calculation() {
        let sample_rate = 44100;
        let duration_samples = 44100 * 2; // 2 seconds
        let temp_file = create_test_wav_file(sample_rate, duration_samples, 2);
        
        let result = decode_audio_file(temp_file.path());
        assert!(result.is_ok());
        
        let (_, metadata) = result.unwrap();
        let expected_duration = duration_samples as f64 / sample_rate as f64;
        let actual_duration = metadata.duration_seconds;
        
        assert!((actual_duration - expected_duration).abs() < 0.01);
    }

    #[test]
    fn test_file_extension_detection() {
        // Test various file extensions
        let extensions = vec![
            ("test.wav", "WAV"),
            ("test.mp3", "MP3"),
            ("test.flac", "FLAC"),
            ("test.ogg", "OGG"),
            ("test.aiff", "AIFF"),
        ];
        
        for (filename, expected) in extensions {
            assert_eq!(get_format_name(filename), expected);
        }
    }
}

// Made with Bob
