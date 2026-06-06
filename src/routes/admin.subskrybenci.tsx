import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, X, Crown, Calendar, Globe2, Wallet, Activity, Mail, Flame, Sparkles } from "lucide-react";
import {
  mockSubscribers,
  type SubPlan,
  type SubStatus,
  type Subscriber,
} from "@/lib/admin/mockSubscribers";
import { PLANS, PLAN_IDS, formatPLN, type PlanId } from "@/lib/plans";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/subskrybenci")({
  component: SubscribersPage,
});

const PLAN_FILTERS: (SubPlan | "all")[] = ["all", ...PLAN_IDS];
const STATUS_FILTERS: { id: SubStatus | "all"; label: string }[] = [
  { id: "all",      label: "Wszyscy" },
  { id: "active",   label: "Aktywni" },
  { id: "trial",    label: "Trial" },
  { id: "canceled", label: "Anulowani" },
  { id: "expired",  label: "Wygaśli" },
];

function SubscribersPage() {
  const [q, setQ] = useState("");
  const [plan, setPlan] = useState<SubPlan | "all">("all");
  const [status, setStatus] = useState<SubStatus | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      mockSubscribers.filter((s) => {
        if (plan !== "all" && s.plan !== plan) return false;
        if (status !== "all" && s.status !== status) return false;
        if (q && !`${s.name} ${s.email}`.toLowerCase().includes(q.toLowerCase()))
          return false;
        return true;
      }),
    [q, plan, status],
  );

  const totals = useMemo(() => {
    const mrr = filtered.reduce((s, x) => s + x.mrr, 0);
    const ltv = filtered.reduce((s, x) => s + x.ltv, 0);
    const active = filtered.filter((x) => x.status === "active").length;
    return { count: filtered.length, mrr, ltv, active };
  }, [filtered]);

  const selected = openId ? mockSubscribers.find((s) => s.id === openId) ?? null : null;

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-saiyan-white">Subskrybenci</h2>
        <p className="mt-1 text-sm text-saiyan-white/50">
          {totals.count} kont · <span className="text-win-green">{totals.active} aktywnych</span> ·{" "}
          MRR <span className="font-mono font-bold text-energy-yellow">{formatPLN(totals.mrr)}</span> ·{" "}
          LTV łącznie <span className="font-mono font-bold text-saiyan-white">{formatPLN(totals.ltv)}</span>
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/5 bg-navy-mid/40 p-3">
        <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-2">
          <Search className="h-4 w-4 text-saiyan-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Szukaj po imieniu, e-mailu..."
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

        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value as SubPlan | "all")}
          className="rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-saiyan-white focus:border-energy-yellow/40 focus:outline-none"
        >
          {PLAN_FILTERS.map((p) => (
            <option key={p} value={p} className="bg-navy-deep">
              {p === "all" ? "Wszystkie plany" : PLANS[p].shortLabel}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-navy-mid/60 to-navy-deep">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] text-[10px] uppercase tracking-wider text-saiyan-white/40">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Subskrybent</th>
                <th className="px-4 py-3 text-left font-semibold">Plan</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Dołączył</th>
                <th className="px-4 py-3 text-right font-semibold">MRR</th>
                <th className="px-4 py-3 text-right font-semibold">LTV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setOpenId(s.id)}
                  className="cursor-pointer transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar text={s.avatar} />
                      <div className="min-w-0">
                        <p className="font-semibold text-saiyan-white">{s.name}</p>
                        <p className="truncate text-xs text-saiyan-white/40">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <PlanBadge plan={s.plan} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-4 py-3 text-saiyan-white/60">
                    {new Date(s.joinedAt).toLocaleDateString("pl-PL", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-energy-yellow">
                    {s.mrr > 0 ? formatPLN(s.mrr) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold tabular-nums text-saiyan-white">
                    {formatPLN(s.ltv)}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-saiyan-white/40">
                    Brak subskrybentów dla wybranych filtrów.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SubscriberSheet sub={selected} onClose={() => setOpenId(null)} />
    </div>
  );
}

function Avatar({ text }: { text: string }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saiyan-blue to-energy-yellow/60 font-display text-xs font-bold text-navy-deep">
      {text}
    </div>
  );
}

const PLAN_BADGE_STYLE: Record<PlanId, string> = {
  "gold-30": "bg-saiyan-blue/15 text-[#3BB7FF]",
  "gold-60": "bg-energy-yellow/15 text-energy-yellow",
  ultravip:  "bg-[#a855f7]/15 text-[#c084fc]",
};

const PLAN_BADGE_ICON: Record<PlanId, React.ComponentType<{ className?: string }>> = {
  "gold-30": Sparkles,
  "gold-60": Crown,
  ultravip:  Flame,
};

function PlanBadge({ plan }: { plan: PlanId }) {
  const Icon = PLAN_BADGE_ICON[plan];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
        PLAN_BADGE_STYLE[plan],
      )}
    >
      <Icon className="h-3 w-3" />
      {PLANS[plan].shortLabel}
    </span>
  );
}

function StatusBadge({ status }: { status: SubStatus }) {
  const map = {
    active:   { label: "Aktywny",   cls: "bg-win-green/10 text-win-green" },
    trial:    { label: "Trial",     cls: "bg-energy-yellow/10 text-energy-yellow" },
    canceled: { label: "Anulowany", cls: "bg-loss-red/10 text-loss-red" },
    expired:  { label: "Wygasł",    cls: "bg-white/5 text-saiyan-white/50" },
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

function SubscriberSheet({ sub, onClose }: { sub: Subscriber | null; onClose: () => void }) {
  const open = !!sub;
  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-navy-deep/70 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-white/5 bg-navy-deep transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {sub && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/5 p-5">
              <div className="flex items-center gap-3">
                <Avatar text={sub.avatar} />
                <div>
                  <p className="font-display text-lg font-bold text-saiyan-white">{sub.name}</p>
                  <p className="text-xs text-saiyan-white/50">{sub.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-saiyan-white/60 hover:bg-white/5 hover:text-saiyan-white"
                aria-label="Zamknij"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <div className="flex items-center gap-2">
                <PlanBadge plan={sub.plan} />
                <StatusBadge status={sub.status} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Stat icon={Wallet} label="MRR" value={sub.mrr > 0 ? formatPLN(sub.mrr) : "—"} accent="yellow" />
                <Stat icon={Wallet} label="LTV" value={formatPLN(sub.ltv)} />
                <Stat
                  icon={Calendar}
                  label="Dołączył"
                  value={new Date(sub.joinedAt).toLocaleDateString("pl-PL")}
                />
                <Stat
                  icon={Calendar}
                  label="Odnawia"
                  value={new Date(sub.renewsAt).toLocaleDateString("pl-PL")}
                />
                <Stat icon={Globe2} label="Kraj" value={sub.country} />
                <Stat
                  icon={Activity}
                  label="Ostatnio aktywny"
                  value={new Date(sub.lastActive).toLocaleString("pl-PL", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-saiyan-white/40">
                  Notatka prywatna
                </p>
                <p className="mt-2 text-sm italic text-saiyan-white/70">
                  {sub.notes ?? "Brak notatek. Dodaj informacje o subskrybencie."}
                </p>
              </div>
            </div>

            <div className="border-t border-white/5 p-5">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-energy-yellow px-4 py-2.5 font-display text-sm font-bold text-navy-deep transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,214,10,0.4)]"
                >
                  <Mail className="h-4 w-4" /> Wyślij wiadomość
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-saiyan-white/80 hover:bg-white/5"
                >
                  Edytuj
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent?: "yellow";
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="flex items-center gap-2 text-saiyan-white/40">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p
        className={cn(
          "mt-1 font-mono text-sm font-bold tabular-nums",
          accent === "yellow" ? "text-energy-yellow" : "text-saiyan-white",
        )}
      >
        {value}
      </p>
    </div>
  );
}
