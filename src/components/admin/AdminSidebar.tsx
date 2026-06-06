import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  Users,
  BarChart3,
  Activity,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import logoVegeta from "@/assets/logo-vegeta.png";

const items = [
  { title: "Dashboard",       url: "/admin",              icon: LayoutDashboard, live: false },
  { title: "Nowy typ",        url: "/admin/nowy-typ",     icon: PlusCircle,      live: false },
  { title: "Historia typów",  url: "/admin/tipy",         icon: History,         live: false },
  { title: "Subskrybenci",    url: "/admin/subskrybenci", icon: Users,           live: false },
  { title: "Statystyki",      url: "/admin/statystyki",   icon: BarChart3,       live: false },
  { title: "Ruch na stronie", url: "/admin/traffic",      icon: Activity,        live: false },
  { title: "Wiadomości",      url: "/admin/wiadomosci",   icon: MessageSquare,   live: false },
  { title: "Płatności",       url: "/admin/platnosci",    icon: CreditCard,      live: false },
  { title: "Ustawienia",      url: "/admin/ustawienia",   icon: Settings,        live: false },
] as const;

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const isActive = (url: string) =>
    url === "/admin" ? pathname === "/admin" : pathname.startsWith(url);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/5 bg-navy-deep [&_[data-sidebar=sidebar]]:bg-navy-deep"
    >
      <SidebarHeader className="border-b border-white/5 px-3 py-4">
        <Link to="/admin" className="flex items-center gap-2">
          <img src={logoVegeta} alt="Vegeta" className="h-8 w-auto" />
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-display text-sm font-bold text-saiyan-white">
                VEGETA TIPS
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-energy-yellow">
                Admin Panel
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-widest text-saiyan-white/40">
              Główne
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className={
                        active
                          ? "bg-energy-yellow/10 text-energy-yellow hover:bg-energy-yellow/15 hover:text-energy-yellow data-[active=true]:bg-energy-yellow/10 data-[active=true]:text-energy-yellow"
                          : "text-saiyan-white/70 hover:bg-white/5 hover:text-saiyan-white"
                      }
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="font-medium">{item.title}</span>
                        {item.live && !collapsed && (
                          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-win-green/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-win-green ring-1 ring-win-green/30">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-win-green opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-win-green" />
                            </span>
                            Live
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/5 p-3">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-energy-yellow font-display text-sm font-bold text-navy-deep">
            V
          </div>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-saiyan-white">Vegeta</p>
                <p className="truncate text-xs text-saiyan-white/50">admin</p>
              </div>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-saiyan-white/60 hover:bg-white/5 hover:text-loss-red"
                aria-label="Wyloguj"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
