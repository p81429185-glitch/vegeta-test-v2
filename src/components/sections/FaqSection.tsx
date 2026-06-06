import { FaqAccordion } from "@/components/ui/faq-chat-accordion";

const faqData = [
  {
    id: 1,
    icon: "🎯",
    iconPosition: "right" as const,
    question: "Czy te typy naprawdę działają? Jaka jest skuteczność?",
    answer:
      'Tak, i mamy na to dowody. Vegeta to nie przypadkowe strzały, tylko analiza poparta wieloletnim doświadczeniem w branży. Skuteczność utrzymujemy na wysokim poziomie, a wyniki kuponów są transparentne. Nie obiecujemy "100% pewniaków" (bo takie nie istnieją), ale gramy mądrze i długoterminowo na plus.',
  },
  {
    id: 2,
    question: "Od jakiego budżetu mogę zacząć?",
    answer:
      "Od dowolnego. Wielu naszych członków zaczynało od stawek po 50 zł i systematycznie budowało kapitał. W ebooku ze strategią stawkowania pokazujemy, jak zarządzać budżetem, żeby grać bezpiecznie, niezależnie od tego, czy zaczynasz z małą, czy większą kwotą.",
  },
  {
    id: 3,
    icon: "⭐",
    iconPosition: "left" as const,
    question: "Czym różnią się pakiety od siebie? Który wybrać?",
    answer:
      "GOLD 30 dni – idealny na start, najczęściej wybierany.\n\nGOLD 60 dni – najkorzystniejszy cenowo, dla grających długoterminowo.\n\nULTRAVIP – limitowana grupa (30 miejsc/mies.), najwyższa skuteczność i wspólny czat z innymi subskrybentami.\n\nJeśli dopiero zaczynasz, wybierz GOLD. Jeśli chcesz maksimum i bliski kontakt, ULTRAVIP.",
  },
  {
    id: 4,
    question: "Ile typów dostanę w miesiącu?",
    answer:
      "W pakietach GOLD średnio 60–70 typów miesięcznie, w ULTRAVIP średnio 20–30 starannie wyselekcjonowanych typów o najwyższym potencjale. Dostajesz zarówno typy przedmeczowe, jak i typy live.",
  },
  {
    id: 5,
    icon: "⚡",
    iconPosition: "right" as const,
    question: "Jak szybko otrzymam dostęp po opłaceniu?",
    answer:
      "Natychmiast. Po zaksięgowaniu płatności otrzymujesz dostęp do grupy nadawczej i wszystkich materiałów. Bez czekania, bez formalności, od razu jesteś w grze.",
  },
  {
    id: 6,
    question: "Czy to dla początkujących, czy tylko dla zaawansowanych?",
    answer:
      "Dla obu. Jeśli dopiero zaczynasz, przeprowadzimy Cię krok po kroku, a ebook ze strategią wyjaśni podstawy. Jeśli grasz od lat, docenisz jakość analiz i kursy potrafiące wejść nawet powyżej 6.0.",
  },
  {
    id: 7,
    question: "Czy dostanę wsparcie, jeśli będę miał pytania?",
    answer:
      "Oczywiście. Jesteśmy w stałym kontakcie z członkami grupy. Możesz dopytać o każdy mecz czy typ i zawsze otrzymasz rzetelną odpowiedź. U nas nie jesteś anonimowym numerem, jesteś częścią społeczności.",
  },
  {
    id: 8,
    icon: "🔒",
    iconPosition: "left" as const,
    question: "Co jeśli limit miejsc w ULTRAVIP się skończy?",
    answer:
      "Pakiet ULTRAVIP jest celowo limitowany do 30 miejsc miesięcznie, dzięki temu utrzymujemy najwyższą jakość i kameralną atmosferę. Gdy miejsca się skończą, trzeba poczekać na kolejny miesiąc, dlatego warto nie zwlekać z decyzją.",
  },
  {
    id: 9,
    question: "Czy mogę przedłużyć pakiet?",
    answer:
      "Tak, i większość naszych członków właśnie to robi. Mamy jeden z najwyższych współczynników przedłużeń, bo wyniki mówią same za siebie. Po wygaśnięciu pakietu w prosty sposób przedłużysz dostęp i grasz dalej bez przerwy.",
  },
];

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden py-20 px-4"
      style={{
        background:
          "linear-gradient(180deg, #060a1a 0%, #0a1230 50%, #060a1a 100%)",
      }}
    >
      {/* Top fade-in — bezszwowe przejście z "Dlaczego my?" */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 z-0"
        style={{
          background:
            "linear-gradient(180deg, #060a1a 0%, rgba(6,10,26,0.6) 60%, transparent 100%)",
        }}
      />
      {/* Złota cienka linia jako akcent na styku */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px z-[1]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,214,10,0.55) 50%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] z-[1] blur-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,214,10,0.35) 50%, transparent 100%)",
        }}
      />

      <div className="container mx-auto max-w-5xl">
        <h2
          className="text-white font-bold text-center mb-4"
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}
        >
          Najczęstsze pytania
        </h2>
        <p
          className="text-white/70 text-center mb-10"
          style={{ fontSize: "20px", lineHeight: 1.5 }}
        >
          Wszystko, co musisz wiedzieć przed dołączeniem do Vegety.
        </p>
        <FaqAccordion
          data={faqData}
          timestamp="Aktualizowane codziennie, 9:01"
          className="mx-auto"
        />
      </div>
    </section>
  );
}
