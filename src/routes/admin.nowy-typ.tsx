import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/nowy-typ")({
  component: NewTipPage,
});

const SPORTS = ["Piłka nożna", "Koszykówka", "Tenis", "MMA", "Hokej"];
const MARKETS = ["1X2 — 1", "1X2 — X", "1X2 — 2", "BTTS Tak", "BTTS Nie", "Over 2.5", "Under 2.5", "Handicap -1.5", "Over 220.5"];

function NewTipPage() {
  const [sport, setSport] = useState("Piłka nożna");
  const [league, setLeague] = useState("La Liga");
  const [match, setMatch] = useState("Real Madrid – Barcelona");
  const [market, setMarket] = useState("1X2 — 1");
  const [odds, setOdds] = useState("1.85");
  const [stake, setStake] = useState(5);
  const [confidence, setConfidence] = useState(4);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const oddsNum = parseFloat(odds) || 0;
  const stakeAmount = stake * 50;
  const potential = useMemo(
    () => Math.round(stakeAmount * Math.max(0, oddsNum - 1)),
    [stakeAmount, oddsNum],
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-saiyan-white">Nowy typ</h2>
        <p className="mt-1 text-sm text-saiyan-white/50">
          Wypełnij szczegóły. Karta po prawej aktualizuje się na żywo.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-white/5 bg-gradient-to-br from-navy-mid/80 to-navy-deep p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Sport">
              <Select value={sport} onChange={setSport} options={SPORTS} />
            </Field>
            <Field label="Liga">
              <Input value={league} onChange={setLeague} placeholder="La Liga" />
            </Field>
            <Field label="Mecz" className="sm:col-span-2">
              <Input value={match} onChange={setMatch} placeholder="Drużyna A – Drużyna B" />
            </Field>
            <Field label="Rynek">
              <Select value={market} onChange={setMarket} options={MARKETS} />
            </Field>
            <Field label="Kurs">
              <Input
                value={odds}
                onChange={setOdds}
                placeholder="1.85"
                inputMode="decimal"
              />
            </Field>
            <Field label={`Stawka: ${stake}/10  (${stakeAmount} zł)`} className="sm:col-span-2">
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={stake}
                onChange={(e) => setStake(Number(e.target.value))}
                className="w-full accent-energy-yellow"
              />
            </Field>
            <Field label="Pewność" className="sm:col-span-2">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setConfidence(n)}
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors",
                      n <= confidence
                        ? "border-energy-yellow/40 bg-energy-yellow/10 text-energy-yellow"
                        : "border-white/5 text-saiyan-white/40 hover:border-white/10 hover:text-saiyan-white/70",
                    )}
                  >
                    <Star className="h-4 w-4" fill={n <= confidence ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Notatka (opcjonalnie)" className="sm:col-span-2">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Krótkie uzasadnienie..."
                rows={3}
                className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-saiyan-white placeholder:text-saiyan-white/30 focus:border-energy-yellow/40 focus:outline-none"
              />
            </Field>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="text-xs text-saiyan-white/40">
              Po zapisaniu typ trafia do <span className="text-saiyan-white/70">Historia typów</span> jako „pending".
            </p>
            <button
              type="submit"
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-bold transition-all",
                saved
                  ? "bg-win-green text-navy-deep"
                  : "bg-energy-yellow text-navy-deep hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,214,10,0.4)]",
              )}
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4" /> Zapisano
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Opublikuj typ
                </>
              )}
            </button>
          </div>
        </form>

        {/* Live preview */}
        <div className="space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-saiyan-white/40">
            Podgląd na żywo
          </p>
          <div className="overflow-hidden rounded-2xl border border-energy-yellow/20 bg-gradient-to-br from-navy-mid to-navy-deep p-5 shadow-[0_20px_60px_rgba(255,214,10,0.08)]">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-energy-yellow/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-energy-yellow">
                {sport} · {league}
              </span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={cn(
                      "h-3 w-3",
                      n <= confidence ? "text-energy-yellow" : "text-white/10",
                    )}
                    fill={n <= confidence ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>

            <h3 className="mt-3 font-display text-xl font-bold leading-tight text-saiyan-white">
              {match || "Drużyna A – Drużyna B"}
            </h3>

            <div className="mt-4 flex items-end justify-between border-t border-white/5 pt-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-saiyan-white/40">
                  Rynek
                </p>
                <p className="font-display text-base font-bold text-saiyan-white">{market}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-saiyan-white/40">
                  Kurs
                </p>
                <p className="font-mono text-2xl font-bold tabular-nums text-energy-yellow">
                  {odds || "0.00"}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-white/[0.03] p-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-saiyan-white/40">Stawka</p>
                <p className="font-mono text-sm font-bold text-saiyan-white">
                  {stake}/10 · {stakeAmount} zł
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-saiyan-white/40">
                  Potencjalny zysk
                </p>
                <p className="font-mono text-sm font-bold text-win-green">+{potential} zł</p>
              </div>
            </div>

            {note && (
              <p className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs italic text-saiyan-white/70">
                „{note}"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-saiyan-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      inputMode={inputMode}
      className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-saiyan-white placeholder:text-saiyan-white/30 focus:border-energy-yellow/40 focus:outline-none"
    />
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-saiyan-white focus:border-energy-yellow/40 focus:outline-none"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-navy-deep">
          {o}
        </option>
      ))}
    </select>
  );
}
