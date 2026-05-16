import { useProjectStore } from '../../stores/projectStore';
import { Fader } from '../UI/Fader';
import { Knob } from '../UI/Knob';
import { Meter } from '../UI/Meter';

export const MixerPanel = () => {
  const { tracks, setTrackVolume, setTrackPan } = useProjectStore();

  return (
    <section className="h-[220px] flex-shrink-0 bg-surface-1 border-t border-DEFAULT overflow-x-auto">
      <div className="h-10 flex items-center px-3 border-b border-DEFAULT bg-surface-2">
        <h2 className="text-xs font-semibold uppercase tracking-normal text-primary">Mixer</h2>
      </div>

      <div className="h-[180px] flex items-stretch">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="w-24 flex-shrink-0 border-r border-DEFAULT px-3 py-2 flex flex-col items-center justify-between"
          >
            <div className="w-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: track.color }} />
              <span className="text-xs text-primary truncate">{track.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Meter level={track.muted ? 0 : track.volume * 0.72} peak={track.volume * 0.85} height={86} stereo />
              <Fader value={track.volume} onChange={(value) => setTrackVolume(track.id, value)} height={86} showValue={false} showScale={false} />
            </div>
            <Knob value={track.pan} onChange={(value) => setTrackPan(track.id, value)} size={28} showValue={false} />
          </div>
        ))}

        {tracks.length === 0 && (
          <div className="flex items-center justify-center w-full text-xs text-tertiary">
            Add tracks to populate the mixer
          </div>
        )}
      </div>
    </section>
  );
};
