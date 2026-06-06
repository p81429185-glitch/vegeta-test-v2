import { useRouterState } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/nowy-typ": "Nowy typ",
  "/admin/tipy": "Historia typów",
  "/admin/subskrybenci": "Subskrybenci",
  "/admin/statystyki": "Statystyki",
  "/admin/wiadomosci": "Wiadomości",
  "/admin/platnosci": "Płatności",
  "/admin/ustawienia": "Ustawienia",
};

export function AdminTopbar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const title = TITLES[pathname] ?? "Admin";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/5 bg-navy-deep/80 px-4 backdrop-blur-xl md:px-6">
      <SidebarTrigger className="text-saiyan-white/70 hover:bg-white/5 hover:text-saiyan-white" />

      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-medium uppercase tracking-widest text-saiyan-white/40">
          Panel admina
        </span>
        <h1 className="font-display text-base font-bold text-saiyan-white">{title}</h1>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-2 md:flex">
          <Search className="h-4 w-4 text-saiyan-white/40" />
          <input
            type="text"
            placeholder="Szukaj typów, subskrybentów..."
            className="w-64 bg-transparent text-sm text-saiyan-white placeholder:text-saiyan-white/40 focus:outline-none"
          />
        </div>

        <button
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-saiyan-white/70 hover:bg-white/5 hover:text-saiyan-white"
          aria-label="Powiadomienia"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 inline-flex h-2 w-2 rounded-full bg-loss-red ring-2 ring-navy-deep" />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-energy-yellow font-display text-sm font-bold text-navy-deep">
          V
        </div>
      </div>
    </header>
  );
}
