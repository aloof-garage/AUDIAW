//! Audio file encoder for WAV format
//!
//! Provides efficient streaming WAV encoding with support for different
//! sample rates and bit depths.

use audiaw_types::*;
use std::fs::File;
use std::io::{BufWriter, Write};
use std::path::Path;
use tracing::{info, warn};

/// Bit depth options for WAV export
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BitDepth {
    /// 16-bit integer PCM
    I16,
    /// 24-bit integer PCM
    I24,
    /// 32-bit float PCM
    F32,
}

impl BitDepth {
    /// Get bits per sample
    pub fn bits_per_sample(&self) -> u16 {
        match self {
            BitDepth::I16 => 16,
            BitDepth::I24 => 24,
            BitDepth::F32 => 32,
        }
    }

    /// Get bytes per sample
    pub fn bytes_per_sample(&self) -> usize {
        match self {
            BitDepth::I16 => 2,
            BitDepth::I24 => 3,
            BitDepth::F32 => 4,
        }
    }

    /// Check if format is float
    pub fn is_float(&self) -> bool {
        matches!(self, BitDepth::F32)
    }
}

/// WAV encoder for streaming audio export
pub struct WavEncoder {
    writer: BufWriter<File>,
    sample_rate: u32,
    channels: u16,
    bit_depth: BitDepth,
    samples_written: u64,
    _data_chunk_pos: u64,
}

impl WavEncoder {
    /// Create a new WAV encoder
    pub fn new<P: AsRef<Path>>(
        path: P,
        sample_rate: u32,
        channels: u16,
        bit_depth: BitDepth,
    ) -> AudioResult<Self> {
        let file = File::create(path.as_ref())
            .map_err(|e| AudioError::IoError(format!("Failed to create file: {}", e)))?;

        let mut writer = BufWriter::new(file);

        // Write WAV header (will be updated when finalized)
        Self::write_header(&mut writer, sample_rate, channels, bit_depth, 0)?;

        // Remember position of data chunk for later update
        let data_chunk_pos = 36;

        info!(
            "Created WAV encoder: {} Hz, {} channels, {:?}",
            sample_rate, channels, bit_depth
        );

        Ok(Self {
            writer,
            sample_rate,
            channels,
            bit_depth,
            samples_written: 0,
            _data_chunk_pos: data_chunk_pos,
        })
    }

    /// Write WAV header
    fn write_header(
        writer: &mut BufWriter<File>,
        sample_rate: u32,
        channels: u16,
        bit_depth: BitDepth,
        data_size: u32,
    ) -> AudioResult<()> {
        let bits_per_sample = bit_depth.bits_per_sample();
        let byte_rate = sample_rate * channels as u32 * (bits_per_sample as u32 / 8);
        let block_align = channels * (bits_per_sample / 8);
        let file_size = 36 + data_size;

        // RIFF header
        writer
            .write_all(b"RIFF")
            .map_err(|e| AudioError::IoError(format!("Failed to write RIFF header: {}", e)))?;
        writer
            .write_all(&file_size.to_le_bytes())
            .map_err(|e| AudioError::IoError(format!("Failed to write file size: {}", e)))?;
        writer
            .write_all(b"WAVE")
            .map_err(|e| AudioError::IoError(format!("Failed to write WAVE header: {}", e)))?;

        // fmt chunk
        writer
            .write_all(b"fmt ")
            .map_err(|e| AudioError::IoError(format!("Failed to write fmt chunk: {}", e)))?;
        
        // fmt chunk size (16 for PCM, 18 for float)
        let fmt_size = if bit_depth.is_float() { 18u32 } else { 16u32 };
        writer
            .write_all(&fmt_size.to_le_bytes())
            .map_err(|e| AudioError::IoError(format!("Failed to write fmt size: {}", e)))?;

        // Audio format (1 = PCM, 3 = IEEE float)
        let audio_format = if bit_depth.is_float() { 3u16 } else { 1u16 };
        writer
            .write_all(&audio_format.to_le_bytes())
            .map_err(|e| AudioError::IoError(format!("Failed to write audio format: {}", e)))?;

        writer
            .write_all(&channels.to_le_bytes())
            .map_err(|e| AudioError::IoError(format!("Failed to write channels: {}", e)))?;
        writer
            .write_all(&sample_rate.to_le_bytes())
            .map_err(|e| AudioError::IoError(format!("Failed to write sample rate: {}", e)))?;
        writer
            .write_all(&byte_rate.to_le_bytes())
            .map_err(|e| AudioError::IoError(format!("Failed to write byte rate: {}", e)))?;
        writer
            .write_all(&block_align.to_le_bytes())
            .map_err(|e| AudioError::IoError(format!("Failed to write block align: {}", e)))?;
        writer
            .write_all(&bits_per_sample.to_le_bytes())
            .map_err(|e| AudioError::IoError(format!("Failed to write bits per sample: {}", e)))?;

        // Extension size for float format
        if bit_depth.is_float() {
            writer
                .write_all(&0u16.to_le_bytes())
                .map_err(|e| AudioError::IoError(format!("Failed to write extension size: {}", e)))?;
        }

        // data chunk header
        writer
            .write_all(b"data")
            .map_err(|e| AudioError::IoError(format!("Failed to write data chunk: {}", e)))?;
        writer
            .write_all(&data_size.to_le_bytes())
            .map_err(|e| AudioError::IoError(format!("Failed to write data size: {}", e)))?;

        Ok(())
    }

    /// Write interleaved audio samples
    pub fn write_samples(&mut self, samples: &[Sample]) -> AudioResult<()> {
        if samples.is_empty() {
            return Ok(());
        }

        match self.bit_depth {
            BitDepth::I16 => self.write_samples_i16(samples)?,
            BitDepth::I24 => self.write_samples_i24(samples)?,
            BitDepth::F32 => self.write_samples_f32(samples)?,
        }

        self.samples_written += samples.len() as u64;
        Ok(())
    }

    /// Write samples as 16-bit PCM
    fn write_samples_i16(&mut self, samples: &[Sample]) -> AudioResult<()> {
        for &sample in samples {
            // Clamp to -1.0 to 1.0
            let clamped = sample.clamp(-1.0, 1.0);
            // Convert to i16
            let sample_i16 = (clamped * i16::MAX as f32) as i16;
            self.writer
                .write_all(&sample_i16.to_le_bytes())
                .map_err(|e| AudioError::IoError(format!("Failed to write sample: {}", e)))?;
        }
        Ok(())
    }

    /// Write samples as 24-bit PCM
    fn write_samples_i24(&mut self, samples: &[Sample]) -> AudioResult<()> {
        for &sample in samples {
            // Clamp to -1.0 to 1.0
            let clamped = sample.clamp(-1.0, 1.0);
            // Convert to i24 (stored in i32)
            let sample_i24 = (clamped * 8388607.0) as i32; // 2^23 - 1
            // Write 3 bytes (little-endian)
            let bytes = sample_i24.to_le_bytes();
            self.writer
                .write_all(&bytes[0..3])
                .map_err(|e| AudioError::IoError(format!("Failed to write sample: {}", e)))?;
        }
        Ok(())
    }

    /// Write samples as 32-bit float
    fn write_samples_f32(&mut self, samples: &[Sample]) -> AudioResult<()> {
        for &sample in samples {
            self.writer
                .write_all(&sample.to_le_bytes())
                .map_err(|e| AudioError::IoError(format!("Failed to write sample: {}", e)))?;
        }
        Ok(())
    }

    /// Finalize the WAV file (update header with correct sizes)
    pub fn finalize(mut self) -> AudioResult<()> {
        // Flush any remaining data
        self.writer
            .flush()
            .map_err(|e| AudioError::IoError(format!("Failed to flush writer: {}", e)))?;

        // Get the file handle
        let mut file = self.writer.into_inner()
            .map_err(|e| AudioError::IoError(format!("Failed to get file handle: {}", e)))?;

        // Calculate data size
        let bytes_per_sample = self.bit_depth.bytes_per_sample();
        let data_size = (self.samples_written * bytes_per_sample as u64) as u32;

        // Seek to beginning and rewrite header with correct sizes
        use std::io::Seek;
        file.seek(std::io::SeekFrom::Start(0))
            .map_err(|e| AudioError::IoError(format!("Failed to seek: {}", e)))?;

        let mut writer = BufWriter::new(file);
        Self::write_header(
            &mut writer,
            self.sample_rate,
            self.channels,
            self.bit_depth,
            data_size,
        )?;

        writer
            .flush()
            .map_err(|e| AudioError::IoError(format!("Failed to flush final header: {}", e)))?;

        info!(
            "Finalized WAV file: {} samples written ({:.2} seconds)",
            self.samples_written,
            self.samples_written as f64 / (self.sample_rate as f64 * self.channels as f64)
        );

        Ok(())
    }

    /// Get number of samples written
    pub fn samples_written(&self) -> u64 {
        self.samples_written
    }
}

/// Apply normalization to audio samples
pub fn normalize_samples(samples: &mut [Sample], target_db: f32) {
    if samples.is_empty() {
        return;
    }

    // Find peak amplitude
    let peak = samples
        .iter()
        .map(|&s| s.abs())
        .fold(0.0f32, f32::max);

    if peak < 0.0001 {
        // Audio is essentially silent
        warn!("Audio is too quiet to normalize (peak < 0.0001)");
        return;
    }

    // Calculate target amplitude from dB
    let target_amplitude = 10.0f32.powf(target_db / 20.0);

    // Calculate gain needed
    let gain = target_amplitude / peak;

    // Apply gain to all samples
    for sample in samples.iter_mut() {
        *sample *= gain;
        // Clamp to prevent clipping
        *sample = sample.clamp(-1.0, 1.0);
    }

    info!(
        "Normalized audio: peak {:.4} -> {:.4} (gain: {:.2} dB)",
        peak,
        target_amplitude,
        20.0 * gain.log10()
    );
}

/// Apply dithering for bit depth reduction
pub fn apply_dither(samples: &mut [Sample], bit_depth: BitDepth) {
    if matches!(bit_depth, BitDepth::F32) {
        // No dithering needed for float
        return;
    }

    // Use triangular probability density function (TPDF) dithering
    let dither_amplitude = match bit_depth {
        BitDepth::I16 => 1.0 / i16::MAX as f32,
        BitDepth::I24 => 1.0 / 8388607.0,
        BitDepth::F32 => 0.0,
    };

    use rand::Rng;
    let mut rng = rand::thread_rng();

    for sample in samples.iter_mut() {
        // TPDF dither: sum of two uniform random values
        let dither = (rng.gen::<f32>() - 0.5 + rng.gen::<f32>() - 0.5) * dither_amplitude;
        *sample += dither;
        *sample = sample.clamp(-1.0, 1.0);
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::NamedTempFile;

    #[test]
    fn test_bit_depth_properties() {
        assert_eq!(BitDepth::I16.bits_per_sample(), 16);
        assert_eq!(BitDepth::I24.bits_per_sample(), 24);
        assert_eq!(BitDepth::F32.bits_per_sample(), 32);

        assert_eq!(BitDepth::I16.bytes_per_sample(), 2);
        assert_eq!(BitDepth::I24.bytes_per_sample(), 3);
        assert_eq!(BitDepth::F32.bytes_per_sample(), 4);

        assert!(!BitDepth::I16.is_float());
        assert!(!BitDepth::I24.is_float());
        assert!(BitDepth::F32.is_float());
    }

    #[test]
    fn test_wav_encoder_creation() {
        let temp_file = NamedTempFile::new().unwrap();
        let encoder = WavEncoder::new(temp_file.path(), 48000, 2, BitDepth::I16);
        assert!(encoder.is_ok());
    }

    #[test]
    fn test_wav_encoder_write_samples() {
        let temp_file = NamedTempFile::new().unwrap();
        let mut encoder = WavEncoder::new(temp_file.path(), 48000, 2, BitDepth::I16).unwrap();

        let samples = vec![0.5, -0.5, 0.25, -0.25];
        let result = encoder.write_samples(&samples);
        assert!(result.is_ok());
        assert_eq!(encoder.samples_written(), 4);
    }

    #[test]
    fn test_wav_encoder_finalize() {
        let temp_file = NamedTempFile::new().unwrap();
        let path = temp_file.path().to_path_buf();
        
        {
            let mut encoder = WavEncoder::new(&path, 48000, 2, BitDepth::I16).unwrap();
            let samples = vec![0.5; 1000];
            encoder.write_samples(&samples).unwrap();
            encoder.finalize().unwrap();
        }

        // Check file exists and has content
        let metadata = std::fs::metadata(&path).unwrap();
        assert!(metadata.len() > 44); // Header + some data
    }

    #[test]
    fn test_normalize_samples() {
        let mut samples = vec![0.5, -0.5, 0.25, -0.25];
        normalize_samples(&mut samples, -0.1);

        // Peak should be close to 10^(-0.1/20), about 0.989.
        let peak = samples.iter().map(|&s| s.abs()).fold(0.0f32, f32::max);
        assert!((peak - 0.989).abs() < 0.01);
    }

    #[test]
    fn test_normalize_silent_audio() {
        let mut samples = vec![0.0; 100];
        normalize_samples(&mut samples, -0.1);
        // Should remain silent
        assert!(samples.iter().all(|&s| s == 0.0));
    }

    #[test]
    fn test_apply_dither() {
        let mut samples = vec![0.5; 100];
        apply_dither(&mut samples, BitDepth::I16);

        // Samples should be slightly different due to dither
        let all_same = samples.windows(2).all(|w| w[0] == w[1]);
        assert!(!all_same);
    }

    #[test]
    fn test_wav_encoder_different_bit_depths() {
        for bit_depth in [BitDepth::I16, BitDepth::I24, BitDepth::F32] {
            let temp_file = NamedTempFile::new().unwrap();
            let mut encoder = WavEncoder::new(temp_file.path(), 48000, 2, bit_depth).unwrap();
            let samples = vec![0.5; 100];
            encoder.write_samples(&samples).unwrap();
            encoder.finalize().unwrap();
        }
    }
}
