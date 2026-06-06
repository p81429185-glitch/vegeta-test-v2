import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/regulamin")({
  head: () => ({
    meta: [
      { title: "Regulamin — Vegeta Tips" },
      {
        name: "description",
        content:
          "Regulamin Sklepu Internetowego vegeta-typuje.pl. Zasady sprzedaży analiz sportowych, prawa konsumenta, reklamacje i odstąpienie od umowy.",
      },
    ],
  }),
  component: Regulamin,
});

function Regulamin() {
  return (
    <LegalLayout
      title="Regulamin"
      subtitle="Ogólne warunki, podstawowe zasady oraz sposób prowadzenia sprzedaży przez sklep internetowy vegeta-typuje.pl."
    >
      <p className="text-sm">
        <strong>Obowiązuje od dnia 19.07.2025 r.</strong>
      </p>

      <h2>I. Wstęp</h2>
      <ol>
        <li>
          Niniejszy regulamin, zwany dalej „Regulaminem", określa ogólne warunki, podstawowe zasady
          oraz sposób prowadzenia sprzedaży przez sklep internetowy dostępny pod adresem
          vegeta-typuje.pl, zwany dalej „Sklepem Internetowym", na rzecz Klientów, tj. osób
          fizycznych, które ukończyły 18 lat i posiadają pełną zdolność do czynności prawnych, a
          także osób prawnych oraz jednostek organizacyjnych nieposiadających osobowości prawnej,
          którym ustawa przyznaje zdolność prawną.
        </li>
        <li>
          Sklep Internetowy prowadzony jest przez: <strong>JANIK Daniel Janicki</strong>, adres
          wykonywania działalności: Jarosławiec 400/6, 22-424 Sitno, NIP <strong>9222825711</strong>
          , REGON <strong>522597577</strong>, e-mail:{" "}
          <a href="mailto:danieljanicki91@gmail.com">danieljanicki91@gmail.com</a> (dalej:
          „Sprzedawca").
        </li>
        <li>
          Sklep Internetowy oraz wszelkie zawarte w nim treści nie stanowią zachęty do udziału w
          grach hazardowych. Sklep ma charakter informacyjny i usługowy, a Sprzedawca nie ma wpływu
          na decyzje podejmowane przez Użytkowników.
        </li>
        <li>
          Sprzedawca nie prowadzi działalności bukmacherskiej ani żadnej innej działalności w
          zakresie urządzania gier hazardowych w rozumieniu Ustawy o grach hazardowych z dnia 19
          listopada 2009 r.
        </li>
        <li>
          Akceptacja Regulaminu jest dobrowolna, ale konieczna w celu utworzenia Konta i/lub
          złożenia przez Klienta Zamówienia.
        </li>
        <li>
          Ilekroć w dalszej części Regulaminu użyto niżej wymienionych zwrotów pisanych wielką
          literą, należy je rozumieć w podanym niżej znaczeniu:
          <ul>
            <li>
              <strong>Cena</strong> – określona w złotych polskich wartość netto Towaru/Analiz
              Sportowych.
            </li>
            <li>
              <strong>Towar/Analizy Sportowe</strong> – dostępna w Sklepie Internetowym Treść
              Cyfrowa oferowana przez Sprzedawcę w formacie PDF; zawiera analizy potencjalnego
              przebiegu przyszłego meczu, rozgrywki lub innego wydarzenia sportowego. Analizy
              Sportowe sprzedawane są w pakietach.
            </li>
            <li>
              <strong>Klient/Użytkownik</strong> – osoba fizyczna mająca pełną zdolność do czynności
              prawnych (po ukończeniu 18. roku życia), osoba prawna lub jednostka organizacyjna.
            </li>
            <li>
              <strong>Konsument</strong> – osoba fizyczna dokonująca z przedsiębiorcą czynności
              prawnej niezwiązanej bezpośrednio z jej działalnością gospodarczą lub zawodową.
            </li>
            <li>
              <strong>Przedsiębiorca</strong> – osoba prowadząca we własnym imieniu działalność
              gospodarczą lub zawodową.
            </li>
            <li>
              <strong>Konto</strong> – indywidualny panel oznaczony Loginem i Hasłem.
            </li>
            <li>
              <strong>Koszyk</strong> – usługa umożliwiająca złożenie Zamówienia na jeden lub kilka
              Towarów.
            </li>
            <li>
              <strong>Login</strong> – adres poczty elektronicznej Klienta.
            </li>
            <li>
              <strong>Hasło</strong> – unikalny ciąg znaków wykorzystywany w celu zabezpieczenia
              dostępu do Konta.
            </li>
            <li>
              <strong>Newsletter</strong> – usługa świadczona drogą elektroniczną, umożliwiająca
              otrzymywanie cyklicznych informacji.
            </li>
            <li>
              <strong>Poprzednia najniższa cena</strong> – najniższa Cena danego Towaru obowiązująca
              w okresie 30 dni przed wprowadzeniem obniżki.
            </li>
            <li>
              <strong>Sprzedawca</strong> – Daniel Janicki, właściciel Sklepu Internetowego.
            </li>
            <li>
              <strong>Umowa Sprzedaży</strong> – umowa dotycząca sprzedaży Treści Cyfrowych przez
              Sprzedawcę na rzecz Klienta.
            </li>
            <li>
              <strong>Usługi cyfrowe</strong> – usługi umożliwiające Klientowi wytwarzanie,
              przetwarzanie, przechowywanie lub dostęp do danych w formie cyfrowej.
            </li>
            <li>
              <strong>Zamówienie</strong> – oświadczenie woli Klienta stanowiące ofertę zawarcia
              Umowy Sprzedaży.
            </li>
            <li>
              <strong>Dzień roboczy</strong> – dzień od poniedziałku do piątku, z wyłączeniem dni
              ustawowo wolnych od pracy.
            </li>
          </ul>
        </li>
      </ol>

      <h2>II. Postanowienia ogólne</h2>
      <ol>
        <li>
          Wszelkie prawa do Sklepu Internetowego, w tym majątkowe i niemajątkowe prawa autorskie,
          prawa własności intelektualnej do jego nazwy, domeny internetowej, strony internetowej, a
          także prawa do wzorców, formularzy oraz logotypów, należą do Sprzedawcy.
        </li>
        <li>
          Niedozwolone jest kopiowanie, powielanie ani rozpowszechnianie Analiz Sportowych w
          jakiejkolwiek formie.
        </li>
        <li>Sklep Internetowy jest udostępniany przez Sprzedawcę za pośrednictwem sieci Internet.</li>
        <li>
          Sprzedawca zastrzega sobie prawo do umieszczania w Sklepie Internetowym treści
          reklamowych dotyczących zarówno oferowanych Towarów, jak i towarów oraz usług osób
          trzecich.
        </li>
        <li>
          Zabronione jest wykorzystywanie Sklepu Internetowego przez Klientów do przesyłania
          niezamówionych informacji handlowych.
        </li>
        <li>
          Korzystanie ze Sklepu Internetowego może odbywać się wyłącznie na zasadach i w zakresie
          określonym w Regulaminie.
        </li>
        <li>
          W celu złożenia Zamówienia konieczne jest posiadanie przez Klienta aktywnego konta poczty
          elektronicznej.
        </li>
        <li>
          Klient jest uprawniony do korzystania z zasobów Sklepu Internetowego wyłącznie na własny
          użytek.
        </li>
        <li>
          Informacje podane w Sklepie Internetowym nie stanowią oferty w rozumieniu przepisów
          Kodeksu cywilnego, lecz zaproszenie do zawarcia umowy.
        </li>
        <li>
          W przypadku obniżki Ceny, Sprzedawca podaje – obok informacji o obniżonej Cenie –
          informację o poprzedniej najniższej cenie z okresu 30 dni przed wprowadzeniem obniżki.
        </li>
        <li>
          Sprzedawca nie stosuje indywidualnego dostosowywania cen – ceny są takie same dla
          wszystkich Użytkowników.
        </li>
        <li>
          Opinie widoczne przy Towarach nie są weryfikowane przez Sprzedawcę pod kątem ich
          pochodzenia od osób, które faktycznie używały danego Towaru lub go nabyły.
        </li>
        <li>
          Przedmiotem Umowy Sprzedaży jest usługa dostępu do Produktu. Klient uzyskuje dostęp do
          Produktu na z góry określony okres, za pośrednictwem linku przekierowującego do kanału w
          aplikacji Telegram.
        </li>
        <li>
          Sprzedawca nie gwarantuje skuteczności ani sprawdzalności przedstawianych analiz i nie
          ponosi odpowiedzialności za sposób, w jaki Klient wykorzysta zakupione Produkty.
          Wykorzystanie analiz do działalności hazardowej odbywa się poza Sklepem Internetowym i bez
          udziału Sprzedawcy.
        </li>
      </ol>

      <h2>III. Konto Klienta</h2>
      <ol>
        <li>
          Każdy Klient uprawniony jest do założenia oraz używania Konta. Z chwilą założenia Konta
          Klient zawiera ze Sprzedawcą Umowę o dostarczanie Usług cyfrowych.
        </li>
        <li>
          W celu utworzenia Konta Klient obowiązany jest dokonać rejestracji. Rejestracja jest
          konieczna do składania Zamówień.
        </li>
        <li>
          Jeden Klient może posiadać tylko jedno Konto w Serwisie. Administrator analizuje dane
          Klientów w celu weryfikacji, czy Użytkownik nie tworzy tzw. multikont.
        </li>
        <li>
          Do prawidłowego korzystania z Konta wymagane jest włączenie obsługi plików cookies w
          przeglądarce internetowej.
        </li>
        <li>
          W celu rejestracji Klient powinien wypełnić formularz rejestracyjny zgodnie z
          następującymi zasadami:
          <ul>
            <li>Klient powinien wypełnić wszystkie wymagane pola.</li>
            <li>Informacje powinny dotyczyć wyłącznie Klienta i być zgodne z prawdą.</li>
            <li>Klient powinien potwierdzić fakt zapoznania się z treścią Regulaminu.</li>
            <li>Klient powinien zapoznać się z polityką prywatności.</li>
            <li>W razie wyrażenia zgody na otrzymywanie informacji handlowej – oznaczyć pole.</li>
          </ul>
        </li>
        <li>
          Sprzedawca nie ponosi odpowiedzialności za podanie przez Klienta błędnych lub
          nieprawdziwych danych.
        </li>
        <li>
          Po przesłaniu wypełnionego formularza Klient otrzymuje drogą elektroniczną potwierdzenie
          rejestracji. Z tą chwilą zawarta zostaje Umowa o dostarczanie Usługi cyfrowej.
        </li>
        <li>
          Klient może w każdej chwili i bez podania przyczyny usunąć Konto poprzez wysłanie żądania
          do Sprzedawcy na adres:{" "}
          <a href="mailto:kontakt@vegeta-typuje.pl">kontakt@vegeta-typuje.pl</a>.
        </li>
        <li>
          Klient zobowiązany jest dołożyć wszelkich starań w celu zachowania poufności Hasła. W
          razie podejrzenia, iż Hasło znalazło się w posiadaniu osoby nieuprawnionej, Klient ma
          obowiązek niezwłocznego zawiadomienia Sprzedawcę.
        </li>
        <li>
          Sprzedawca uprawniony jest do zawieszenia Konta Klienta w sytuacji, gdy Klient narusza
          Regulamin lub działa na szkodę Sklepu.
        </li>
        <li>
          W przypadku powtarzającego się naruszania Regulaminu Sprzedawca ma prawo do usunięcia
          Konta. Usunięcie Konta następuje także w przypadku wykazania, że Klient posiada więcej niż
          jedno Konto.
        </li>
      </ol>

      <h2>IV. Składanie Zamówień</h2>
      <ol>
        <li>
          Zawarcie Umowy Sprzedaży następuje po uprzednim złożeniu przez Klienta Zamówienia w
          Sklepie Internetowym. Prezentacja Towaru wraz z ceną nie stanowi oferty w rozumieniu
          Kodeksu cywilnego.
        </li>
        <li>
          Sklep Internetowy umożliwia zakup Analiz Sportowych w ramach pakietów:{" "}
          <strong>Standard, Gold, Diamond</strong>. Każdy pakiet dostępny jest na okres wskazany w
          szczegółach pakietu.
        </li>
        <li>
          Sprzedawca umożliwia złożenie Zamówienia w następujący sposób:
          <ul>
            <li>
              Klient dodaje wybrane Towary do Koszyka poprzez wybór „WYBIERAM PAKIET", po czym
              przechodzi do formularza Zamówienia.
            </li>
            <li>
              Klient potwierdza w formularzu aktualność danych. Klienci-Przedsiębiorcy podają nazwę
              i adres firmy, a w przypadku faktury VAT – również numer NIP.
            </li>
            <li>Wysłanie formularza następuje przez aktywację pola „PRZEJDŹ DO PŁATNOŚCI".</li>
          </ul>
        </li>
        <li>
          Każdorazowo przed wysyłką Zamówienia Klientowi wyświetlany jest formularz zawierający
          informacje określone w art. 12 ustawy o prawach konsumenta, w szczególności łączną cenę.
        </li>
        <li>
          W trakcie składania Zamówienia, do momentu naciśnięcia przycisku „PRZEJDŹ DO PŁATNOŚCI",
          Klient ma możliwość samodzielnego korygowania wprowadzonych danych.
        </li>
        <li>Złożenie Zamówienia stanowi złożenie oferty zawarcia Umowy Sprzedaży.</li>
        <li>
          Sprzedawca ma prawo do weryfikacji dokonanego Zamówienia za pośrednictwem poczty
          elektronicznej oraz jego anulowania w przypadkach uzasadniających wątpliwości.
        </li>
        <li>
          Po złożeniu Zamówienia Sprzedawca niezwłocznie przesyła na e-mail potwierdzenie przyjęcia
          Zamówienia. Z chwilą otrzymania wiadomości zostaje zawarta Umowa Sprzedaży.
        </li>
        <li>
          W przypadku braku możliwości realizacji Zamówienia, Sprzedawca może zaproponować Klientowi
          anulowanie całości, anulowanie części lub podział Zamówienia.
        </li>
        <li>
          W przypadku braku możliwości przyjęcia oferty, Sprzedawca niezwłocznie, nie później niż w
          ciągu 14 dni, zwraca Klientowi uiszczone płatności.
        </li>
        <li>Ostateczną ceną wiążącą strony jest cena umieszczona przy Towarze w momencie składania Zamówienia.</li>
        <li>
          Ceny zamieszczone przy Towarze stanowią ceny netto i określone są w złotych polskich.
          Informacja na temat całkowitej wartości Zamówienia określana jest w ostatnim kroku
          składania Zamówienia.
        </li>
      </ol>

      <h2>V. Dostawa i formy płatności</h2>
      <ol>
        <li>
          Klient może wybrać następujące formy płatności:
          <ul>
            <li>przelew online tradycyjny – przelew bankowy na rachunek Sprzedawcy,</li>
            <li>płatność za pośrednictwem systemu Stripe,</li>
            <li>przelew za pośrednictwem systemu Przelewy24 (P24).</li>
          </ul>
        </li>
        <li>Klient nie ma możliwości zapłaty za część Zamówienia z góry, a za część przy odbiorze.</li>
        <li>
          Termin wysłania Towaru wynosi do 3 Dni Roboczych, chyba że w opisie podano dłuższy termin.
          Sprzedawca nie ponosi odpowiedzialności za niedostarczenie Towaru z przyczyn leżących po
          stronie Klienta (np. błędny adres).
        </li>
        <li>
          Sprzedawca przesyła na e-mail Klienta fakturę VAT oraz formularz. Klient wyraża zgodę na
          dostarczanie faktur w formie elektronicznej.
        </li>
      </ol>

      <h2>VI. Reklamacja</h2>
      <h3>Postanowienia ogólne</h3>
      <ol>
        <li>
          Sprzedawca ustosunkuje się do reklamacji niezwłocznie, nie później niż w terminie 14 dni
          od dnia jej otrzymania. Brak odpowiedzi w tym terminie oznacza uznanie żądania.
        </li>
        <li>
          Reklamacja powinna zawierać: imię i nazwisko, adres e-mail podany w Zamówieniu, datę
          zakupu, numer transakcji, opis sytuacji oraz datę wystąpienia wady, a także żądanie
          Klienta.
        </li>
        <li>
          Wniesienie reklamacji nie wpływa na uprawnienia Konsumenta do dochodzenia roszczeń na
          drodze sądowej.
        </li>
        <li>
          Klient będący Konsumentem może skorzystać z pozasądowych sposobów rozpatrzenia
          reklamacji. Szczegółowe informacje dostępne są pod adresem:{" "}
          <a
            href="https://www.uokik.gov.pl/pozasadowe_rozwiazywanie_sporow_konsumenckich.php"
            target="_blank"
            rel="noreferrer"
          >
            UOKiK – pozasądowe rozwiązywanie sporów
          </a>
          .
        </li>
        <li>
          Konsument może złożyć skargę za pośrednictwem platformy ODR:{" "}
          <a href="http://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
            http://ec.europa.eu/consumers/odr/
          </a>
          .
        </li>
        <li>
          Sprzedawca dokonuje zwrotu płatności przy użyciu takiego samego sposobu zapłaty, jakiego
          użył Konsument, chyba że Konsument wyraźnie zgodził się na inny sposób.
        </li>
      </ol>

      <h3>Brak zgodności Towaru z Umową Sprzedaży</h3>
      <ol>
        <li>
          W razie braku zgodności Towaru z Umową Sprzedaży Klientowi-Konsumentowi przysługują
          uprawnienia określone w przepisach ustawy o prawach konsumenta.
        </li>
        <li>
          Sprzedawca ponosi odpowiedzialność za brak zgodności Towaru z Umową Sprzedaży, istniejący
          w chwili jego dostarczenia i ujawniony w ciągu dwóch lat od tej chwili.
        </li>
        <li>
          W przypadku braku zgodności, Klient-Konsument może żądać naprawy lub wymiany. Koszty
          ponosi Sprzedawca.
        </li>
        <li>
          Jeżeli Towar jest niezgodny z Umową Sprzedaży, Konsument może złożyć oświadczenie o
          obniżeniu ceny albo odstąpieniu od Umowy Sprzedaży, gdy:
          <ul>
            <li>Sprzedawca odmówił doprowadzenia Towaru do zgodności z Umową,</li>
            <li>doprowadzenie Towaru do zgodności okazało się bezskuteczne,</li>
            <li>brak zgodności jest na tyle istotny, że uzasadnia natychmiastowe działanie,</li>
            <li>
              z oświadczenia Sprzedawcy wyraźnie wynika, że nie doprowadzi on Towaru do zgodności w
              rozsądnym czasie.
            </li>
          </ul>
        </li>
        <li>
          Konsument nie może odstąpić od Umowy Sprzedaży, jeżeli niezgodność jest nieistotna.
        </li>
        <li>
          Sprzedawca zwróci Konsumentowi Cenę niezwłocznie, ale nie później niż w terminie 14 dni od
          dnia otrzymania Towaru lub poinformowania o okolicznościach.
        </li>
      </ol>

      <h3>Reklamacja Usług cyfrowych</h3>
      <ol>
        <li>
          Reklamacja Klienta dotycząca problemów z Umową o dostarczanie Usług cyfrowych stanowi
          jednocześnie żądanie doprowadzenia ich do zgodności z Umową.
        </li>
        <li>
          Sprzedawca doprowadza do zgodności reklamowaną treść lub usługę cyfrową w rozsądnym czasie
          od chwili poinformowania, bez nadmiernych niedogodności dla Klienta.
        </li>
        <li>
          Sprzedawca nie ponosi odpowiedzialności, jeżeli środowisko cyfrowe Klienta nie jest
          kompatybilne z wymaganiami technicznymi.
        </li>
      </ol>

      <h2>VII. Odstąpienie od Umowy Sprzedaży</h2>
      <ol>
        <li>
          Klient-Konsument, który zawarł Umowę Sprzedaży na odległość, może w terminie czternastu
          (14) dni od dnia otrzymania Towaru odstąpić od Umowy bez podawania przyczyny, składając
          Sprzedawcy oświadczenie. Oświadczenie może być wysłane:
          <ul>
            <li>pismem na adres: Janicki, Jarosławiec 400/6, 22-424 Sitno,</li>
            <li>
              w formie elektronicznej na adres:{" "}
              <a href="mailto:kontakt@vegeta-typuje.pl">kontakt@vegeta-typuje.pl</a>.
            </li>
          </ul>
        </li>
        <li>
          Sprzedawca niezwłocznie przesyła Konsumentowi potwierdzenie otrzymania oświadczenia o
          odstąpieniu.
        </li>
        <li>
          Sprzedawca ma obowiązek niezwłocznie, nie później niż w terminie 14 dni od dnia otrzymania
          oświadczenia, zwrócić Konsumentowi dokonane płatności.
        </li>
        <li>Koszty odesłania Towaru (jeżeli dotyczy) ponosi Konsument.</li>
        <li>W razie skutecznego odstąpienia od Umowy jest ona uważana za niezawartą.</li>
        <li>
          Konsument zobowiązany jest do zwrotu Towaru (jeżeli dotyczy) niezwłocznie, nie później niż
          w terminie 14 dni od dnia odstąpienia.
        </li>
        <li>
          Sprzedawca może wstrzymać się ze zwrotem płatności do chwili otrzymania Towaru z powrotem
          lub dostarczenia dowodu odesłania.
        </li>
        <li>
          Prawo odstąpienia od Umowy Sprzedaży <strong>nie przysługuje</strong> w odniesieniu do
          Towaru, który nie jest zapisany na nośniku materialnym, jeżeli spełnianie świadczenia
          rozpoczęło się za wyraźną zgodą Konsumenta przed upływem terminu odstąpienia i po
          poinformowaniu o utracie tego prawa.
        </li>
        <li>Klientowi-Przedsiębiorcy nie przysługuje prawo odstąpienia od Umowy Sprzedaży.</li>
        <li>
          Sprzedawcy przysługuje prawo odstąpienia od Umowy zawartej z Klientem-Przedsiębiorcą w
          terminie 14 dni kalendarzowych od dnia jej zawarcia, bez podania przyczyny.
        </li>
      </ol>

      <h2>VIII. Odstąpienie od Umowy o dostarczanie Treści lub Usług cyfrowych</h2>
      <ol>
        <li>
          Prawo odstąpienia nie przysługuje Konsumentowi w odniesieniu do Umów o dostarczanie Usługi
          cyfrowej, jeżeli przedsiębiorca wykonał w pełni Usługę za wyraźną zgodą Konsumenta, który
          został poinformowany przed rozpoczęciem świadczenia o utracie prawa odstąpienia.
        </li>
        <li>
          Za chwilę rozpoczęcia spełniania świadczenia uznaje się moment doręczenia Klientowi
          wiadomości e-mail z instrukcją pobrania lub uzyskania dostępu.
        </li>
        <li>
          Aby zachować termin do odstąpienia, wystarczy wysłać do Sprzedawcy informację przed
          upływem terminu, np. wiadomość e-mail na adres:{" "}
          <a href="mailto:kontakt@vegeta-typuje.pl">kontakt@vegeta-typuje.pl</a>.
        </li>
      </ol>

      <h2>IX. Postępowanie w przypadku Klientów niebędących Konsumentami</h2>
      <ol>
        <li>
          Klientowi niebędącym Konsumentem nie przysługuje prawo odstąpienia od Umowy Sprzedaży lub
          Umowy o dostarczanie Treści lub Usług cyfrowych.
        </li>
        <li>
          Zgodnie z art. 558 § 1 Kodeksu cywilnego odpowiedzialność Sprzedawcy z tytułu rękojmi
          wobec Klienta niebędącego Konsumentem zostaje wyłączona.
        </li>
        <li>
          Wszelkie spory powstałe pomiędzy Sprzedawcą a Klientem niebędącym Konsumentem zostają
          poddane sądowi właściwemu ze względu na siedzibę Sprzedawcy.
        </li>
      </ol>

      <h2>X. Odpowiedzialność</h2>
      <ol>
        <li>
          Sklep uprzedza, że może nastąpić przerwa lub zakłócenie w świadczeniu usług drogą
          elektroniczną, której powodem może być modyfikacja, modernizacja, rozbudowa lub
          konserwacja systemu, siła wyższa lub działania osób trzecich.
        </li>
        <li>Sklep ponosi odpowiedzialność z tytułu niewykonania lub nienależytego wykonania Umowy Sprzedaży.</li>
        <li>
          Sklep nie ponosi odpowiedzialności za niemożliwość lub utrudnienia w korzystaniu ze Sklepu
          wynikające z przyczyn leżących wyłącznie po stronie Klienta.
        </li>
        <li>
          Wyłącznym źródłem zobowiązań Sklepu Internetowego jest niniejszy Regulamin oraz
          bezwzględnie obowiązujące przepisy prawa.
        </li>
      </ol>

      <h2>XI. Newsletter i inne informacje handlowe</h2>
      <ol>
        <li>
          W celu korzystania z usługi Newsletter, Klient powinien wypełnić formularz dostępny w
          Sklepie internetowym poprzez podanie swojego adresu e-mail.
        </li>
        <li>
          Klient zobowiązany jest potwierdzić zamówienie Newslettera poprzez kliknięcie linku
          potwierdzającego.
        </li>
        <li>Usługa Newsletter jest dobrowolna, nieodpłatna i świadczona wyłącznie po dokonaniu subskrypcji.</li>
        <li>
          Newsletter zawiera informacje handlowe i marketingowe Sprzedawcy. Jest wysyłany cyklicznie
          przez czas nieoznaczony.
        </li>
        <li>
          Rezygnacja możliwa jest w każdej chwili poprzez kliknięcie w link dezaktywacyjny lub
          wysyłkę rezygnacji na adres:{" "}
          <a href="mailto:kontakt@vegeta-typuje.pl">kontakt@vegeta-typuje.pl</a>.
        </li>
      </ol>

      <h2>XII. Postanowienia końcowe</h2>
      <ol>
        <li>
          Niniejszy regulamin obowiązuje od dnia <strong>19.07.2025 r.</strong>
        </li>
        <li>
          W sprawach nieuregulowanych mają zastosowanie przepisy Kodeksu cywilnego, ustawy o prawach
          konsumenta oraz odpowiednie przepisy powszechnie obowiązującego prawa.
        </li>
        <li>
          Sprzedawca zastrzega sobie prawo do zmiany Regulaminu zgodnie z powszechnie obowiązującymi
          przepisami prawa.
        </li>
        <li>
          W przypadku zmian Sprzedawca udostępni tekst jednolity Regulaminu poprzez publikację w
          Sklepie. Sprzedawca poinformuje Klienta co najmniej 14 dni przed wejściem w życie nowego
          Regulaminu na adres e-mail przypisany do Konta.
        </li>
        <li>
          Klientów, którzy dokonali zakupu przed wejściem w życie zmian, obowiązuje Regulamin
          wiążący w dacie złożenia Zamówienia.
        </li>
        <li>
          Wszelkie spory będą rozstrzygane przez właściwy sąd powszechny. Spory z Klientami-
          Przedsiębiorcami poddane są sądowi właściwemu ze względu na siedzibę Sprzedawcy.
        </li>
      </ol>
    </LegalLayout>
  );
}
