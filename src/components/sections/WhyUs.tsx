const features = [
  {
    title: "Typy na żywo",
    description:
      "Śledź mecze w czasie rzeczywistym i otrzymuj typy live prosto z grupy nadawczej, z aktualnymi wynikami, statystykami i analizą na bieżąco.",
  },
  {
    title: "Typy przedmeczowe",
    description:
      "Wybieraj spotkania z najlepszym potencjałem. Codziennie sprawdzone typy przedmeczowe oparte na realnej analizie i wieloletnim doświadczeniu.",
  },
  {
    title: "Grupa nadawcza VIP",
    description:
      "Dołącz do zamkniętej grupy ze średnio 60–70 typami w miesiącu. Dostęp do typera Vegeta, ebooka ze strategią stawkowania i społeczności graczy.",
  },
  {
    title: "Sprawdzona skuteczność",
    description:
      "Stawiaj świadomie dzięki strategii, która działa. Wysoka skuteczność, kursy potrafiące wejść nawet powyżej 6.0 i transparentne wyniki kuponów.",
  },
  {
    title: "Powiadomienia w czasie rzeczywistym",
    description:
      "Nie przegap żadnego typu. Otrzymuj natychmiastowe powiadomienia o nowych kuponach, typach live i kluczowych okazjach przed meczem.",
  },
  {
    title: "Bądź na bieżąco",
    description:
      "Zapisz się i otrzymuj najnowsze typy, analizy oraz informacje od Vegety. Cała wiedza i aktualności w jednym miejscu — wszystko zawsze pod ręką.",
  },
];

function BaseFrame() {
  // 1:1 odwzorowanie bx-1.svg z fanfunded, stroke gradient w naszych barwach.
  return (
    <svg
      viewBox="0 0 526 327"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block w-full h-auto"
      preserveAspectRatio="none"
    >
      <path
        d="M507.168 14.0526L507.175 14.0604L521.748 29.9541C523.475 31.8373 524.32 34.3657 524.072 36.9087L496.783 317.191C496.334 321.802 492.459 325.318 487.826 325.318H32.8404C30.2012 325.318 27.695 324.16 25.9851 322.15L15.5775 309.914L15.5721 309.908L3.94407 296.003C2.40232 294.16 1.66198 291.776 1.88799 289.383L28.358 9.15365C28.7946 4.53153 32.6754 1 37.3181 1H491.438C493.993 1 496.428 2.08655 498.135 3.98854L498.88 3.3206L498.135 3.98854L507.168 14.0526Z"
        fill="#0A0E27"
        stroke="url(#wu_stroke)"
        strokeWidth="2"
      />
      <defs>
        <linearGradient
          id="wu_stroke"
          x1="511.222"
          y1="275.656"
          x2="-22.0933"
          y2="172.653"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD60A" stopOpacity="1" />
          <stop offset="1" stopColor="#FFD60A" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HoverFrame({ color = "#3BB7FF" }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 533 334"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block w-full h-auto"
      preserveAspectRatio="none"
    >
      <path
        d="M27.3624 9.05961C27.8475 3.92392 32.1596 0 37.3181 0H491.438C494.277 0 496.983 1.20728 498.88 3.3206L507.912 13.3846L522.472 29.2634C524.398 31.3645 525.337 34.1879 525.051 37.0242L496.806 317.321C496.291 322.43 491.991 326.318 486.856 326.318H32.8404C29.908 326.318 27.1233 325.031 25.2233 322.798L14.8104 310.556L3.17696 296.645C1.4639 294.596 0.6413 291.948 0.892418 289.289L27.3624 9.05961Z"
        fill={color}
      />
    </svg>
  );
}

import tarcza from "@/assets/tarcza.png.asset.json";

export default function WhyUs() {
  return (
    <section className="why-us relative mobile-none" style={{ padding: "60px 0", background: "linear-gradient(180deg, #060a1a 0%, #0a1024 30%, #0a1024 70%, #060a1a 100%)", overflow: "visible" }}>
      {/* Clean top fade-in — bezszwowe przejście z sekcji opinii */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 z-0"
        style={{
          background:
            "linear-gradient(180deg, #060a1a 0%, rgba(6,10,26,0.6) 60%, transparent 100%)",
        }}
      />
      {/* Bottom fade-out — bezszwowe przejście do FAQ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 z-0"
        style={{
          background:
            "linear-gradient(0deg, #060a1a 0%, rgba(6,10,26,0.6) 60%, transparent 100%)",
        }}
      />

      <img
        src={tarcza.url}
        alt=""
        aria-hidden
        loading="lazy"
        className="why-us-shield"
      />
      <div className="container-1480 mx-auto relative px-4">

        <h1
          className="font-bold text-center mb-5"
          style={{
            fontSize: "clamp(40px, 5.5vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            background: "linear-gradient(180deg, #FFE873 0%, #FFD60A 45%, #F59E0B 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            filter:
              "drop-shadow(0 0 40px rgba(255,214,10,0.55)) drop-shadow(0 0 80px rgba(255,184,0,0.35))",
          }}
        >
          Dlaczego my?
        </h1>

        <div className="flex justify-center text-center">
          <div className="basis-full md:basis-1/2 mb-y-50">
            <p
              className="text-white font-medium mb-12"
              style={{ fontSize: "18px", lineHeight: 1.5 }}
            >
              Nie tylko obserwujesz mecze — grasz świadomie.
              <br />
              Oto co dostajesz, kiedy dołączasz do Vegety.
            </p>
          </div>
        </div>

        <div className="why-us-grid flex flex-row flex-wrap justify-center">
          {features.map((f, i) => {
            const palette = ["#3BB7FF", "#FFD60A", "#a855f7", "#00D26A", "#3BB7FF", "#FFD60A"];
            const color = palette[i % palette.length];
            return (
              <div
                key={f.title}
                className="relative base-hover group"
                data-i={i + 1}
                style={{ ["--card-color" as string]: color }}
              >
                <div className="hover-b2">
                  <HoverFrame color={color} />
                </div>
                <BaseFrame />
                <div className="absolute real-time flex items-center justify-between box-elipses">
                  <div>
                    <h2
                      className="card-title text-white font-bold mb-3 transition-colors duration-200"
                      style={{ fontSize: "32px", lineHeight: 1.1 }}
                    >
                      {f.title}
                    </h2>

                    <p
                      className="card-desc text-white font-medium transition-colors duration-200"
                      style={{ fontSize: "20px", lineHeight: 1.45 }}
                    >
                      {f.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .why-us .container-1480 { max-width: 1480px; }
        .why-us-shield {
          position: absolute;
          top: clamp(-40px, -2vw, 20px);
          right: clamp(-20px, 3vw, 60px);
          width: clamp(160px, 18vw, 260px);
          height: auto;
          pointer-events: none;
          z-index: 30;
          filter: drop-shadow(0 18px 40px rgba(255, 184, 0, 0.45));
          animation: shieldFloat 5s ease-in-out infinite;
        }
        @keyframes shieldFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (max-width: 768px) {
          .why-us-shield {
            display: none !important;
          }
        }

        .why-us .base-hover:hover .card-title,
        .why-us .base-hover:hover .card-desc { color: #0A0E27 !important; }




        .why-us .base-hover {
          width: 33%;
          position: relative;
        }
        .why-us .base-hover svg { width: 100%; display: block; }
        .why-us .hover-b2 {
          position: absolute;
          top: -4px;
          left: 0;
          right: 0;
          visibility: hidden;
          z-index: 0;
        }
        .why-us .base-hover:hover .hover-b2 { visibility: visible; }
        .why-us .base-hover:nth-child(2),
        .why-us .base-hover:nth-child(3),
        .why-us .base-hover:nth-child(5),
        .why-us .base-hover:nth-child(6) {
          margin-left: -24px;
        }
        .why-us .real-time {
          left: 0; right: 0; top: 0; bottom: 0;
          padding: 44px 48px;
          z-index: 2;
        }
        @media (max-width: 1024px) {
          .why-us .base-hover { width: 50%; }
          .why-us .base-hover,
          .why-us .base-hover:nth-child(2),
          .why-us .base-hover:nth-child(3),
          .why-us .base-hover:nth-child(5),
          .why-us .base-hover:nth-child(6) { margin: 10px 10px !important; }
          .why-us .real-time { padding: 50px 40px; }
        }
        @media (max-width: 640px) {
          .why-us .base-hover,
          .why-us .base-hover:nth-child(2),
          .why-us .base-hover:nth-child(3),
          .why-us .base-hover:nth-child(5),
          .why-us .base-hover:nth-child(6) {
            width: 100% !important;
            margin: 0 0 16px 0 !important;
          }
          .why-us .real-time { padding: 36px 28px; }
          .why-us .box-elipses h2 { font-size: 26px !important; }
          .why-us .box-elipses p { font-size: 16px !important; }
        }
      `}</style>
    </section>
  );
}
