import { createFileRoute } from "@tanstack/react-router";
import { DashboardKpis } from "@/components/admin/dashboard/DashboardKpis";
import { ProfitChart } from "@/components/admin/dashboard/ProfitChart";
import { RecentActivity } from "@/components/admin/dashboard/RecentActivity";
import { TopMarkets } from "@/components/admin/dashboard/TopMarkets";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-saiyan-white">
          Witaj z powrotem, Vegeta
        </h2>
        <p className="mt-1 text-sm text-saiyan-white/50">
          Tu jest dziś Twój panel dowodzenia. Aktualne dane z ostatnich 30 dni.
        </p>
      </div>

      <DashboardKpis />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ProfitChart />
        </div>
        <RecentActivity />
      </div>

      <TopMarkets />
    </div>
  );
}
