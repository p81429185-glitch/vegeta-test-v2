import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Search, Wallet, TrendingUp, Calendar } from "lucide-react";
import { mockPayments, type Payment } from "@/lib/admin/mockComms";
import { PLANS, formatPLN } from "@/lib/plans";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/platnosci")({
  component: PaymentsPage,
});

const STATUS_FILTERS: { id: Payment["status"] | "all"; label: string }[] = [
  { id: "all",      label: "Wszystkie" },
  { id: "paid",     label: "Opłacone" },
  { id: "pending",  label: "Oczekujące" },
  { id: "failed",   label: "Nieudane" },
  { id: "refunded", label: "Zwrócone" },
];

function PaymentsPage() {
  const [status, setStatus] = useState<Payment["status"] | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      mockPayments.filter((p) => {
        if (status !== "all" && p.status !== status) return false;
        if (q && !`${p.customer} ${p.email} ${p.id}`.toLowerCase().includes(q.toLowerCase()))
          return false;
        return true;
      }),
    [status, q],
  );

  const totals = useMemo(() => {
    const paid = filtered.filter((p) => p.status === "paid");
    const sum = paid.reduce((s, p) => s + p.amount, 0);
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const thisMonth = paid
      .filter((p) => new Date(p.date) >= monthStart)
      .reduce((s, p) => s + p.amount, 0);
    return { count: filtered.length, sum, thisMonth, avg: paid.length > 0 ? sum / paid.length : 0 };
  }, [filtered]);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-saiyan-white">Płatności</h2>
        <p className="mt-1 text-sm text-saiyan-white/50">
          Historia transakcji od subskrybentów (mock data).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Tile icon={Wallet} label="Przychód łącznie" value={formatPLN(totals.sum)} />
        <Tile icon={Calendar} label="Ten miesiąc" value={formatPLN(totals.thisMonth)} />
        <Tile icon={TrendingUp} label="Średnia transakcja" value={formatPLN(Math.round(totals.avg))} />
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/5 bg-navy-mid/40 p-3">
        <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-2">
          <Search className="h-4 w-4 text-saiyan-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Szukaj klienta, ID..."
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

        <button
          type="button"
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-saiyan-white/80 hover:bg-white/5"
        >
          <Download className="h-3.5 w-3.5" />
          Eksport CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-navy-mid/60 to-navy-deep">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] text-[10px] uppercase tracking-wider text-saiyan-white/40">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">ID</th>
                <th className="px-4 py-3 text-left font-semibold">Data</th>
                <th className="px-4 py-3 text-left font-semibold">Klient</th>
                <th className="px-4 py-3 text-left font-semibold">Plan</th>
                <th className="px-4 py-3 text-left font-semibold">Metoda</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Kwota</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-saiyan-white/40">
                    {p.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-saiyan-white/60">
                    {new Date(p.date).toLocaleDateString("pl-PL", { day: "2-digit", month: "short" })}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-saiyan-white">{p.customer}</p>
                    <p className="text-xs text-saiyan-white/40">{p.email}</p>
                  </td>
                  <td className="px-4 py-3 text-saiyan-white/80">{PLANS[p.plan].displayName}</td>
                  <td className="px-4 py-3 text-saiyan-white/60">{p.method}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td
                    className={cn(
                      "whitespace-nowrap px-4 py-3 text-right font-mono font-bold tabular-nums",
                      p.status === "paid" && "text-win-green",
                      p.status === "refunded" && "text-loss-red",
                      (p.status === "pending" || p.status === "failed") && "text-saiyan-white/60",
                    )}
                  >
                    {p.status === "refunded" ? "-" : ""}
                    {formatPLN(p.amount)}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-saiyan-white/40">
                    Brak transakcji dla wybranych filtrów.
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

function StatusBadge({ status }: { status: Payment["status"] }) {
  const map = {
    paid:     { label: "Opłacone",   cls: "bg-win-green/10 text-win-green" },
    pending:  { label: "Oczekuje",   cls: "bg-energy-yellow/10 text-energy-yellow" },
    failed:   { label: "Nieudane",   cls: "bg-loss-red/10 text-loss-red" },
    refunded: { label: "Zwrot",      cls: "bg-white/5 text-saiyan-white/50" },
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

function Tile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-navy-mid/80 to-navy-deep p-4">
      <div className="flex items-center gap-2 text-saiyan-white/40">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-2 font-display text-2xl font-bold tabular-nums text-saiyan-white">{value}</p>
    </div>
  );
}
