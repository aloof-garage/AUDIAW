import { useProjectStore } from '../../stores/projectStore';
import { useDawStore } from '../../stores/dawStore';
import { Button } from '../UI/Button';

const browserSections = [
  { label: 'Project', detail: 'Tracks and clips in this session' },
  { label: 'Samples', detail: 'Import WAV or MP3 files to an audio track' },
  { label: 'Recordings', detail: 'Captured takes from armed tracks' },
  { label: 'Exports', detail: 'Rendered mixes and stems' },
];

export const BrowserPanel = () => {
  const { tracks, importAudioFile } = useProjectStore();
  const { samples } = useDawStore();
  const firstAudioTrack = tracks.find((track) => track.type === 'audio');

  return (
    <aside className="w-[280px] flex-shrink-0 bg-surface-1 border-r border-DEFAULT overflow-y-auto">
      <div className="h-10 flex items-center px-3 border-b border-DEFAULT bg-surface-2">
        <h2 className="text-xs font-semibold uppercase tracking-normal text-primary">Browser</h2>
      </div>

      <div className="p-3 space-y-3">
        <div className="space-y-1">
          {browserSections.map((section) => (
            <button
              key={section.label}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-surface-2 transition-colors duration-standard"
            >
              <div className="text-sm text-primary">{section.label}</div>
              <div className="text-xs text-tertiary truncate">{section.detail}</div>
            </button>
          ))}
        </div>

        <div className="pt-3 border-t border-DEFAULT">
          <div className="text-xs text-tertiary mb-2">Quick import</div>
          <Button
            variant="secondary"
            size="sm"
            disabled={!firstAudioTrack}
            onClick={() => firstAudioTrack && importAudioFile(firstAudioTrack.id)}
            className="w-full"
            title="Import audio to the first audio track"
          >
            Import Audio
          </Button>
        </div>

        <div className="pt-3 border-t border-DEFAULT">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-tertiary">Library</div>
            <div className="text-[10px] text-tertiary">BPM / KEY</div>
          </div>
          <div className="space-y-1">
            {samples.map((sample) => (
              <button
                key={sample.id}
                className="w-full px-2 py-2 text-left rounded-md hover:bg-surface-2 transition-colors duration-standard"
                draggable
                title={sample.tags.join(', ')}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-primary truncate">{sample.name}</span>
                  <span className="text-[10px] text-tertiary">{sample.bpm ?? '--'} / {sample.key ?? '--'}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[10px] text-tertiary">
                  <span className="uppercase">{sample.type}</span>
                  <span>{sample.length}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-DEFAULT">
          <div className="text-xs text-tertiary mb-2">Session assets</div>
          {tracks.length === 0 ? (
            <div className="text-xs text-tertiary">No tracks created</div>
          ) : (
            <div className="space-y-1">
              {tracks.map((track) => (
                <div key={track.id} className="flex items-center justify-between text-xs px-2 py-1">
                  <span className="text-secondary truncate">{track.name}</span>
                  <span className="text-tertiary">{track.clips.length}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
