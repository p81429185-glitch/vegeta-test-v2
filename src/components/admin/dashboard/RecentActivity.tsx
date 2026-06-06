import { CreditCard, MessageSquare, Target, UserPlus } from "lucide-react";
import { recentActivity } from "@/lib/admin/mockData";
import { cn } from "@/lib/utils";

const ICONS = {
  tip: Target,
  sub: UserPlus,
  payment: CreditCard,
  msg: MessageSquare,
} as const;

export function RecentActivity() {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-navy-mid/80 to-navy-deep p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-bold text-saiyan-white">
          Ostatnia aktywność
        </h3>
        <button
          type="button"
          className="text-xs font-semibold text-energy-yellow hover:underline"
        >
          Zobacz wszystko
        </button>
      </div>
      <ul className="space-y-3">
        {recentActivity.map((a) => {
          const Icon = ICONS[a.type];
          return (
            <li
              key={a.id}
              className="flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-white/[0.03]"
            >
              <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-saiyan-white/70">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-saiyan-white">{a.text}</p>
                <p className="mt-0.5 text-xs text-saiyan-white/40">{a.time}</p>
              </div>
              {a.amount && (
                <span
                  className={cn(
                    "shrink-0 self-center font-mono text-sm font-bold tabular-nums",
                    a.positive ? "text-win-green" : "text-loss-red",
                  )}
                >
                  {a.amount}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
