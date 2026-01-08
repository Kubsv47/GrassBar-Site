import React from 'react'
import Section from '../components/Section.jsx'

export default function CookiesPolicy() {
  const openSettings = () => window.dispatchEvent(new Event('open-cookie-settings'))

  return (
    <Section title="Polityka cookies" backgroundColor="#ffffff" textColor="#1A472A" padding="py-5">
      <div className="container">
        <p>Ostatnia aktualizacja: 21.10.2025</p>

        <h4>1. Czym są cookies?</h4>
        <p>
          Cookies to małe pliki zapisywane w Twoim urządzeniu przez przeglądarkę. Ułatwiają działanie strony i mogą służyć do analityki lub marketingu.
        </p>

        <h4>2. Jakich cookies używamy?</h4>
        <ul>
          <li><b>Niezbędne</b> – zapewniają podstawowe funkcje (sesja, zapis preferencji). Włączone zawsze.</li>
          <li><b>Analityczne</b> – np. Google Analytics; włączane tylko po wyrażeniu zgody.</li>
          <li><b>Marketingowe</b> – np. piksele, osadzone media; włączane po zgodzie.</li>
        </ul>

        <h4>3. Czas trwania</h4>
        <p>Sesyjne (do zamknięcia przeglądarki) i trwałe (z określonym czasem życia).</p>

        <h4>4. Zarządzanie zgodą</h4>
        <p>
          Możesz w każdej chwili zmienić swoje preferencje: <button className="btn btn-outline-success btn-sm" onClick={openSettings}>Ustawienia cookies</button>.
          Możesz też usunąć pliki cookies w ustawieniach swojej przeglądarki.
        </p>

        <h4>5. Zewnętrzni dostawcy</h4>
        <p>Jeżeli włączysz analitykę/marketing, dane mogą być przekazywane do dostawców (np. Google). Szczegóły w Polityce prywatności.</p>

        <h4>6. Kontakt</h4>
        <p>Administrator: [Nazwa firmy], e‑mail: [email].</p>
      </div>
    </Section>
  )
}