import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/polityka-prywatnosci")({
  head: () => ({
    meta: [
      { title: "Polityka Prywatności — Vegeta Tips" },
      {
        name: "description",
        content:
          "Polityka Prywatności serwisu Vegeta Tips. Informacje o administratorze danych, celach przetwarzania, plikach cookies i Twoich prawach.",
      },
    ],
  }),
  component: PolitykaPrywatnosci,
});

function PolitykaPrywatnosci() {
  return (
    <LegalLayout
      title="Polityka Prywatności"
      subtitle="Informacje o przetwarzaniu Twoich danych osobowych w serwisie vegeta-typuje.pl, zgodne z RODO."
    >
      <h2>Administrator danych osobowych</h2>
      <p>
        Administratorem Pani/Pana danych osobowych jest <strong>JANIK Daniel Janicki</strong>, adres
        wykonywania działalności: Jarosławiec 400/6, 22-424 Sitno, posiadający numer NIP{" "}
        <strong>9222825711</strong>, numer REGON <strong>522597577</strong>, e-mail:{" "}
        <a href="mailto:danieljanicki91@gmail.com">danieljanicki91@gmail.com</a> („Administrator").
      </p>

      <h2>Dane kontaktowe</h2>
      <p>
        Z Administratorem danych osobowych można skontaktować się pisemnie, za pomocą poczty
        tradycyjnej pisząc na adres siedziby lub poprzez wiadomość e-mail:{" "}
        <a href="mailto:kontakt@vegeta-typuje.pl">kontakt@vegeta-typuje.pl</a>.
      </p>

      <h2>Cele i podstawy zbierania danych osobowych</h2>
      <p>Gromadzone przez Administratora dane przetwarzane są w następujących celach:</p>
      <ul>
        <li>
          <strong>Kontaktowych</strong> (w celu nawiązania kontaktu, ukształtowania treści, zmiany
          lub rozwiązania stosunku prawnego, np. formularz kontaktowy, korespondencja e-mail, social
          media, kontakt telefoniczny) – w zależności od drogi nawiązania kontaktu podstawą prawną
          przetwarzania jest art. 6 ust. 1 lit. a) i/lub b) i/lub f) RODO oraz Pani/Pana zgoda na
          otrzymywanie informacji handlowych w rozumieniu przepisów ustawy z dnia 18 lipca 2002 r. o
          świadczeniu usług drogą elektroniczną oraz ustawy z dnia 16 lipca 2004 r. Prawo
          telekomunikacyjne. Podanie danych jest dobrowolne, ale niezbędne do skutecznej realizacji
          wskazanego celu.
        </li>
        <li>
          <strong>Zawarcie i wykonanie umowy</strong> – podstawą prawną przetwarzania jest art. 6
          ust. 1 lit. b) RODO oraz art. 6 ust. 1 lit. a) RODO. Podanie danych jest dobrowolne,
          jednakże jest to warunek skutecznej realizacji wskazanego celu.
        </li>
        <li>
          <strong>Dochodzenia roszczeń</strong> względem Administratora oraz dochodzenia i ochrony
          przed roszczeniami Administratora – podstawą przetwarzania jest art. 6 ust. 1 lit. f)
          RODO, przy czym uzasadniony interes Administratora oraz Pani/Pana wynikają z innych
          przepisów prawa (m.in. ustawy Kodeks cywilny).
        </li>
        <li>
          <strong>Przekazywanie informacji handlowych</strong> dotyczących produktów i usług
          oferowanych przez Administratora za pomocą środków komunikacji elektronicznej, stosownie
          do przepisów ustawy o świadczeniu usług drogą elektroniczną oraz przy użyciu
          telekomunikacyjnych urządzeń końcowych i automatycznych systemów wywołujących w rozumieniu
          ustawy Prawo telekomunikacyjne – podstawą prawną przetwarzania jest art. 6 ust. 1 lit. a)
          i/lub b) i/lub f) RODO oraz Pani/Pana zgoda.
        </li>
        <li>
          <strong>Newsletter</strong> – podstawą prawną przetwarzania jest art. 6 ust. 1 lit. a) i
          b) RODO oraz dodatkowa zgoda na otrzymywanie drogą elektroniczną informacji handlowych w
          celu wykonania umowy o Subskrypcję Newsletter oraz w celu podjęcia działań na żądanie
          osoby, której dane dotyczą, przed zawarciem umowy.
        </li>
      </ul>

      <h2>Kategorie danych osobowych</h2>
      <p>Administrator będzie od Państwa zbierał następujące dane osobowe:</p>
      <ul>
        <li>nazwisko i imię,</li>
        <li>adres poczty elektronicznej,</li>
        <li>
          temat i treść wiadomości zawierająca dane osobowe dobrowolnie udostępnione przez Państwa.
        </li>
      </ul>

      <h2>Zasady bezpieczeństwa przetwarzania danych osobowych</h2>
      <ul>
        <li>
          Administrator stosuje środki techniczne i organizacyjne zapewniające ochronę
          przetwarzanych Państwa danych osobowych.
        </li>
        <li>
          Administrator dokłada wszelkich możliwych starań, aby zabezpieczyć Państwa dane i ochronić
          je przed działaniami osób trzecich. W tym celu stosuje wszelkie niezbędne zabezpieczenia
          fizyczne i organizacyjne, jak również zabezpieczenia serwerów i połączeń Witryny w celu
          ochrony Państwa danych.
        </li>
        <li>
          Podjęte przez Administratora działania mogą okazać się jednak niewystarczające, jeżeli
          sami nie zachowają Państwo zasad bezpieczeństwa.
        </li>
      </ul>

      <h2>Odbiorcy danych osobowych</h2>
      <p>Odbiorcami Pani/Pana danych osobowych będą:</p>
      <ul>
        <li>
          Pracownicy lub współpracownicy Administratora oraz osoby wchodzące w skład organów
          zarządzających u Administratora – Administrator wdrożył procedury umożliwiające dostęp do
          danych osobowych jedynie tym osobom, którym udzielone zostały pisemne upoważnienia.
        </li>
        <li>
          Podmioty, którym Administrator powierza przetwarzanie danych osobowych: właściciele
          oprogramowań informatycznych, dostawcy usług IT, księgowych, prawnych, kurierskich,
          pocztowych, marketingowych, przechowywania danych na serwerach.
        </li>
        <li>
          Podmioty administracji publicznej uprawnione do uzyskania danych osobowych na podstawie
          przepisów prawa.
        </li>
      </ul>

      <h2>Pliki cookies</h2>
      <ul>
        <li>
          Administrator nie zbiera w sposób automatyczny żadnych danych identyfikujących
          użytkowników Portalu, z wyjątkiem informacji zawartych w plikach cookies podczas samego
          korzystania z Portalu.
        </li>
        <li>
          Pliki cookies to małe pliki tekstowe wysyłane przez Portal i przechowywane na Państwa
          komputerze. Wykorzystywane są w celu obsługi Witryny i zapewnieniu możliwości
          udostępniania interesujących informacji.
        </li>
        <li>
          W ramach Portalu stosowane są dwa rodzaje plików cookies: „sesyjne" (session cookies) oraz
          „stałe" (persistent cookies).
        </li>
        <li>Pliki cookies wykorzystywane są w następujących celach:</li>
        <ul>
          <li>
            Tworzenie statystyk pomagających zrozumieć, w jaki sposób użytkownicy korzystają ze
            stron.
          </li>
          <li>
            Określenie profilu użytkownika w celu odpowiedniego dopasowania materiałów
            promocyjno-reklamowych w sieci.
          </li>
          <li>Utrzymanie sesji użytkownika (po zalogowaniu).</li>
        </ul>
        <li>
          W każdym przypadku mogą Państwo zablokować instalowanie plików cookies lub usunąć stałe
          pliki cookies, wykorzystując stosowne opcje przeglądarki internetowej.
        </li>
        <li>
          W celu monitorowania strony Administrator może korzystać z oprogramowania analizującego
          podmiotów trzecich, np. Google Analytics. Google Analytics można wyłączyć za pomocą
          rozszerzenia przeglądarki ze strony{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">
            https://tools.google.com/dlpage/gaoptout
          </a>
          .
        </li>
      </ul>

      <h2>Uprawnienia związane z przetwarzaniem danych osobowych</h2>
      <p>
        W zależności od podstawy prawnej przetwarzania przysługuje Pani/Panu prawo wglądu do treści
        swoich danych, ich poprawiania, prawo sprzeciwu lub usunięcia danych. Ma Pani/Pan prawo
        również do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem
        przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem. Zgodę może Pani/Pan
        odwołać w formie pisemnej wysłanej na adres siedziby Administratora lub poprzez wiadomość
        e-mail: <a href="mailto:kontakt@vegeta-typuje.pl">kontakt@vegeta-typuje.pl</a>.
      </p>

      <h2>Czas przetwarzania danych osobowych</h2>
      <p>
        Pani/Pana dane osobowe będą przetwarzane przez okres zgodny z przepisami prawa, niezbędny do
        realizacji wskazanych celów przetwarzania, w szczególności obsługi Pani/Pana
        zgłoszeń/zapytań, zawarcia i realizacji umowy, wypełnienia obowiązków, przechowywania
        dokumentów księgowych i podatkowych, a także później przez okres przedawnienia roszczeń, w
        zakresie marketingu – najpóźniej do wycofania przez Panią/Pana zgody.
      </p>

      <h2>Przetwarzanie zautomatyzowane i profilowanie</h2>
      <p>
        Pani/Pana dane osobowe nie będą przetwarzane w sposób zautomatyzowany i nie będą poddawane
        profilowaniu.
      </p>

      <h2>Skarga do organu nadzorującego</h2>
      <p>
        Przysługuje Pani/Panu prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych z
        siedzibą przy ul. Stawki 2 w Warszawie.
      </p>

      <h2>Zmiany w Polityce Prywatności</h2>
      <p>
        Polityka może być na bieżąco weryfikowana i w razie potrzeby aktualizowana, o czym Klienci i
        Użytkownicy zostaną poinformowani na stronie internetowej Portalu. Modyfikacje mają na celu
        uwzględnienie zmian w praktykach Administratora dotyczących postępowania z danymi osobowymi
        i wzmocnienie systemu ochrony danych osobowych.
      </p>
    </LegalLayout>
  );
}
