import { useDawStore } from '../../stores/dawStore';
import { Knob } from '../UI/Knob';

export const DeviceRack = () => {
  const { devices, selectedDeviceId, selectDevice } = useDawStore();
  const selected = devices.find((device) => device.id === selectedDeviceId) ?? devices[0];

  return (
    <section className="flex-1 overflow-auto bg-surface-1">
      <div className="h-10 flex items-center justify-between px-3 bg-surface-2 border-b border-DEFAULT">
        <h2 className="text-xs font-semibold uppercase text-primary">Device Rack</h2>
        <div className="text-xs text-tertiary">Instrument and effect chain</div>
      </div>

      <div className="p-3 flex gap-3 min-w-[820px]">
        <div className="w-64 flex-shrink-0 space-y-2">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => selectDevice(device.id)}
              className={`w-full h-12 px-3 text-left border rounded-md transition-colors duration-standard ${device.id === selectedDeviceId ? 'border-accent bg-accent/10' : 'border-DEFAULT bg-surface-2 hover:border-accent/60'}`}
            >
              <div className="text-sm text-primary truncate">{device.name}</div>
              <div className="text-xs text-tertiary">{device.kind} / {device.trackId}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div className="flex-1 border border-DEFAULT rounded-md bg-surface-2">
            <div className="h-12 px-4 flex items-center justify-between border-b border-DEFAULT">
              <div>
                <div className="text-sm text-primary">{selected.name}</div>
                <div className="text-xs text-tertiary">{selected.enabled ? 'Enabled' : 'Bypassed'} / {selected.kind}</div>
              </div>
              <button className="h-7 px-3 rounded-sm border border-DEFAULT text-xs text-secondary hover:text-primary hover:border-accent/60">
                Map
              </button>
            </div>
            <div className="p-5 flex flex-wrap gap-6">
              {selected.parameters.map((parameter) => (
                <Knob
                  key={parameter.name}
                  value={parameter.value}
                  min={0}
                  max={1}
                  bipolar={false}
                  label={parameter.name}
                  showValue
                  onChange={() => undefined}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
