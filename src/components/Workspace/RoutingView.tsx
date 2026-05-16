import { useDawStore } from '../../stores/dawStore';

export const RoutingView = () => {
  const { routing } = useDawStore();

  return (
    <section className="flex-1 overflow-auto bg-surface-1">
      <div className="h-10 flex items-center justify-between px-3 bg-surface-2 border-b border-DEFAULT">
        <h2 className="text-xs font-semibold uppercase text-primary">Routing</h2>
        <div className="text-xs text-tertiary">Tracks / returns / master bus</div>
      </div>

      <div className="p-4 min-w-[820px]">
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(5, minmax(130px, 1fr))' }}>
          {routing.map((node) => (
            <div key={node.id} className="border border-DEFAULT rounded-md bg-surface-2">
              <div className="h-10 px-3 flex items-center justify-between border-b border-DEFAULT">
                <span className="text-sm text-primary truncate">{node.name}</span>
                <span className="text-[10px] uppercase text-tertiary">{node.type}</span>
              </div>
              <div className="p-3 space-y-2 min-h-28">
                {node.sends.length === 0 ? (
                  <div className="text-xs text-tertiary">No sends</div>
                ) : node.sends.map((send) => (
                  <div key={`${node.id}-${send.targetId}`} className="text-xs">
                    <div className="flex justify-between text-secondary">
                      <span>To {send.targetId}</span>
                      <span>{Math.round(send.level * 100)}%</span>
                    </div>
                    <div className="mt-1 h-1 bg-surface-1 rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${send.level * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Made with Bob
