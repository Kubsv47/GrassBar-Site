import React from 'react'
import Section from '../components/Section.jsx'

export default function PrivacyPolicy() {
  return (
    <Section title="Polityka prywatności" backgroundColor="#f9f8f4" textColor="#1A472A" padding="py-5">
      <div className="container">
        <p>Ostatnia aktualizacja: 21.10.2025</p>

        <h4>1. Administrator danych</h4>
        <p>
          Administratorem danych jest [Nazwa firmy / właściciel], z siedzibą przy [adres], NIP: [•]. Kontakt: [email], [telefon].
        </p>

        <h4>2. Zakres przetwarzania</h4>
        <p>
          Przetwarzamy dane przekazywane dobrowolnie, np. w formularzu kontaktowym (imię, e‑mail, treść wiadomości) oraz dane techniczne
          (adres IP, nagłówki przeglądarki) w celach bezpieczeństwa i poprawnego wyświetlania strony.
        </p>

        <h4>3. Podstawy prawne</h4>
        <ul>
          <li>art. 6 ust. 1 lit. b RODO – wykonanie umowy / obsługa zapytania,</li>
          <li>art. 6 ust. 1 lit. f RODO – uzasadniony interes administratora (statystyka, bezpieczeństwo),</li>
          <li>art. 6 ust. 1 lit. a RODO – zgoda (np. na cookies analityczne/marketingowe).</li>
        </ul>

        <h4>4. Odbiorcy danych</h4>
        <p>
          Korzystamy z dostawców usług IT, w szczególności Firebase (Google LLC/Google Ireland), które mogą przetwarzać dane w naszym imieniu.
          W przypadku przesyłania danych poza EOG stosowane są standardowe klauzule umowne (SCC).
        </p>

        <h4>5. Okresy przechowywania</h4>
        <p>
          Dane przechowujemy przez czas niezbędny do realizacji celu, a następnie zgodnie z przepisami (lub do odwołania zgody – dla danych na zgodzie).
        </p>

        <h4>6. Prawa osób</h4>
        <ul>
          <li>dostęp do danych, ich sprostowanie, usunięcie, ograniczenie przetwarzania,</li>
          <li>sprzeciw wobec przetwarzania (np. statystyka),</li>
          <li>przenoszenie danych,</li>
          <li>wniesienie skargi do Prezesa UODO (uodo.gov.pl).</li>
        </ul>

        <h4>7. Cookies i podobne technologie</h4>
        <p>
          Informacje o plikach cookies, celach, czasie życia i sposobie zarządzania znajdziesz w Polityce cookies.
        </p>

        <h4>8. Bezpieczeństwo</h4>
        <p>
          Stosujemy środki techniczne i organizacyjne zapewniające ochronę danych. Pamiętaj, aby nie udostępniać poufnych danych przez formularze niezabezpieczone.
        </p>

        <h4>9. Zmiany polityki</h4>
        <p>
          Polityka może być aktualizowana. Aktualna wersja jest zawsze dostępna na tej stronie.
        </p>

        <h4>Kontakt</h4>
        <p>[Nazwa firmy], [adres], e‑mail: [email], tel: [telefon].</p>
      </div>
    </Section>
  )
}