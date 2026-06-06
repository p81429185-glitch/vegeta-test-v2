import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { User, CreditCard, Bell, Palette, Plug, Check } from "lucide-react";
import { PLANS, PLAN_IDS } from "@/lib/plans";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/ustawienia")({
  component: SettingsPage,
});

const TABS = [
  { id: "profile",      label: "Profil",       icon: User },
  { id: "pricing",      label: "Cennik",       icon: CreditCard },
  { id: "notifications", label: "Powiadomienia", icon: Bell },
  { id: "appearance",   label: "Wygląd",       icon: Palette },
  { id: "integrations", label: "Integracje",   icon: Plug },
] as const;

type TabId = (typeof TABS)[number]["id"];

function SettingsPage() {
  const [tab, setTab] = useState<TabId>("profile");

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-saiyan-white">Ustawienia</h2>
        <p className="mt-1 text-sm text-saiyan-white/50">
          Profil, cennik, integracje i wygląd panelu.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
        {/* Sidebar tabs */}
        <nav className="space-y-1">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                  active
                    ? "bg-energy-yellow/10 text-energy-yellow"
                    : "text-saiyan-white/70 hover:bg-white/[0.03] hover:text-saiyan-white",
                )}
              >
                <t.icon className="h-4 w-4 shrink-0" />
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* Tab content */}
        <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-navy-mid/80 to-navy-deep p-6">
          {tab === "profile" && <ProfileTab />}
          {tab === "pricing" && <PricingTab />}
          {tab === "notifications" && <NotificationsTab />}
          {tab === "appearance" && <AppearanceTab />}
          {tab === "integrations" && <IntegrationsTab />}
        </div>
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <Section title="Profil tipstera" description="Te dane widzą subskrybenci na stronie.">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-saiyan-blue to-energy-yellow font-display text-2xl font-bold text-navy-deep">
          V
        </div>
        <div>
          <p className="font-display text-lg font-bold text-saiyan-white">Vegeta</p>
          <button className="text-xs font-semibold text-energy-yellow hover:underline">
            Zmień avatar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nick">
          <Input defaultValue="Vegeta" />
        </Field>
        <Field label="E-mail">
          <Input defaultValue="vegeta@bet-analytix.com" type="email" />
        </Field>
        <Field label="Telefon">
          <Input defaultValue="+48 600 000 000" />
        </Field>
        <Field label="Kraj">
          <Input defaultValue="Polska" />
        </Field>
        <Field label="Bio" full>
          <textarea
            defaultValue="Najskuteczniejszy polski tipster. Premium typy z analizą."
            rows={3}
            className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-saiyan-white focus:border-energy-yellow/40 focus:outline-none"
          />
        </Field>
      </div>

      <SaveButton />
    </Section>
  );
}

function PricingTab() {
  return (
    <Section title="Cennik" description="Edytuj ceny i funkcje planów. Wartości wyświetlane na stronie głównej.">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {PLAN_IDS.map((id) => {
          const p = PLANS[id];
          return (
            <div key={p.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-lg font-bold text-saiyan-white">{p.name}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-saiyan-white/50">
                    {p.durationDays} dni{p.slotLimit ? ` · limit ${p.slotLimit} miejsc` : ""}
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                    p.accent === "blue" && "bg-saiyan-blue/15 text-[#3BB7FF]",
                    p.accent === "gold" && "bg-energy-yellow/15 text-energy-yellow",
                    p.accent === "purple" && "bg-[#a855f7]/15 text-[#c084fc]",
                  )}
                >
                  {p.accent}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-saiyan-white/40">
                    Jednorazowo (zł)
                  </span>
                  <Input defaultValue={String(p.price)} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-saiyan-white/40">
                    Subskrypcja (-5%)
                  </span>
                  <Input defaultValue={String(p.subscriptionPrice)} />
                </label>
              </div>

              <ul className="mt-3 space-y-1.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-saiyan-white/70">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-win-green" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <SaveButton />
    </Section>
  );
}

function NotificationsTab() {
  return (
    <Section title="Powiadomienia" description="Co chcesz dostawać i gdzie.">
      <div className="space-y-2">
        <Toggle label="E-mail: nowa wiadomość od subskrybenta" defaultOn />
        <Toggle label="E-mail: nowa płatność" defaultOn />
        <Toggle label="E-mail: anulowana subskrypcja" defaultOn />
        <Toggle label="Push: rozliczony typ" />
        <Toggle label="Push: dzienny raport ROI" defaultOn />
        <Toggle label="SMS: nieudana płatność > 200 zł" />
      </div>
      <SaveButton />
    </Section>
  );
}

function AppearanceTab() {
  const [accent, setAccent] = useState("yellow");
  const colors = [
    { id: "yellow", hex: "#FFD60A", name: "Energy Yellow" },
    { id: "blue",   hex: "#1E40FF", name: "Saiyan Blue" },
    { id: "green",  hex: "#00D26A", name: "Win Green" },
    { id: "red",    hex: "#FF3B30", name: "Loss Red" },
  ];
  return (
    <Section title="Wygląd panelu" description="Personalizuj kolory i motyw.">
      <Field label="Kolor akcentu">
        <div className="flex flex-wrap gap-3">
          {colors.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setAccent(c.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors",
                accent === c.id
                  ? "border-energy-yellow/40 bg-energy-yellow/5"
                  : "border-white/5 hover:border-white/10",
              )}
            >
              <span className="h-5 w-5 rounded-full" style={{ background: c.hex }} />
              <span className="text-sm text-saiyan-white">{c.name}</span>
            </button>
          ))}
        </div>
      </Field>
      <Toggle label="Tryb ciemny" defaultOn />
      <Toggle label="Zredukowana animacja" />
      <SaveButton />
    </Section>
  );
}

function IntegrationsTab() {
  const items = [
    { name: "Stripe",      desc: "Płatności kartami i Apple/Google Pay", connected: false },
    { name: "Przelewy24",  desc: "BLIK i polskie przelewy", connected: true },
    { name: "Telegram",    desc: "Bot do wysyłki typów", connected: true },
    { name: "Resend",      desc: "E-maile transakcyjne", connected: false },
    { name: "Bet-Analytix", desc: "Synchronizacja typów i ROI", connected: true },
  ];
  return (
    <Section title="Integracje" description="Połącz zewnętrzne narzędzia z panelem.">
      <div className="space-y-2">
        {items.map((i) => (
          <div
            key={i.name}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 font-display text-sm font-bold text-saiyan-white">
                {i.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-saiyan-white">{i.name}</p>
                <p className="text-xs text-saiyan-white/50">{i.desc}</p>
              </div>
            </div>
            <button
              type="button"
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors",
                i.connected
                  ? "bg-win-green/10 text-win-green hover:bg-win-green/15"
                  : "bg-energy-yellow text-navy-deep hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,214,10,0.35)]",
              )}
            >
              {i.connected ? "Połączone" : "Połącz"}
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- shared ---------- */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg font-bold text-saiyan-white">{title}</h3>
        {description && <p className="mt-1 text-xs text-saiyan-white/50">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={cn("block", full && "sm:col-span-2")}>
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-saiyan-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-saiyan-white focus:border-energy-yellow/40 focus:outline-none",
        className,
      )}
    />
  );
}

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-left hover:bg-white/[0.04]"
    >
      <span className="text-sm text-saiyan-white">{label}</span>
      <span
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          on ? "bg-energy-yellow" : "bg-white/10",
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 transform rounded-full bg-navy-deep transition-transform",
            on ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </span>
    </button>
  );
}

function SaveButton() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex justify-end pt-2">
      <button
        type="button"
        onClick={() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-bold transition-all",
          saved
            ? "bg-win-green text-navy-deep"
            : "bg-energy-yellow text-navy-deep hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,214,10,0.4)]",
        )}
      >
        {saved ? (
          <>
            <Check className="h-4 w-4" /> Zapisano
          </>
        ) : (
          "Zapisz zmiany"
        )}
      </button>
    </div>
  );
}
