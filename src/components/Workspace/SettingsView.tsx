import { useDawStore } from '../../stores/dawStore';

export const SettingsView = () => {
  const { preferences, updatePreference } = useDawStore();

  return (
    <section className="flex-1 overflow-auto bg-surface-1">
      <div className="h-10 flex items-center justify-between px-3 bg-surface-2 border-b border-DEFAULT">
        <h2 className="text-xs font-semibold uppercase text-primary">Preferences</h2>
        <div className="text-xs text-tertiary">Project defaults and realtime behavior</div>
      </div>

      <div className="p-4 max-w-3xl space-y-4">
        <div className="grid gap-3" style={{ gridTemplateColumns: '180px 1fr' }}>
          <label className="text-sm text-secondary">Latency mode</label>
          <select
            value={preferences.latencyMode}
            onChange={(event) => updatePreference('latencyMode', event.target.value as typeof preferences.latencyMode)}
            className="h-8 bg-surface-2 border border-DEFAULT rounded-md px-2 text-sm text-primary"
          >
            <option>Eco</option>
            <option>Balanced</option>
            <option>Low Latency</option>
          </select>

          <label className="text-sm text-secondary">Snap value</label>
          <select
            value={preferences.snapValue}
            onChange={(event) => updatePreference('snapValue', event.target.value as typeof preferences.snapValue)}
            className="h-8 bg-surface-2 border border-DEFAULT rounded-md px-2 text-sm text-primary"
          >
            <option>1/4</option>
            <option>1/8</option>
            <option>1/16</option>
            <option>1/32</option>
          </select>

          <label className="text-sm text-secondary">Launch quantization</label>
          <select
            value={preferences.launchQuantization}
            onChange={(event) => updatePreference('launchQuantization', event.target.value as typeof preferences.launchQuantization)}
            className="h-8 bg-surface-2 border border-DEFAULT rounded-md px-2 text-sm text-primary"
          >
            <option>1 bar</option>
            <option>1/2</option>
            <option>1/4</option>
            <option>None</option>
          </select>

          <label className="text-sm text-secondary">Default warp</label>
          <input
            type="checkbox"
            checked={preferences.defaultWarp}
            onChange={(event) => updatePreference('defaultWarp', event.target.checked)}
            className="h-4 w-4 accent-[#3B8BF5]"
          />

          <label className="text-sm text-secondary">Autosave</label>
          <input
            type="checkbox"
            checked={preferences.autoSave}
            onChange={(event) => updatePreference('autoSave', event.target.checked)}
            className="h-4 w-4 accent-[#3B8BF5]"
          />
        </div>
      </div>
    </section>
  );
};

// Made with Bob
