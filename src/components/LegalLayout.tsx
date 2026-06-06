import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CinematicFooter } from "@/components/ui/motion-footer";
import type { ReactNode } from "react";

export function LegalLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-background text-foreground pt-32 pb-24">
        {/* top glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[400px] bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_70%)]" />

        <div className="relative mx-auto max-w-4xl px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Wróć na stronę główną
          </Link>

          <header className="mb-12 pb-8 border-b border-border/60">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-bold mb-3">
              Dokumenty prawne
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">{title}</h1>
            {subtitle && (
              <p className="mt-4 text-muted-foreground text-base max-w-2xl leading-relaxed">{subtitle}</p>
            )}
          </header>

          <article className="legal-content space-y-6 text-[15px] leading-relaxed text-muted-foreground">
            {children}
          </article>
        </div>
      </main>

      <style>{`
        .legal-content h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: hsl(var(--foreground));
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
          padding-top: 1rem;
          border-top: 1px solid hsl(var(--border) / 0.6);
        }
        .legal-content h2:first-child { border-top: none; padding-top: 0; margin-top: 0; }
        .legal-content h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin-top: 2rem;
          margin-bottom: .75rem;
        }
        .legal-content p { margin-bottom: 1rem; }
        .legal-content ol, .legal-content ul {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: .5rem;
        }
        .legal-content ol { list-style: decimal; }
        .legal-content ul { list-style: disc; }
        .legal-content ol ol, .legal-content ul ul, .legal-content ol ul, .legal-content ul ol {
          margin-top: .5rem;
          margin-bottom: 0;
        }
        .legal-content a { color: hsl(var(--primary)); text-decoration: underline; text-underline-offset: 3px; }
        .legal-content a:hover { color: hsl(var(--primary) / 0.8); }
        .legal-content strong { color: hsl(var(--foreground)); font-weight: 600; }
      `}</style>

      <CinematicFooter />
    </>
  );
}
