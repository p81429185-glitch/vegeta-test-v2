import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, Target, Percent, Trophy } from "lucide-react";
import {
  getMonthlyPerformance,
  getBySport,
  getByOddsBucket,
  getStatusDistribution,
} from "@/lib/admin/mockStats";
import { mockTips } from "@/lib/admin/mockTips";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/statystyki")({
  component: StatsPage,
});

const tooltipStyle = {
  background: "#0A0E27",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  color: "#F5F7FF",
  fontSize: 12,
};
const tooltipLabelStyle = { color: "#F5F7FF", fontWeight: 600 };
const tooltipItemStyle = { color: "#F5F7FF" };
const tooltipCursor = { fill: "rgba(255,255,255,0.04)" };

function StatsPage() {
  const monthly = useMemo(getMonthlyPerformance, []);
  const bySport = useMemo(getBySport, []);
  const byOdds = useMemo(getByOddsBucket, []);
  const dist = useMemo(getStatusDistribution, []);

  const totals = useMemo(() => {
    const profit = mockTips.reduce((s, t) => s + t.profit, 0);
    const staked = mockTips.reduce((s, t) => s + t.stakeAmount, 0);
    const settled = mockTips.filter((t) => t.status === "won" || t.status === "lost");
    const wins = settled.filter((t) => t.status === "won").length;
    const avgOdds =
      mockTips.reduce((s, t) => s + t.odds, 0) / Math.max(1, mockTips.length);
    return {
      profit,
      roi: staked > 0 ? (profit / staked) * 100 : 0,
      winRate: settled.length > 0 ? (wins / settled.length) * 100 : 0,
      avgOdds,
      picks: mockTips.length,
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-saiyan-white">Statystyki</h2>
        <p className="mt-1 text-sm text-saiyan-white/50">
          Pełna analiza wyników z ostatnich 90 dni.
        </p>
      </div>

      {/* Top KPI */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatTile icon={TrendingUp} label="Zysk łączny" value={`${totals.profit >= 0 ? "+" : ""}${totals.profit.toLocaleString("pl-PL")} zł`} positive={totals.profit >= 0} />
        <StatTile icon={Percent} label="ROI" value={`${totals.roi >= 0 ? "+" : ""}${totals.roi.toFixed(1)}%`} positive={totals.roi >= 0} />
        <StatTile icon={Target} label="Win rate" value={`${totals.winRate.toFixed(0)}%`} />
        <StatTile icon={Trophy} label="Średni kurs" value={totals.avgOdds.toFixed(2)} />
      </div>

      {/* Monthly performance */}
      <Card title="Wyniki miesięczne" subtitle="Zysk i ROI na koniec miesiąca">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly} margin={{ top: 10, right: 16, bottom: 0, left: -8 }}>
              <CartesianGrid stroke="rgba(245,247,255,0.06)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(245,247,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="rgba(245,247,255,0.4)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}zł`} />
              <YAxis yAxisId="right" orientation="right" stroke="rgba(245,247,255,0.4)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}%`} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={tooltipCursor} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#F5F7FF" }} />
              <Line yAxisId="left" type="monotone" dataKey="profit" name="Zysk (zł)" stroke="#00D26A" strokeWidth={2} dot={{ fill: "#00D26A", r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="roi" name="ROI (%)" stroke="#FFD60A" strokeWidth={2} dot={{ fill: "#FFD60A", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* By sport */}
        <Card title="ROI wg dyscypliny" subtitle={`${bySport.length} sportów`}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bySport} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="rgba(245,247,255,0.06)" vertical={false} />
                <XAxis dataKey="sport" stroke="rgba(245,247,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(245,247,255,0.4)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}%`} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={tooltipCursor} formatter={(v: number) => [`${v}%`, "ROI"]} />
                <Bar dataKey="roi" radius={[8, 8, 0, 0]}>
                  {bySport.map((s, i) => (
                    <Cell key={i} fill={s.roi >= 0 ? "#00D26A" : "#FF3B30"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Odds buckets */}
        <Card title="Win rate wg przedziału kursów" subtitle="Gdzie jesteś najskuteczniejszy">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byOdds} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="rgba(245,247,255,0.06)" vertical={false} />
                <XAxis dataKey="bucket" stroke="rgba(245,247,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(245,247,255,0.4)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}%`} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={tooltipCursor} formatter={(v: number) => [`${v}%`, "Win rate"]} />
                <Bar dataKey="winRate" fill="#1E40FF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Distribution */}
        <Card title="Rozkład rozliczeń" subtitle={`${mockTips.length} typów łącznie`}>
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dist} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {dist.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={tooltipCursor} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-2">
              {dist.map((d) => (
                <li key={d.name} className="flex items-center justify-between rounded-xl bg-white/[0.02] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-sm text-saiyan-white/80">{d.name}</span>
                  </div>
                  <span className="font-mono text-sm font-bold tabular-nums text-saiyan-white">{d.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Picks per month */}
        <Card title="Liczba typów w miesiącu" subtitle="Wolumen aktywności">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="rgba(245,247,255,0.06)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(245,247,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(245,247,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={tooltipCursor} formatter={(v: number) => [v, "Typy"]} />
                <Bar dataKey="picks" fill="#FFD60A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-navy-mid/80 to-navy-deep p-5">
      <div className="mb-4 flex items-end justify-between">
        <h3 className="font-display text-base font-bold text-saiyan-white">{title}</h3>
        {subtitle && <span className="text-xs text-saiyan-white/40">{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  positive,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-navy-mid/80 to-navy-deep p-4">
      <div className="flex items-center gap-2 text-saiyan-white/40">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p
        className={cn(
          "mt-2 font-display text-2xl font-bold tabular-nums",
          positive === undefined && "text-saiyan-white",
          positive === true && "text-win-green",
          positive === false && "text-loss-red",
        )}
      >
        {value}
      </p>
    </div>
  );
}
