import { topMarkets } from "@/lib/admin/mockData";
import { cn } from "@/lib/utils";

export function TopMarkets() {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-navy-mid/80 to-navy-deep p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-bold text-saiyan-white">
          Top rynki
        </h3>
        <span className="text-xs text-saiyan-white/40">ostatnie 90 dni</span>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/5">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02] text-[10px] uppercase tracking-wider text-saiyan-white/40">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">Rynek</th>
              <th className="px-3 py-2 text-right font-semibold">Typy</th>
              <th className="px-3 py-2 text-right font-semibold">Win %</th>
              <th className="px-3 py-2 text-right font-semibold">ROI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {topMarkets.map((m) => (
              <tr key={m.market} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-3 py-3 text-saiyan-white">{m.market}</td>
                <td className="px-3 py-3 text-right font-mono tabular-nums text-saiyan-white/70">
                  {m.picks}
                </td>
                <td className="px-3 py-3 text-right font-mono tabular-nums text-saiyan-white/70">
                  {m.winRate}%
                </td>
                <td
                  className={cn(
                    "px-3 py-3 text-right font-mono font-bold tabular-nums",
                    m.roi >= 0 ? "text-win-green" : "text-loss-red",
                  )}
                >
                  {m.roi >= 0 ? "+" : ""}
                  {m.roi.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
