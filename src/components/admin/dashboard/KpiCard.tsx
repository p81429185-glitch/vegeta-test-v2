import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  delta: number;
  deltaLabel: string;
  trend: "up" | "down";
  icon: LucideIcon;
};

export function KpiCard({ label, value, deltaLabel, trend, icon: Icon }: Props) {
  const positive = trend === "up";
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-navy-mid/80 to-navy-deep p-5 transition-all hover:border-white/10 hover:shadow-[0_12px_40px_rgba(30,64,255,0.15)]">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-saiyan-white/50">
            {label}
          </p>
          <p className="font-display text-3xl font-bold tabular-nums text-saiyan-white">
            {value}
          </p>
        </div>
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-energy-yellow/10 ring-1 ring-energy-yellow/20">
          <Icon className="h-5 w-5 text-energy-yellow" />
        </div>
      </div>

      <div
        className={cn(
          "mt-4 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
          positive
            ? "bg-win-green/10 text-win-green"
            : "bg-loss-red/10 text-loss-red",
        )}
      >
        {positive ? (
          <ArrowUpRight className="h-3 w-3" />
        ) : (
          <ArrowDownRight className="h-3 w-3" />
        )}
        <span>{deltaLabel}</span>
      </div>
    </div>
  );
}
