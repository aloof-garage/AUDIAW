//! # AUDIAW Audio I/O
//!
//! Cross-platform audio I/O using CPAL.
//! Provides a simplified interface for audio input/output across Windows, macOS, and Linux.

pub mod decoder;
pub mod encoder;

use audiaw_types::*;
use cpal::traits::{DeviceTrait, HostTrait, StreamTrait};
use cpal::{Device, Host, Stream, StreamConfig};
use tracing::{error, info};

/// Audio I/O manager
pub struct AudioIO {
    /// CPAL host
    host: Host,
    /// Output device
    output_device: Option<Device>,
    /// Input device
    input_device: Option<Device>,
    /// Active output stream
    output_stream: Option<Stream>,
    /// Active input stream
    input_stream: Option<Stream>,
    /// Audio configuration
    config: AudioConfig,
}

impl AudioIO {
    /// Create a new audio I/O manager
    pub fn new(config: AudioConfig) -> AudioResult<Self> {
        let host = cpal::default_host();
        info!("Audio host: {}", host.id().name());

        Ok(Self {
            host,
            output_device: None,
            input_device: None,
            output_stream: None,
            input_stream: None,
            config,
        })
    }

    /// List available output devices
    pub fn list_output_devices(&self) -> AudioResult<Vec<String>> {
        let devices = self
            .host
            .output_devices()
            .map_err(|e| AudioError::IoError(format!("Failed to enumerate output devices: {}", e)))?;

        let mut device_names = Vec::new();
        for device in devices {
            if let Ok(name) = device.name() {
                device_names.push(name);
            }
        }

        Ok(device_names)
    }

    /// List available input devices
    pub fn list_input_devices(&self) -> AudioResult<Vec<String>> {
        let devices = self
            .host
            .input_devices()
            .map_err(|e| AudioError::IoError(format!("Failed to enumerate input devices: {}", e)))?;

        let mut device_names = Vec::new();
        for device in devices {
            if let Ok(name) = device.name() {
                device_names.push(name);
            }
        }

        Ok(device_names)
    }

    /// Initialize output device
    pub fn init_output(&mut self) -> AudioResult<()> {
        let device = self
            .host
            .default_output_device()
            .ok_or_else(|| AudioError::IoError("No output device available".to_string()))?;

        let name = device
            .name()
            .unwrap_or_else(|_| "Unknown Device".to_string());
        info!("Output device: {}", name);

        self.output_device = Some(device);
        Ok(())
    }

    /// Initialize input device
    pub fn init_input(&mut self) -> AudioResult<()> {
        let device = self
            .host
            .default_input_device()
            .ok_or_else(|| AudioError::IoError("No input device available".to_string()))?;

        let name = device
            .name()
            .unwrap_or_else(|_| "Unknown Device".to_string());
        info!("Input device: {}", name);

        self.input_device = Some(device);
        Ok(())
    }

    /// Start output stream with callback
    pub fn start_output<F>(&mut self, mut callback: F) -> AudioResult<()>
    where
        F: FnMut(&mut [f32]) + Send + 'static,
    {
        let device = self
            .output_device
            .as_ref()
            .ok_or_else(|| AudioError::IoError("Output device not initialized".to_string()))?;

        // Get supported config
        let supported_config = device
            .default_output_config()
            .map_err(|e| AudioError::IoError(format!("Failed to get output config: {}", e)))?;

        info!(
            "Output config: {} Hz, {} channels",
            supported_config.sample_rate().0,
            supported_config.channels()
        );

        let config = StreamConfig {
            channels: self.config.output_channels as u16,
            sample_rate: cpal::SampleRate(self.config.sample_rate),
            buffer_size: cpal::BufferSize::Fixed(self.config.buffer_size as u32),
        };

        let err_fn = |err| {
            error!("Audio output stream error: {}", err);
        };

        let stream = device
            .build_output_stream(
                &config,
                move |data: &mut [f32], _: &cpal::OutputCallbackInfo| {
                    callback(data);
                },
                err_fn,
                None,
            )
            .map_err(|e| AudioError::IoError(format!("Failed to build output stream: {}", e)))?;

        stream
            .play()
            .map_err(|e| AudioError::IoError(format!("Failed to start output stream: {}", e)))?;

        self.output_stream = Some(stream);
        info!("Output stream started");

        Ok(())
    }

    /// Stop output stream
    pub fn stop_output(&mut self) -> AudioResult<()> {
        if let Some(stream) = self.output_stream.take() {
            stream
                .pause()
                .map_err(|e| AudioError::IoError(format!("Failed to stop output stream: {}", e)))?;
            info!("Output stream stopped");
        }
        Ok(())
    }

    /// Start input stream with callback
    pub fn start_input<F>(&mut self, mut callback: F) -> AudioResult<()>
    where
        F: FnMut(&[f32]) + Send + 'static,
    {
        let device = self
            .input_device
            .as_ref()
            .ok_or_else(|| AudioError::IoError("Input device not initialized".to_string()))?;

        // Get supported config
        let supported_config = device
            .default_input_config()
            .map_err(|e| AudioError::IoError(format!("Failed to get input config: {}", e)))?;

        info!(
            "Input config: {} Hz, {} channels",
            supported_config.sample_rate().0,
            supported_config.channels()
        );

        let config = StreamConfig {
            channels: self.config.input_channels as u16,
            sample_rate: cpal::SampleRate(self.config.sample_rate),
            buffer_size: cpal::BufferSize::Fixed(self.config.buffer_size as u32),
        };

        let err_fn = |err| {
            error!("Audio input stream error: {}", err);
        };

        let stream = device
            .build_input_stream(
                &config,
                move |data: &[f32], _: &cpal::InputCallbackInfo| {
                    callback(data);
                },
                err_fn,
                None,
            )
            .map_err(|e| AudioError::IoError(format!("Failed to build input stream: {}", e)))?;

        stream
            .play()
            .map_err(|e| AudioError::IoError(format!("Failed to start input stream: {}", e)))?;

        self.input_stream = Some(stream);
        info!("Input stream started");

        Ok(())
    }

    /// Stop input stream
    pub fn stop_input(&mut self) -> AudioResult<()> {
        if let Some(stream) = self.input_stream.take() {
            stream
                .pause()
                .map_err(|e| AudioError::IoError(format!("Failed to stop input stream: {}", e)))?;
            info!("Input stream stopped");
        }
        Ok(())
    }

    /// Get audio configuration
    pub fn config(&self) -> &AudioConfig {
        &self.config
    }
}

impl Drop for AudioIO {
    fn drop(&mut self) {
        let _ = self.stop_output();
        let _ = self.stop_input();
    }
}

/// Simple audio callback generator for testing
pub fn generate_sine_wave(frequency: f32, sample_rate: f32) -> impl FnMut(&mut [f32]) {
    let mut phase = 0.0f32;
    let phase_increment = frequency * 2.0 * std::f32::consts::PI / sample_rate;

    move |data: &mut [f32]| {
        for sample in data.iter_mut() {
            *sample = phase.sin() * 0.2; // 20% volume
            phase += phase_increment;
            if phase >= 2.0 * std::f32::consts::PI {
                phase -= 2.0 * std::f32::consts::PI;
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_audio_io_creation() {
        let config = AudioConfig::default();
        let audio_io = AudioIO::new(config);
        assert!(audio_io.is_ok());
    }

    #[test]
    fn test_list_devices() {
        let config = AudioConfig::default();
        let audio_io = AudioIO::new(config).unwrap();

        let output_devices = audio_io.list_output_devices();
        assert!(output_devices.is_ok());

        let input_devices = audio_io.list_input_devices();
        assert!(input_devices.is_ok());
    }

    #[test]
    fn test_init_output() {
        let config = AudioConfig::default();
        let mut audio_io = AudioIO::new(config).unwrap();

        let result = audio_io.init_output();
        // May fail in CI environments without audio devices
        if result.is_ok() {
            assert!(audio_io.output_device.is_some());
        }
    }
}
