import { useEffect, useRef, useState } from "react";

const GlowLine = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full h-32 overflow-hidden pointer-events-none"
      style={{ background: "linear-gradient(180deg, #000 0%, #060a1a 100%)" }}
    >
      {/* Spotlight cone */}
      <div
        className={`absolute left-1/2 top-0 -translate-x-1/2 w-[80%] max-w-[1100px] h-32 opacity-0 ${
          visible ? "animate-spotlight-flicker" : ""
        }`}
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, hsl(45 95% 55% / 0.22), transparent 70%)",
        }}
      />
      {/* Top glow line — scales out from center on view */}
      <div
        className={`absolute top-0 left-0 right-0 h-px opacity-0 ${
          visible ? "animate-spotlight-flicker" : ""
        }`}
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(45 95% 55% / 0.95) 50%, transparent)",
          boxShadow: "0 0 12px hsl(45 95% 55% / 0.6)",
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "center",
          transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
};

export default GlowLine;
