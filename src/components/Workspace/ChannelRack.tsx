import { useDawStore } from '../../stores/dawStore';

export const ChannelRack = () => {
  const { patternRows, togglePatternStep } = useDawStore();

  return (
    <section className="flex-1 overflow-auto bg-surface-1">
      <div className="min-w-[820px]">
        <div className="h-10 flex items-center justify-between px-3 bg-surface-2 border-b border-DEFAULT">
          <h2 className="text-xs font-semibold uppercase text-primary">Channel Rack</h2>
          <div className="text-xs text-tertiary">Pattern 01 / 16 steps / Swing 16%</div>
        </div>

        <div className="p-3 space-y-2">
          {patternRows.map((row) => (
            <div key={row.id} className="grid items-center gap-2" style={{ gridTemplateColumns: '120px 1fr 80px' }}>
              <button className="h-9 px-3 text-left bg-surface-2 border border-DEFAULT rounded-md hover:border-accent/60 transition-colors duration-standard">
                <span className="text-sm text-primary">{row.instrument}</span>
              </button>

              <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}>
                {row.steps.map((enabled, stepIndex) => (
                  <button
                    key={stepIndex}
                    onClick={() => togglePatternStep(row.id, stepIndex)}
                    className={`h-8 rounded-sm border transition-colors duration-fast ${
                      enabled
                        ? row.accentSteps[stepIndex] ? 'bg-status-warning border-status-warning' : 'bg-accent border-accent'
                        : stepIndex % 4 === 0 ? 'bg-surface-3 border-border-hover' : 'bg-surface-2 border-DEFAULT'
                    }`}
                    title={`${row.instrument} step ${stepIndex + 1}`}
                  />
                ))}
              </div>

              <div className="text-xs text-tertiary text-right">
                {row.steps.filter(Boolean).length} hits
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Made with Bob
