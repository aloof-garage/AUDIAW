import { useDawStore } from '../../stores/dawStore';

const noteNames = ['C', 'B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#'];

export const PianoRoll = () => {
  const { midiNotes } = useDawStore();
  const pitches = Array.from({ length: 24 }, (_, index) => 72 - index);
  const totalBeats = 8;

  return (
    <section className="flex-1 overflow-auto bg-surface-1">
      <div className="min-w-[900px]">
        <div className="h-10 flex items-center justify-between px-3 bg-surface-2 border-b border-DEFAULT">
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-semibold uppercase text-primary">Piano Roll</h2>
            <span className="text-xs text-tertiary">Smart Q</span>
            <span className="text-xs text-tertiary">Velocity</span>
          </div>
          <div className="text-xs text-tertiary">Grid 1/16 / Scale off / Follow transport</div>
        </div>

        <div className="relative" style={{ height: pitches.length * 22 }}>
          {pitches.map((pitch, row) => (
            <div key={pitch} className="absolute left-0 right-0 h-[22px] border-b border-DEFAULT" style={{ top: row * 22 }}>
              <div className="absolute left-0 top-0 bottom-0 w-16 px-2 flex items-center bg-surface-2 border-r border-DEFAULT text-[10px] text-tertiary">
                {noteNames[row % 12]}{Math.floor(pitch / 12) - 1}
              </div>
            </div>
          ))}

          <div className="absolute left-16 right-0 top-0 bottom-0">
            {Array.from({ length: totalBeats * 4 + 1 }, (_, index) => (
              <div
                key={index}
                className={`absolute top-0 bottom-0 border-l ${index % 4 === 0 ? 'border-border-hover' : 'border-DEFAULT'}`}
                style={{ left: `${(index / (totalBeats * 4)) * 100}%` }}
              />
            ))}

            {midiNotes.map((note) => {
              const row = pitches.indexOf(note.pitch);
              if (row < 0) return null;
              return (
                <button
                  key={note.id}
                  className="absolute h-[18px] rounded-sm border border-accent bg-accent/70 hover:bg-accent transition-colors duration-fast"
                  style={{
                    top: row * 22 + 2,
                    left: `${(note.start / totalBeats) * 100}%`,
                    width: `${(note.length / totalBeats) * 100}%`,
                    opacity: 0.45 + note.velocity * 0.55,
                  }}
                  title={`MIDI ${note.pitch} velocity ${Math.round(note.velocity * 127)}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
