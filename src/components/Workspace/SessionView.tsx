import { useProjectStore } from '../../stores/projectStore';
import { useDawStore, type SessionClip } from '../../stores/dawStore';

const stateStyles: Record<SessionClip['state'], string> = {
  empty: 'border-DEFAULT bg-surface-1 text-tertiary',
  loaded: 'border-DEFAULT bg-surface-2 text-secondary hover:border-accent/60',
  queued: 'border-status-warning bg-status-warning/10 text-primary',
  playing: 'border-status-success bg-status-success/10 text-primary',
};

export const SessionView = () => {
  const { tracks } = useProjectStore();
  const { scenes, sessionClips, toggleSessionClip } = useDawStore();

  return (
    <section className="flex-1 overflow-auto bg-surface-1">
      <div className="min-w-[760px]">
        <div className="grid sticky top-0 z-10 bg-surface-2 border-b border-DEFAULT" style={{ gridTemplateColumns: `120px repeat(${Math.max(tracks.length, 1)}, minmax(160px, 1fr))` }}>
          <div className="h-10 px-3 flex items-center text-xs text-tertiary uppercase">Scenes</div>
          {tracks.map((track) => (
            <div key={track.id} className="h-10 px-3 flex items-center gap-2 border-l border-DEFAULT">
              <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: track.color }} />
              <span className="text-xs text-primary truncate">{track.name}</span>
            </div>
          ))}
        </div>

        {scenes.map((scene) => (
          <div
            key={scene.id}
            className="grid border-b border-DEFAULT"
            style={{ gridTemplateColumns: `120px repeat(${Math.max(tracks.length, 1)}, minmax(160px, 1fr))` }}
          >
            <button className="h-20 px-3 text-left hover:bg-surface-2 transition-colors duration-standard">
              <div className="text-sm text-primary">{scene.name}</div>
              <div className="text-xs text-tertiary">{scene.tempo ? `${scene.tempo} BPM` : 'Follow'}</div>
            </button>

            {tracks.map((track) => {
              const clip = sessionClips.find((item) => item.trackId === track.id && item.sceneId === scene.id);

              if (!clip) {
                return (
                  <div key={`${scene.id}-${track.id}`} className="h-20 p-2 border-l border-DEFAULT">
                    <div className="h-full border border-dashed border-DEFAULT bg-surface-1" />
                  </div>
                );
              }

              return (
                <div key={clip.id} className="h-20 p-2 border-l border-DEFAULT">
                  <button
                    onClick={() => toggleSessionClip(clip.id)}
                    className={`w-full h-full px-3 text-left border rounded-md transition-all duration-standard ${stateStyles[clip.state]}`}
                    style={{ borderLeftColor: clip.color, borderLeftWidth: 3 }}
                    title={`${clip.name} - ${clip.quantize}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm truncate">{clip.name}</span>
                      <span className="text-[9px] uppercase text-tertiary">{clip.state}</span>
                    </div>
                    <div className="mt-3 h-5 flex items-end gap-0.5">
                      {Array.from({ length: 18 }, (_, index) => (
                        <span
                          key={index}
                          className="flex-1 bg-current opacity-50"
                          style={{ height: `${20 + Math.abs(Math.sin(index * 1.7 + clip.id.length)) * 75}%` }}
                        />
                      ))}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};
