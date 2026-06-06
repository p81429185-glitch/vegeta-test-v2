import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Emoji } from "@/components/ui/Emoji";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  Clock,
  Download,
  Layers,
  LogOut,
  RefreshCw,
  Target,
  UserCheck,
  Users,
} from "lucide-react";
import {
  DAYS_PL,
  METRIC_LABELS,
  PERIODS,
  type Kpi,
  type Period,
  type TrafficMetric,
  getDevices,
  getFunnel,
  getGeo,
  getHeatmap,
  getKpis,
  getLiveNow,
  getSources,
  getTrafficSeries,
  TOP_CLICKS,
  TOP_PAGES,
} from "@/lib/admin/mockTraffic";
import {
  formatDuration,
  formatHourPL,
  formatPL,
} from "@/lib/admin/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/traffic")({
  component: TrafficPage,
});

const TOOLTIP_STYLE = {
  background: "#0A0E27",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 12,
  color: "#F5F7FF",
  fontSize: 12,
  padding: "8px 10px",
};
const TOOLTIP_LABEL_STYLE = { color: "#F5F7FF", fontWeight: 600 };
const TOOLTIP_ITEM_STYLE = { color: "#F5F7FF" };

// ─── PAGE ──────────────────────────────────────────────────────────────────

function TrafficPage() {
  const [period, setPeriod] = useState<Period>("30d");
  const [refreshKey, setRefreshKey] = useState(0);
  const [liveNow, setLiveNow] = useState(() => getLiveNow());

  useEffect(() => {
    const id = setInterval(() => setLiveNow(getLiveNow()), 15_000);
    return () => clearInterval(id);
  }, []);

  const kpis = useMemo(() => getKpis(period), [period, refreshKey]);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-5">
      <Header
        period={period}
        onPeriod={setPeriod}
        liveNow={liveNow}
        onRefresh={() => setRefreshKey((k) => k + 1)}
      />

      <KpiRow kpis={kpis} period={period} />

      <TrafficOverTime period={period} key={`trf-${period}-${refreshKey}`} />

      <HeatmapSection />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <TopPagesTable />
        <TopClicksTable />
      </div>

      <FunnelSection />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <SourcesSection />
        <DevicesSection />
      </div>

      <GeoSection />
    </div>
  );
}

// ─── HEADER ────────────────────────────────────────────────────────────────

function Header({
  period,
  onPeriod,
  liveNow,
  onRefresh,
}: {
  period: Period;
  onPeriod: (p: Period) => void;
  liveNow: number;
  onRefresh: () => void;
}) {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold text-saiyan-white md:text-4xl">
          Ruch na stronie
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-saiyan-white/55">
          Co dzieje się na stronie w czasie rzeczywistym. Zobacz peak'i,
          kliknięcia, ścieżki konwersji.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* LIVE indicator */}
        <div className="inline-flex items-center gap-2 rounded-full bg-win-green/10 px-3 py-2 ring-1 ring-win-green/30">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-win-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-win-green" />
          </span>
          <span className="text-xs font-medium text-saiyan-white/90">
            <span className="font-mono-stat font-bold text-win-green">{liveNow}</span> osób na stronie TERAZ
          </span>
        </div>

        {/* Period pills */}
        <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-navy-mid/60 p-1">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onPeriod(p.id)}
              className={cn(
                "rounded-full px-3 py-1.5 font-mono-stat text-xs font-semibold transition-colors",
                period === p.id
                  ? "bg-energy-yellow text-navy-deep"
                  : "text-saiyan-white/60 hover:text-saiyan-white",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Refresh */}
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-navy-mid/60 px-3 py-2 text-xs font-medium text-saiyan-white/80 hover:bg-white/5 hover:text-saiyan-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Odśwież
        </button>

        {/* Export */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setExportOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full bg-saiyan-blue px-3 py-2 text-xs font-semibold text-saiyan-white hover:brightness-110"
          >
            <Download className="h-3.5 w-3.5" />
            Eksportuj CSV
          </button>
          {exportOpen && (
            <div
              className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-navy-deep/95 p-1 shadow-card-premium backdrop-blur-xl"
              onMouseLeave={() => setExportOpen(false)}
            >
              {[
                ["sessions", "Wszystkie sesje"],
                ["conversions", "Tylko konwersje"],
                ["clicks", "Click events"],
                ["pageviews", "Page views"],
              ].map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => {
                    downloadCsvStub(k as string);
                    setExportOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs text-saiyan-white/85 hover:bg-white/5"
                >
                  {label}
                  <Download className="h-3 w-3 text-saiyan-white/40" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function downloadCsvStub(kind: string) {
  const header = ["id", "kind", "exported_at"].join(",");
  const rows = Array.from({ length: 50 }, (_, i) =>
    [i + 1, kind, new Date().toISOString()].join(","),
  );
  const blob = new Blob([header + "\n" + rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `traffic-${kind}-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── KPI ROW ───────────────────────────────────────────────────────────────

const KPI_ICONS: Record<string, typeof Users> = {
  visits: Users,
  uniques: UserCheck,
  avgTime: Clock,
  bounce: LogOut,
  perSession: Layers,
  conv: Target,
};

const KPI_COLORS: Record<string, string> = {
  visits: "text-energy-yellow",
  uniques: "text-saiyan-blue",
  avgTime: "text-win-green",
  bounce: "text-loss-red",
  perSession: "text-saiyan-white",
  conv: "text-energy-yellow",
};

function KpiRow({ kpis, period }: { kpis: Kpi[]; period: Period }) {
  return (
    <section
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6"
      key={`kpis-${period}`}
    >
      {kpis.map((k) => (
        <KpiTile key={k.id} kpi={k} />
      ))}
    </section>
  );
}

function KpiTile({ kpi }: { kpi: Kpi }) {
  const Icon = KPI_ICONS[kpi.id] || Activity;
  const colorClass = KPI_COLORS[kpi.id] || "text-saiyan-white";
  const display = useMemo(() => formatKpi(kpi), [kpi]);
  const animated = useCountUp(kpi.rawValue);

  const isTime = kpi.id === "avgTime";
  const isPct = kpi.id === "bounce" || kpi.id === "conv";
  const isFloat = kpi.id === "perSession";

  let renderedValue: string;
  if (isTime)        renderedValue = formatDuration(animated);
  else if (isPct)    renderedValue = `${animated.toFixed(1)}%`;
  else if (isFloat)  renderedValue = animated.toFixed(2);
  else               renderedValue = formatPL(animated);

  return (
    <div className="liquid-glass relative overflow-hidden rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-saiyan-white/50">
          {kpi.label}
        </span>
        <Icon className={cn("h-4 w-4", colorClass)} />
      </div>
      <div className="mt-3 font-display text-2xl font-bold tabular-nums text-saiyan-white">
        {renderedValue}
      </div>
      <div className={cn("mt-1 font-mono-stat text-[11px] font-semibold", kpi.positive ? "text-win-green" : "text-loss-red")}>
        {kpi.delta}
      </div>
      <Sparkline data={kpi.spark} positive={kpi.positive} />
    </div>
  );
}

function formatKpi(_k: Kpi): string {
  return "";
}

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const series = data.map((value, i) => ({ i, value }));
  const stroke = positive ? "#FFD60A" : "#FF3B30";
  return (
    <div className="mt-3 h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
          <defs>
            <linearGradient id={`spark-${stroke.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={0.4} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="value" stroke={stroke} strokeWidth={1.5} fill={`url(#spark-${stroke.replace("#","")})`} dot={false} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Count-up on mount.
function useCountUp(target: number, durationMs = 900) {
  const [v, setV] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    const start = performance.now();
    const from = fromRef.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = from + (target - from) * eased;
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return v;
}

// ─── TRAFFIC OVER TIME ─────────────────────────────────────────────────────

const METRICS: TrafficMetric[] = ["visits", "uniques", "conversions", "bounce"];

function TrafficOverTime({ period }: { period: Period }) {
  const [metric, setMetric] = useState<TrafficMetric>("visits");
  const series = useMemo(() => getTrafficSeries(period, metric), [period, metric]);
  const peak = series.find((s) => s.isPeak);
  const isPct = metric === "bounce";

  return (
    <SectionCard
      title="Ruch w czasie"
      subtitle={`Trend: ${METRIC_LABELS[metric].toLowerCase()} z ostatnich ${period}.`}
      right={
        <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-navy-deep/60 p-1">
          {METRICS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMetric(m)}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-semibold transition-colors",
                metric === m
                  ? "bg-energy-yellow text-navy-deep"
                  : "text-saiyan-white/60 hover:text-saiyan-white",
              )}
            >
              {METRIC_LABELS[m]}
            </button>
          ))}
        </div>
      }
    >
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD60A" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#1E40FF" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" stroke="#8A93B8" tick={{ fill: "#8A93B8", fontFamily: "JetBrains Mono", fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis stroke="#8A93B8" tick={{ fill: "#8A93B8", fontFamily: "JetBrains Mono", fontSize: 11 }} tickLine={false} axisLine={false} width={48}
              tickFormatter={(v) => isPct ? `${v.toFixed(0)}%` : formatPL(v)} />
            <Tooltip
              contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL_STYLE} itemStyle={TOOLTIP_ITEM_STYLE}
              cursor={{ stroke: "rgba(255,214,10,0.25)", strokeWidth: 1 }}
              formatter={(value: number, _name, item) => {
                const prev = (item.payload as { prev: number }).prev;
                const diff = value - prev;
                const sign = diff >= 0 ? "+" : "";
                const cmp = isPct
                  ? `${sign}${diff.toFixed(1)}pp vs poprzedni`
                  : `${sign}${formatPL(diff)} vs poprzedni`;
                const v = isPct ? `${value.toFixed(1)}%` : formatPL(value);
                return [`${v} (${cmp})`, METRIC_LABELS[metric]];
              }}
            />
            <Area type="monotone" dataKey="value" stroke="#FFD60A" strokeWidth={2} fill="url(#trafficFill)" isAnimationActive={false}
              dot={(props) => {
                const { cx, cy, payload, index } = props as { cx: number; cy: number; payload: { isPeak?: boolean }; index: number };
                if (!payload.isPeak) return <g key={`d-${index}`} />;
                return (
                  <g key={`d-${index}`}>
                    <circle cx={cx} cy={cy} r={5} fill="#FFD60A" stroke="#0A0E27" strokeWidth={2} />
                  </g>
                );
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {peak && !isPct && (
        <p className="mt-2 text-xs text-saiyan-white/60">
          <span className="font-semibold text-energy-yellow">Peak:</span>{" "}
          <span className="font-mono-stat">{formatPL(peak.value)}</span> {METRIC_LABELS[metric].toLowerCase()} – {peak.label}
        </p>
      )}
    </SectionCard>
  );
}

// ─── HEATMAP ───────────────────────────────────────────────────────────────

function HeatmapSection() {
  const data = useMemo(getHeatmap, []);

  return (
    <SectionCard
      title="Kiedy ludzie odwiedzają stronę"
      subtitle="Najlepsze okno na publikację typów to godziny z największym ruchem."
    >
      <div className="w-full">
        {/* Hour header */}
        <div className="ml-10 grid gap-[2px]" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
          {Array.from({ length: 24 }).map((_, h) => (
            <div key={h} className="text-center font-mono-stat text-[9px] text-saiyan-white/40">
              {h % 3 === 0 ? h.toString().padStart(2, "0") : ""}
            </div>
          ))}
        </div>
        {/* Rows */}
        {DAYS_PL.map((day, dIdx) => (
          <div key={day} className="mt-[2px] flex items-center gap-2">
            <div className="w-8 font-mono-stat text-[10px] uppercase text-saiyan-white/50">{day}</div>
            <div className="grid flex-1 gap-[2px]" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
              {Array.from({ length: 24 }).map((_, h) => {
                const cell = data.cells.find((c) => c.day === dIdx && c.hour === h)!;
                const intensity = cell.value / data.max;
                return (
                  <div
                    key={h}
                    title={`${["Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota","Niedziela"][dIdx]}, ${formatHourPL(h)} – ${formatPL(cell.value)} odwiedzin`}
                    className="aspect-square rounded-[3px] transition-transform hover:scale-110"
                    style={{ background: heatColor(intensity) }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-saiyan-white/75">
        <span className="inline-flex items-center gap-1"><Emoji size={14}>🔥</Emoji> Peak day: <span className="font-semibold text-energy-yellow">{data.peakDay}</span></span>
        <span className="inline-flex items-center gap-1"><Emoji size={14}>⏰</Emoji> Peak hour: <span className="font-semibold text-energy-yellow">{data.peakHour}</span></span>
        <span className="inline-flex items-center gap-1"><Emoji size={14}>📅</Emoji> Najsłabszy: <span className="font-semibold text-loss-red">{data.worstSlot}</span></span>
      </div>
    </SectionCard>
  );
}

function heatColor(t: number): string {
  // t in [0,1]. navy-mid → saiyan-blue → energy-yellow
  const clamped = Math.max(0, Math.min(1, t));
  if (clamped < 0.5) {
    const p = clamped / 0.5;
    return mixColor([17, 23, 58], [30, 64, 255], p);
  }
  const p = (clamped - 0.5) / 0.5;
  return mixColor([30, 64, 255], [255, 214, 10], p);
}
function mixColor(a: number[], b: number[], p: number): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * p);
  const g = Math.round(a[1] + (b[1] - a[1]) * p);
  const c = Math.round(a[2] + (b[2] - a[2]) * p);
  return `rgb(${r}, ${g}, ${c})`;
}

// ─── TABLES ────────────────────────────────────────────────────────────────

function TopPagesTable() {
  const [sortKey, setSortKey] = useState<"views" | "uniques" | "avgTime" | "bounce">("views");
  const rows = useMemo(
    () => [...TOP_PAGES].sort((a, b) => (b[sortKey] as number) - (a[sortKey] as number)),
    [sortKey],
  );
  return (
    <SectionCard title="Top strony" subtitle="Najpopularniejsze ścieżki w okresie.">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-wider text-saiyan-white/45">
              <Th>Strona</Th>
              <Th sortable active={sortKey === "views"} onClick={() => setSortKey("views")}>Wyświetleń</Th>
              <Th sortable active={sortKey === "uniques"} onClick={() => setSortKey("uniques")}>Unikalni</Th>
              <Th sortable active={sortKey === "avgTime"} onClick={() => setSortKey("avgTime")}>Avg czas</Th>
              <Th sortable active={sortKey === "bounce"} onClick={() => setSortKey("bounce")}>Bounce</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.path} className="border-t border-white/5">
                <td className="py-2.5">
                  <span className="font-mono-stat text-saiyan-white">{r.path}</span>
                  <span className="ml-2 text-xs text-saiyan-white/45">{r.title}</span>
                </td>
                <td className="font-mono-stat text-saiyan-white/90">{formatPL(r.views)}</td>
                <td className="font-mono-stat text-saiyan-white/70">{formatPL(r.uniques)}</td>
                <td className="font-mono-stat text-saiyan-white/70">{formatDuration(r.avgTime)}</td>
                <td className={cn("font-mono-stat", r.bounce > 35 ? "text-loss-red" : "text-win-green")}>
                  {r.bounce.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

function TopClicksTable() {
  const [sortKey, setSortKey] = useState<"clicks" | "conversion">("clicks");
  const rows = useMemo(
    () => [...TOP_CLICKS].sort((a, b) => (b[sortKey] as number) - (a[sortKey] as number)),
    [sortKey],
  );
  return (
    <SectionCard title="Top kliknięcia" subtitle="CTA z największą trakcją na public site.">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-wider text-saiyan-white/45">
              <Th>Element</Th>
              <Th sortable active={sortKey === "clicks"} onClick={() => setSortKey("clicks")}>Kliknięć</Th>
              <Th sortable active={sortKey === "conversion"} onClick={() => setSortKey("conversion")}>Konwersja</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.elementId} className="border-t border-white/5">
                <td className="py-2.5">
                  <div className="font-medium text-saiyan-white">{r.label}</div>
                  <div className="font-mono-stat text-[10px] text-saiyan-white/40">{r.elementId}</div>
                </td>
                <td className="font-mono-stat text-saiyan-white/90">{formatPL(r.clicks)}</td>
                <td>
                  <span className={cn(
                    "inline-flex rounded-full px-2 py-0.5 font-mono-stat text-xs font-semibold",
                    r.conversion >= 10 ? "bg-energy-yellow/20 text-energy-yellow" :
                    r.conversion >= 5  ? "bg-win-green/15 text-win-green" :
                                         "bg-white/5 text-saiyan-white/70",
                  )}>
                    {r.conversion.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

function Th({ children, sortable, active, onClick }: { children: React.ReactNode; sortable?: boolean; active?: boolean; onClick?: () => void }) {
  if (!sortable) return <th className="pb-2 font-semibold">{children}</th>;
  return (
    <th className="pb-2 font-semibold">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1 transition-colors",
          active ? "text-energy-yellow" : "text-saiyan-white/45 hover:text-saiyan-white",
        )}
      >
        {children}
        <span className="text-[10px]">{active ? "↓" : ""}</span>
      </button>
    </th>
  );
}

// ─── FUNNEL ────────────────────────────────────────────────────────────────

function FunnelSection() {
  const stages = useMemo(getFunnel, []);
  return (
    <SectionCard title="Lejek konwersji" subtitle="Od pierwszej wizyty do płacącego subskrybenta.">
      <div className="space-y-3">
        {stages.map((s, i) => {
          const width = Math.max(18, s.pctOfTotal); // visual floor
          return (
            <div key={s.label} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between text-xs text-saiyan-white/75">
                <div className="flex items-center gap-2">
                  <span className="font-mono-stat text-saiyan-white/40">0{i + 1}</span>
                  <span className="font-medium text-saiyan-white">{s.label}</span>
                </div>
                <div className="flex items-center gap-3 font-mono-stat">
                  {i > 0 && (
                    <span className="text-loss-red">−{formatPL(s.dropoff)}</span>
                  )}
                  <span className="rounded-full bg-energy-yellow/15 px-2 py-0.5 text-[10px] font-bold text-energy-yellow">
                    {i === 0 ? "100%" : `${s.pctFromPrev.toFixed(1)}%`}
                  </span>
                  <span className="text-saiyan-white">{formatPL(s.count)}</span>
                  <span className="text-saiyan-white/40">({s.pctOfTotal.toFixed(1)}%)</span>
                </div>
              </div>
              <div className="relative h-10 overflow-hidden rounded-xl bg-navy-mid/60">
                <div
                  className="h-full rounded-xl"
                  style={{
                    width: `${width}%`,
                    background: "linear-gradient(90deg, #FFD60A 0%, #1E40FF 100%)",
                    boxShadow: "0 0 24px -8px rgba(255,214,10,0.45)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

// ─── SOURCES ───────────────────────────────────────────────────────────────

function SourcesSection() {
  const { sources, referrers } = useMemo(getSources, []);
  return (
    <SectionCard title="Źródła ruchu" subtitle="Skąd przychodzą unikalni użytkownicy.">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="h-44 w-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={sources} dataKey="pct" nameKey="name" innerRadius={50} outerRadius={78} stroke="none">
                {sources.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} formatter={(v: number, _n, item) => [`${v}% (${formatPL((item.payload as { count: number }).count)})`, item.payload?.name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex-1 space-y-1.5 text-xs">
          {sources.map((s) => (
            <li key={s.name} className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-saiyan-white/85">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                {s.name}
              </span>
              <span className="font-mono-stat text-saiyan-white">
                {s.pct.toFixed(1)}% <span className="text-saiyan-white/45">({formatPL(s.count)})</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 border-t border-white/5 pt-3">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-saiyan-white/45">
          Top referrerzy
        </div>
        <ul className="space-y-1 text-xs">
          {referrers.map((r) => (
            <li key={r.domain} className="flex items-center justify-between">
              <span className="font-mono-stat text-saiyan-white/80">{r.domain}</span>
              <span className="font-mono-stat text-saiyan-white">{formatPL(r.count)}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionCard>
  );
}

// ─── DEVICES ───────────────────────────────────────────────────────────────

function DevicesSection() {
  const { devices, browsers } = useMemo(getDevices, []);
  return (
    <SectionCard title="Urządzenia" subtitle="Mobile dominuje – projektuj „mobile-first”.">
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={devices} margin={{ top: 4, right: 24, left: 8, bottom: 4 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" stroke="#8A93B8" tick={{ fill: "#8A93B8", fontSize: 12 }} tickLine={false} axisLine={false} width={70} />
            <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} cursor={{ fill: "rgba(255,255,255,0.04)" }} formatter={(v: number, _n, item) => [`${v}% (${formatPL((item.payload as { count: number }).count)} sesji)`, item.payload?.name]} />
            <Bar dataKey="pct" radius={[0, 8, 8, 0]}>
              {devices.map((d, i) => (
                <Cell key={d.name} fill={["#FFD60A", "#1E40FF", "#00D26A"][i] ?? "#94a3b8"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 border-t border-white/5 pt-3">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-saiyan-white/45">
          Przeglądarki
        </div>
        <ul className="space-y-1 text-xs">
          {browsers.map((b) => (
            <li key={b.name} className="flex items-center justify-between">
              <span className="text-saiyan-white/80">{b.name}</span>
              <span className="font-mono-stat text-saiyan-white">{b.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionCard>
  );
}

// ─── GEO ───────────────────────────────────────────────────────────────────

function GeoSection() {
  const { countries, plCities } = useMemo(getGeo, []);
  const maxCity = Math.max(...plCities.map((c) => c.count));
  return (
    <SectionCard title="Geografia odwiedzających" subtitle="Polska to ~88% ruchu. Reszta to diaspora i UK/DE/NL.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
        {/* Stylised Europe map (PL spotlight) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-navy-deep/60 ring-1 ring-white/5">
          <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
            {/* Europe rough outline */}
            <path
              d="M40 90 L90 60 L160 50 L230 70 L300 65 L350 95 L360 160 L320 220 L260 250 L200 245 L130 240 L70 200 Z"
              fill="rgba(30,64,255,0.10)"
              stroke="rgba(30,64,255,0.35)"
              strokeWidth="1"
            />
            {/* Poland */}
            <path
              d="M210 110 L260 105 L280 130 L275 170 L240 190 L200 185 L185 150 Z"
              fill="rgba(255,214,10,0.25)"
              stroke="#FFD60A"
              strokeWidth="1.5"
            />
            {/* City dots — Warszawa, Kraków, Poznań, Wrocław, Gdańsk, Łódź, Katowice, Inne */}
            {[
              { city: "Warszawa", x: 245, y: 140 },
              { city: "Kraków",   x: 240, y: 175 },
              { city: "Poznań",   x: 215, y: 130 },
              { city: "Wrocław",  x: 215, y: 160 },
              { city: "Gdańsk",   x: 230, y: 110 },
              { city: "Łódź",     x: 232, y: 150 },
              { city: "Katowice", x: 232, y: 172 },
            ].map((c) => {
              const row = plCities.find((p) => p.name === c.city);
              if (!row) return null;
              const r = 3 + (row.count / maxCity) * 9;
              return (
                <g key={c.city}>
                  <circle cx={c.x} cy={c.y} r={r + 4} fill="rgba(255,214,10,0.15)" />
                  <circle cx={c.x} cy={c.y} r={r} fill="#FFD60A">
                    <title>{c.city} – {formatPL(row.count)} sesji</title>
                  </circle>
                </g>
              );
            })}
          </svg>
          <div className="absolute bottom-3 left-3 rounded-md bg-navy-deep/80 px-2 py-1 text-[10px] font-medium uppercase tracking-widest text-saiyan-white/60 ring-1 ring-white/5">
            Polska · {formatPL(countries[0].count)} sesji
          </div>
        </div>

        <div>
          <ul className="space-y-1.5 text-sm">
            {countries.map((c) => (
              <li key={c.name} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-white/5">
                <span className="inline-flex items-center gap-2">
                  <Emoji size={16}>{c.flag}</Emoji>
                  <span className="text-saiyan-white">{c.name}</span>
                </span>
                <span className="font-mono-stat text-saiyan-white">
                  {formatPL(c.count)} <span className="text-saiyan-white/40">({c.pct.toFixed(1)}%)</span>
                </span>
              </li>
            ))}
          </ul>

          <details className="mt-3 rounded-xl border border-white/5 bg-navy-deep/40 p-3 open:bg-navy-deep/60">
            <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-widest text-saiyan-white/60 hover:text-saiyan-white">
              Polska — top miasta
            </summary>
            <ul className="mt-3 grid grid-cols-2 gap-1.5 text-xs">
              {plCities.map((c) => (
                <li key={c.name} className="flex items-center justify-between rounded px-1.5 py-0.5">
                  <span className="text-saiyan-white/80">{c.name}</span>
                  <span className="font-mono-stat text-saiyan-white">{formatPL(c.count)}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </SectionCard>
  );
}


// ─── PRIMITIVES ────────────────────────────────────────────────────────────

function SectionCard({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/5 bg-navy-mid/40 p-5 shadow-card-premium">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-saiyan-white">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-saiyan-white/50">{subtitle}</p>}
        </div>
        {right}
      </header>
      {children}
    </section>
  );
}

