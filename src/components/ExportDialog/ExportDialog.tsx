import React, { useState } from 'react';
import { save } from '@tauri-apps/plugin-dialog';
import { useProjectStore, ExportSettings } from '../../stores/projectStore';
import { Button } from '../UI/Button';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ isOpen, onClose }) => {
  const { sampleRate, exportAudio, isExporting, exportProgress } = useProjectStore();
  
  const [settings, setSettings] = useState<Partial<ExportSettings>>({
    sample_rate: sampleRate,
    bit_depth: 'I16',
    start_position: 0,
    end_position: null,
    normalize_db: -0.1,
    dither: true,
  });

  const handleExport = async () => {
    try {
      // Open save dialog
      const filePath = await save({
        filters: [{
          name: 'WAV Audio',
          extensions: ['wav']
        }],
        defaultPath: 'export.wav'
      });

      if (!filePath) {
        return; // User cancelled
      }

      // Create full export settings
      const exportSettings: ExportSettings = {
        output_path: filePath,
        sample_rate: settings.sample_rate || sampleRate,
        bit_depth: settings.bit_depth || 'I16',
        start_position: settings.start_position || 0,
        end_position: settings.end_position || null,
        normalize_db: settings.normalize_db !== undefined ? settings.normalize_db : -0.1,
        dither: settings.dither !== undefined ? settings.dither : true,
      };

      // Start export
      await exportAudio(exportSettings);
      
      // Close dialog after export starts
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Export failed: ${error}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-[500px] max-w-[90vw]">
        <h2 className="text-xl font-bold mb-4 text-white">Export Audio</h2>
        
        {isExporting ? (
          <div className="space-y-4">
            <p className="text-gray-300">Exporting audio...</p>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 text-center">{exportProgress}%</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {/* Sample Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sample Rate
                </label>
                <select
                  value={settings.sample_rate}
                  onChange={(e) => setSettings({ ...settings, sample_rate: parseInt(e.target.value) })}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={44100}>44.1 kHz</option>
                  <option value={48000}>48 kHz</option>
                  <option value={96000}>96 kHz</option>
                </select>
              </div>

              {/* Bit Depth */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bit Depth
                </label>
                <select
                  value={settings.bit_depth}
                  onChange={(e) => setSettings({ ...settings, bit_depth: e.target.value as 'I16' | 'I24' | 'F32' })}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="I16">16-bit PCM</option>
                  <option value="I24">24-bit PCM</option>
                  <option value="F32">32-bit Float</option>
                </select>
              </div>

              {/* Normalize */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="normalize"
                  checked={settings.normalize_db !== null}
                  onChange={(e) => setSettings({
                    ...settings,
                    normalize_db: e.target.checked ? -0.1 : null
                  })}
                  className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="normalize" className="text-sm text-gray-300">
                  Normalize to -0.1 dB
                </label>
              </div>

              {/* Dither */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="dither"
                  checked={settings.dither}
                  onChange={(e) => setSettings({ ...settings, dither: e.target.checked })}
                  className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="dither" className="text-sm text-gray-300">
                  Apply dither
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <Button
                onClick={onClose}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleExport}
                variant="primary"
              >
                Export
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExportDialog;
