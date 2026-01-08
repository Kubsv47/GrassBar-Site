# Grass British Sports Bar – landing + admin matches

Responsywny serwis (mobile-first) dla sports pubu z:
- landing page (hero, o nas, menu, mapa kontaktowa),
- sekcją „Upcoming matches” (zasilaną danymi z Firestore),
- panelem admina (logowanie Google, dodawanie/edycja/usuwanie meczów),
- przełącznikiem języka (EN/PL),
- banerem zgody na cookies (z ustawieniami i integracją GA po zgodzie),
- nawigacją sticky z poprawnym a11y (aria-expanded, backdrop na mobile).

## Demo
- Live: (opcjonalnie) https://twoja-domena

---

## Stos technologiczny
- React 18 + Vite
- Bootstrap 5 (wyłącznie CSS + JS Collapse w Nav)
- Firebase (Auth – Sign in with Google, Firestore – realtime)
- React Router (routing)
- i18n (custom context – EN/PL)
- React Icons
- Mobile-first CSS (własne style + Bootstrap utilities)

---

## Funkcje
- Nawigacja sticky (brand + linki + ikony + język), autozamykanie na mobile, backdrop.
- Sekcje:
  - Hero (Section + MainHeroSection),
  - About (obraz w ramce + tekst),
  - Menu (tekst + przycisk PDF + obraz w ramce),
  - Contact (mapa w ramce + godziny otwarcia + kontakt).
- Upcoming Matches:
  - filtrowanie po stronie Firestore (visible == true, date w zakresie),
  - fallback bez indeksu (widoczność po stronie klienta),
  - maks. 12 z najbliższego okresu.
- Admin:
  - logowanie Google,
  - whitelist e-maili (ENV),
  - CRUD meczów (data jako Timestamp),
  - widoczność “Visible”.
- Cookies:
  - baner + modal ustawień,
  - integracja GA po wyrażeniu zgody “analytics”.

---

## Jak uruchomić (dev)
### 1) Wymagania
- Node.js 18+
- Konto Firebase

### 2) Klucze środowiskowe
Utwórz `.env` na podstawie `.env.example` i uzupełnij wartości:
