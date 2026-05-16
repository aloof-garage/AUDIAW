import { useProjectStore } from '../../stores/projectStore';
import { useDawStore } from '../../stores/dawStore';

export const InspectorPanel = () => {
  const {
    tracks,
    selectedTrackIds,
    selectedClipIds,
    tempo,
    sampleRate,
  } = useProjectStore();
  const { devices, automationLanes, routing, selectedDeviceId } = useDawStore();
  const selectedTrack = tracks.find((track) => track.id === selectedTrackIds[0]);
  const clipCount = tracks.reduce((sum, track) => sum + track.clips.length, 0);
  const selectedDevice = devices.find((device) => device.id === selectedDeviceId);
  const selectedTrackDevices = devices.filter((device) => device.trackId === (selectedTrack?.id ?? 'track-1'));
  const selectedRoute = routing.find((node) => node.id === (selectedTrack?.id ?? 'track-1'));

  return (
    <aside className="w-[260px] flex-shrink-0 bg-surface-1 border-l border-DEFAULT overflow-y-auto">
      <div className="h-10 flex items-center px-3 border-b border-DEFAULT bg-surface-2">
        <h2 className="text-xs font-semibold uppercase tracking-normal text-primary">Inspector</h2>
      </div>

      <div className="p-3 space-y-4 text-sm">
        <section>
          <h3 className="text-xs text-tertiary uppercase mb-2">Project</h3>
          <dl className="grid grid-cols-2 gap-y-2 text-xs">
            <dt className="text-tertiary">Tempo</dt>
            <dd className="text-primary text-right font-mono">{tempo} BPM</dd>
            <dt className="text-tertiary">Sample rate</dt>
            <dd className="text-primary text-right font-mono">{sampleRate / 1000} kHz</dd>
            <dt className="text-tertiary">Tracks</dt>
            <dd className="text-primary text-right font-mono">{tracks.length}</dd>
            <dt className="text-tertiary">Clips</dt>
            <dd className="text-primary text-right font-mono">{clipCount}</dd>
          </dl>
        </section>

        <section className="pt-3 border-t border-DEFAULT">
          <h3 className="text-xs text-tertiary uppercase mb-2">Selection</h3>
          {selectedTrack ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: selectedTrack.color }} />
                <span className="text-primary truncate">{selectedTrack.name}</span>
              </div>
              <dl className="grid grid-cols-2 gap-y-2 text-xs">
                <dt className="text-tertiary">Type</dt>
                <dd className="text-primary text-right uppercase">{selectedTrack.type}</dd>
                <dt className="text-tertiary">Volume</dt>
                <dd className="text-primary text-right font-mono">{Math.round(selectedTrack.volume * 100)}%</dd>
                <dt className="text-tertiary">Pan</dt>
                <dd className="text-primary text-right font-mono">{selectedTrack.pan.toFixed(2)}</dd>
                <dt className="text-tertiary">Clips</dt>
                <dd className="text-primary text-right font-mono">{selectedTrack.clips.length}</dd>
              </dl>
            </div>
          ) : (
            <div className="text-xs text-tertiary">
              {selectedClipIds.length > 0 ? `${selectedClipIds.length} clip selected` : 'No selection'}
            </div>
          )}
        </section>

        <section className="pt-3 border-t border-DEFAULT">
          <h3 className="text-xs text-tertiary uppercase mb-2">Device Chain</h3>
          <div className="space-y-2">
            {selectedTrackDevices.map((device) => (
              <div key={device.id} className="px-2 py-2 border border-DEFAULT rounded-md bg-surface-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-primary truncate">{device.name}</span>
                  <span className="text-[10px] text-tertiary uppercase">{device.kind}</span>
                </div>
              </div>
            ))}
            {selectedTrackDevices.length === 0 && <div className="text-xs text-tertiary">No devices on selected track</div>}
          </div>
        </section>

        {selectedDevice && (
          <section className="pt-3 border-t border-DEFAULT">
            <h3 className="text-xs text-tertiary uppercase mb-2">Mapped Parameters</h3>
            <div className="space-y-2">
              {selectedDevice.parameters.map((parameter) => (
                <div key={parameter.name}>
                  <div className="flex justify-between text-xs">
                    <span className="text-secondary">{parameter.name}</span>
                    <span className="text-tertiary">{Math.round(parameter.value * 100)}{parameter.unit === '%' ? '%' : ''}</span>
                  </div>
                  <div className="mt-1 h-1 bg-surface-2 rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${parameter.value * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="pt-3 border-t border-DEFAULT">
          <h3 className="text-xs text-tertiary uppercase mb-2">Automation</h3>
          <div className="space-y-1">
            {automationLanes.slice(0, 3).map((lane) => (
              <div key={lane.id} className="flex items-center justify-between text-xs">
                <span className="text-secondary truncate">{lane.target}</span>
                <span className="text-tertiary uppercase">{lane.mode}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-3 border-t border-DEFAULT">
          <h3 className="text-xs text-tertiary uppercase mb-2">Routing</h3>
          {selectedRoute ? (
            <div className="space-y-1">
              {selectedRoute.sends.map((send) => (
                <div key={send.targetId} className="flex items-center justify-between text-xs">
                  <span className="text-secondary">To {send.targetId}</span>
                  <span className="text-tertiary">{Math.round(send.level * 100)}%</span>
                </div>
              ))}
              {selectedRoute.sends.length === 0 && <div className="text-xs text-tertiary">Direct to master</div>}
            </div>
          ) : (
            <div className="text-xs text-tertiary">No route selected</div>
          )}
        </section>
      </div>
    </aside>
  );
};
