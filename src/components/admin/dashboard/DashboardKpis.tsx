import { Users, TrendingUp, Target, Wallet } from "lucide-react";
import { KpiCard } from "./KpiCard";
import { kpis } from "@/lib/admin/mockData";

const ICONS = {
  subs: Users,
  roi: TrendingUp,
  winrate: Target,
  mrr: Wallet,
} as const;

export function DashboardKpis() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((k) => (
        <KpiCard
          key={k.id}
          label={k.label}
          value={k.value}
          delta={k.delta}
          deltaLabel={k.deltaLabel}
          trend={k.trend}
          icon={ICONS[k.id as keyof typeof ICONS]}
        />
      ))}
    </div>
  );
}
