/**
 * Vegeta Tips — public site analytics tracker (STUB).
 *
 * Etap obecny: no-op stub. Po włączeniu Lovable Cloud podmień implementacje
 * funkcji na inserty do tabel `sessions / page_views / click_events`
 * (anon insert RLS, deny anon select).
 *
 * Wszystkie metody są bezpieczne do wywołania w SSR (sprawdzają `window`).
 */

const SESSION_KEY = "vt_session_token";

type DeviceType = "mobile" | "tablet" | "desktop";

export type TrackerSession = {
  token: string;
  startedAt: number;
  pageCount: number;
  deviceType: DeviceType;
  browser: string;
  os: string;
  referrer: string;
  utm: {
    source: string | null;
    medium: string | null;
    campaign: string | null;
  };
};

let SESSION: TrackerSession | null = null;
let HEARTBEAT_ID: number | null = null;
let CLICK_HANDLER: ((e: MouseEvent) => void) | null = null;

function genToken() {
  return (
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 10)
  );
}

function detectDevice(ua: string): DeviceType {
  if (/Tablet|iPad/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "mobile";
  return "desktop";
}

function detectBrowser(ua: string): string {
  if (/Edg\//.test(ua)) return "Edge";
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return "Chrome";
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/OPR\//.test(ua)) return "Opera";
  return "Inne";
}

function detectOS(ua: string): string {
  if (/Windows/.test(ua)) return "Windows";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Mac OS X/.test(ua)) return "macOS";
  if (/Linux/.test(ua)) return "Linux";
  return "Inne";
}

function readUtm() {
  if (typeof window === "undefined") {
    return { source: null, medium: null, campaign: null };
  }
  const p = new URLSearchParams(window.location.search);
  return {
    source: p.get("utm_source"),
    medium: p.get("utm_medium"),
    campaign: p.get("utm_campaign"),
  };
}

function dbg(...args: unknown[]) {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[tracker]", ...args);
  }
}

export function initTracker(): TrackerSession | null {
  if (typeof window === "undefined") return null;
  if (SESSION) return SESSION;

  let token = window.localStorage.getItem(SESSION_KEY);
  if (!token) {
    token = genToken();
    window.localStorage.setItem(SESSION_KEY, token);
  }

  const ua = window.navigator.userAgent;
  SESSION = {
    token,
    startedAt: Date.now(),
    pageCount: 0,
    deviceType: detectDevice(ua),
    browser: detectBrowser(ua),
    os: detectOS(ua),
    referrer: document.referrer || "(direct)",
    utm: readUtm(),
  };

  // Global click listener for [data-track] elements.
  if (!CLICK_HANDLER) {
    CLICK_HANDLER = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-track]",
      ) as HTMLElement | null;
      if (!target) return;
      const id = target.getAttribute("data-track") || "unknown";
      const label = target.getAttribute("data-track-label") || target.textContent?.trim() || id;
      const type = (target.getAttribute("data-track-type") as
        | "button"
        | "link"
        | "card"
        | "tab"
        | null) || "button";
      trackClick(id, label, type);
    };
    document.addEventListener("click", CLICK_HANDLER, { passive: true });
  }

  // Heartbeat every 30s.
  if (HEARTBEAT_ID === null) {
    HEARTBEAT_ID = window.setInterval(trackHeartbeat, 30_000);
  }

  // Final flush on unload.
  window.addEventListener("beforeunload", () => trackHeartbeat(true), { once: false });

  dbg("init", SESSION);
  return SESSION;
}

export function trackPageView(path: string, title?: string) {
  if (!SESSION) return;
  SESSION.pageCount += 1;
  dbg("pageview", { path, title, count: SESSION.pageCount });
  // TODO(cloud): insert into page_views
}

export function trackClick(
  elementId: string,
  label: string,
  type: "button" | "link" | "card" | "tab" = "button",
) {
  if (!SESSION) return;
  dbg("click", { elementId, label, type });
  // TODO(cloud): insert into click_events
}

export function trackHeartbeat(_final = false) {
  if (!SESSION) return;
  dbg("heartbeat", { duration: Date.now() - SESSION.startedAt, final: _final });
  // TODO(cloud): update sessions.last_seen_at / duration_seconds
}

export function trackConversion() {
  if (!SESSION) return;
  dbg("conversion");
  // TODO(cloud): update sessions.converted = true
}

/**
 * Helper to scatter `data-track` attributes across JSX without typo risk.
 *
 *   <a {...trackingProps("hero-cta-primary", "Odbierz dzisiejsze typy", "button")} ...>
 */
export function trackingProps(
  id: string,
  label: string,
  type: "button" | "link" | "card" | "tab" = "button",
) {
  return {
    "data-track": id,
    "data-track-label": label,
    "data-track-type": type,
  };
}
