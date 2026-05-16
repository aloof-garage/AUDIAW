import { useDawStore, type AutomationMode } from '../../stores/dawStore';

const modes: AutomationMode[] = ['read', 'write', 'touch', 'off'];

export const AutomationView = () => {
  const { automationLanes, selectedAutomationLaneId, setAutomationMode } = useDawStore();

  return (
    <section className="flex-1 overflow-auto bg-surface-1">
      <div className="min-w-[820px]">
        <div className="h-10 flex items-center justify-between px-3 bg-surface-2 border-b border-DEFAULT">
          <h2 className="text-xs font-semibold uppercase text-primary">Automation</h2>
          <div className="text-xs text-tertiary">Touch/write modes are non-destructive and undoable</div>
        </div>

        {automationLanes.map((lane) => (
          <div key={lane.id} className={`h-28 border-b border-DEFAULT ${lane.id === selectedAutomationLaneId ? 'bg-surface-2' : ''}`}>
            <div className="h-full grid" style={{ gridTemplateColumns: '180px 1fr' }}>
              <div className="p-3 border-r border-DEFAULT">
                <div className="text-sm text-primary">{lane.target}</div>
                <div className="text-xs text-tertiary mb-3">{lane.trackId}</div>
                <div className="flex gap-1">
                  {modes.map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setAutomationMode(lane.id, mode)}
                      className={`px-2 h-6 rounded-sm border text-[10px] uppercase ${lane.mode === mode ? 'border-accent text-accent bg-accent/10' : 'border-DEFAULT text-tertiary hover:text-primary'}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden">
                {Array.from({ length: 17 }, (_, index) => (
                  <div key={index} className="absolute top-0 bottom-0 border-l border-DEFAULT" style={{ left: `${(index / 16) * 100}%` }} />
                ))}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <polyline
                    points={lane.points.map((point) => `${(point.beat / 16) * 100},${100 - point.value * 100}`).join(' ')}
                    fill="none"
                    stroke="#3B8BF5"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                  {lane.points.map((point) => (
                    <circle key={`${lane.id}-${point.beat}`} cx={`${(point.beat / 16) * 100}%`} cy={`${100 - point.value * 100}%`} r="4" fill="#3B8BF5" />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Made with Bob
