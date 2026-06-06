import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { profitSeries } from "@/lib/admin/mockData";
import { cn } from "@/lib/utils";

const RANGES = [
  { id: "d30", label: "30 dni" },
  { id: "d90", label: "90 dni" },
  { id: "d365", label: "365 dni" },
] as const;

type RangeId = (typeof RANGES)[number]["id"];

export function ProfitChart() {
  const [range, setRange] = useState<RangeId>("d90");
  const data = profitSeries[range];

  const last = data[data.length - 1]?.profit ?? 0;
  const positive = last >= 0;

  const formatted = useMemo(
    () =>
      `${positive ? "+" : ""}${last.toLocaleString("pl-PL")} zł`,
    [last, positive],
  );

  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-navy-mid/80 to-navy-deep p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-saiyan-white/50">
            Zysk skumulowany
          </p>
          <p
            className={cn(
              "mt-1 font-display text-3xl font-bold tabular-nums",
              positive ? "text-win-green" : "text-loss-red",
            )}
          >
            {formatted}
          </p>
        </div>

        <div className="inline-flex rounded-full border border-white/5 bg-white/[0.03] p-1">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                range === r.id
                  ? "bg-energy-yellow text-navy-deep"
                  : "text-saiyan-white/60 hover:text-saiyan-white",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D26A" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#00D26A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(245,247,255,0.06)" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="rgba(245,247,255,0.4)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              minTickGap={32}
              tickFormatter={(v: string) => v.slice(5)}
            />
            <YAxis
              stroke="rgba(245,247,255,0.4)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              cursor={{ stroke: "rgba(255,214,10,0.4)", strokeWidth: 1 }}
              contentStyle={{
                background: "#0A0E27",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                color: "#F5F7FF",
                fontSize: 12,
              }}
              labelStyle={{ color: "#F5F7FF", fontWeight: 600 }}
              itemStyle={{ color: "#F5F7FF" }}
              formatter={(v: number) => [`${v.toLocaleString("pl-PL")} zł`, "Zysk"]}
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#00D26A"
              strokeWidth={2}
              fill="url(#profitFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
