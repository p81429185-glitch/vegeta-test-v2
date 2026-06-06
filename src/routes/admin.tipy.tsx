import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter } from "lucide-react";
import { mockTips, type Tip, type TipStatus } from "@/lib/admin/mockTips";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/tipy")({
  component: TipsHistoryPage,
});

const STATUS_FILTERS: { id: TipStatus | "all"; label: string }[] = [
  { id: "all",     label: "Wszystkie" },
  { id: "pending", label: "Oczekujące" },
  { id: "won",     label: "Wygrane" },
  { id: "lost",    label: "Przegrane" },
  { id: "void",    label: "Anulowane" },
];

const SPORT_FILTERS = ["all", "Piłka nożna", "Koszykówka", "Tenis", "MMA", "Hokej"];

function TipsHistoryPage() {
  const [status, setStatus] = useState<TipStatus | "all">("all");
  const [sport, setSport] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return mockTips.filter((t) => {
      if (status !== "all" && t.status !== status) return false;
      if (sport !== "all" && t.sport !== sport) return false;
      if (q && !`${t.match} ${t.market} ${t.league}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [status, sport, q]);

  const totals = useMemo(() => {
    const settled = filtered.filter((t) => t.status === "won" || t.status === "lost");
    const wins = settled.filter((t) => t.status === "won").length;
    const profit = filtered.reduce((s, t) => s + t.profit, 0);
    const staked = filtered.reduce((s, t) => s + t.stakeAmount, 0);
    const roi = staked > 0 ? (profit / staked) * 100 : 0;
    return {
      count: filtered.length,
      winRate: settled.length > 0 ? Math.round((wins / settled.length) * 100) : 0,
      profit,
      roi,
    };
  }, [filtered]);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-saiyan-white">Historia typów</h2>
        <p className="mt-1 text-sm text-saiyan-white/50">
          {totals.count} typów · ROI{" "}
          <span className={cn(totals.roi >= 0 ? "text-win-green" : "text-loss-red", "font-bold")}>
            {totals.roi >= 0 ? "+" : ""}
            {totals.roi.toFixed(1)}%
          </span>{" "}
          · Win rate{" "}
          <span className="font-bold text-saiyan-white">{totals.winRate}%</span>{" "}
          · Zysk{" "}
          <span
            className={cn(
              "font-mono font-bold",
              totals.profit >= 0 ? "text-win-green" : "text-loss-red",
            )}
          >
            {totals.profit >= 0 ? "+" : ""}
            {totals.profit.toLocaleString("pl-PL")} zł
          </span>
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/5 bg-navy-mid/40 p-3">
        <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-2">
          <Search className="h-4 w-4 text-saiyan-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Szukaj meczu, rynku..."
            className="w-56 bg-transparent text-sm text-saiyan-white placeholder:text-saiyan-white/40 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStatus(s.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                status === s.id
                  ? "bg-energy-yellow text-navy-deep"
                  : "text-saiyan-white/60 hover:text-saiyan-white",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-saiyan-white/40" />
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className="rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-saiyan-white focus:border-energy-yellow/40 focus:outline-none"
          >
            {SPORT_FILTERS.map((s) => (
              <option key={s} value={s} className="bg-navy-deep">
                {s === "all" ? "Wszystkie sporty" : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-navy-mid/60 to-navy-deep">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] text-[10px] uppercase tracking-wider text-saiyan-white/40">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Data</th>
                <th className="px-4 py-3 text-left font-semibold">Mecz</th>
                <th className="px-4 py-3 text-left font-semibold">Rynek</th>
                <th className="px-4 py-3 text-right font-semibold">Kurs</th>
                <th className="px-4 py-3 text-right font-semibold">Stawka</th>
                <th className="px-4 py-3 text-center font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Zysk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((t) => (
                <TipRow key={t.id} tip={t} />
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-saiyan-white/40">
                    Brak typów dla wybranych filtrów.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TipRow({ tip }: { tip: Tip }) {
  const d = new Date(tip.date);
  const dateStr = d.toLocaleDateString("pl-PL", { day: "2-digit", month: "short" });
  return (
    <tr className="transition-colors hover:bg-white/[0.02]">
      <td className="whitespace-nowrap px-4 py-3 text-saiyan-white/60">{dateStr}</td>
      <td className="px-4 py-3">
        <p className="font-semibold text-saiyan-white">{tip.match}</p>
        <p className="text-xs text-saiyan-white/40">
          {tip.sport} · {tip.league}
        </p>
      </td>
      <td className="px-4 py-3 text-saiyan-white/80">{tip.market}</td>
      <td className="px-4 py-3 text-right font-mono tabular-nums text-energy-yellow">
        {tip.odds.toFixed(2)}
      </td>
      <td className="px-4 py-3 text-right font-mono tabular-nums text-saiyan-white/70">
        {tip.stake}/10
        <span className="ml-1 text-xs text-saiyan-white/40">({tip.stakeAmount} zł)</span>
      </td>
      <td className="px-4 py-3 text-center">
        <StatusBadge status={tip.status} />
      </td>
      <td
        className={cn(
          "whitespace-nowrap px-4 py-3 text-right font-mono font-bold tabular-nums",
          tip.profit > 0 && "text-win-green",
          tip.profit < 0 && "text-loss-red",
          tip.profit === 0 && "text-saiyan-white/40",
        )}
      >
        {tip.status === "pending" ? "—" : `${tip.profit >= 0 ? "+" : ""}${tip.profit} zł`}
      </td>
    </tr>
  );
}

function StatusBadge({ status }: { status: TipStatus }) {
  const map = {
    pending: { label: "Oczekuje", cls: "bg-energy-yellow/10 text-energy-yellow" },
    won:     { label: "Wygrana", cls: "bg-win-green/10 text-win-green" },
    lost:    { label: "Przegrana", cls: "bg-loss-red/10 text-loss-red" },
    void:    { label: "Anulowany", cls: "bg-white/5 text-saiyan-white/50" },
  } as const;
  const s = map[status];
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
        s.cls,
      )}
    >
      {s.label}
    </span>
  );
}
