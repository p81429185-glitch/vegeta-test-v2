import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { FloatingLogo } from "@/components/FloatingLogo";
import { FloatingSocials } from "@/components/FloatingSocials";
import { Hero } from "@/components/sections/Hero";
import ProfitSection from "@/components/sections/ProfitSection";
import HowToStart from "@/components/sections/HowToStart";
import WhyUs from "@/components/sections/WhyUs";
import PricingSection from "@/components/sections/PricingSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FaqSection from "@/components/sections/FaqSection";
import GlowLine from "@/components/GlowLine";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VEGETA TIPS — Skuteczność #1 w PL" },
      {
        name: "description",
        content:
          "Premium typy bukmacherskie od najskuteczniejszego polskiego tipstera. Dołącz do elity.",
      },
      { property: "og:title", content: "VEGETA TIPS — Skuteczność #1 w PL" },
      {
        property: "og:description",
        content:
          "Premium typy bukmacherskie od najskuteczniejszego polskiego tipstera. Dołącz do elity.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <FloatingLogo />
      <Navbar />
      <FloatingSocials />
      <main>
        {/* Hero owns its own intro choreography */}
        <Hero />
        <GlowLine />

        {/* All other sections share one reveal language */}
        <Reveal amount={0.15}>
          <ProfitSection />
        </Reveal>
        <Reveal amount={0.15}>
          <HowToStart />
        </Reveal>
        <Reveal amount={0.15}>
          <PricingSection />
        </Reveal>
        <Reveal amount={0.15}>
          <ReviewsSection />
        </Reveal>
        <Reveal amount={0.15}>
          <WhyUs />
        </Reveal>
        <Reveal amount={0.15}>
          <FaqSection />
        </Reveal>
      </main>
      <CinematicFooter />
    </>
  );
}
