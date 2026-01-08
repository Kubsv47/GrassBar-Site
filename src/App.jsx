import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AdminMatches from './pages/AdminMatches.jsx'
import { MatchesProvider } from './context/MatchesContext.jsx'
import { I18nProvider } from './i18n/I18nContext.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import CookiesPolicy from './pages/CookiesPolicy.jsx'

export default function App() {

  // przykładowe ładowanie Google Analytics po zgodzie "analytics"
  useEffect(() => {
    const loadGA = (id) => {
      if (document.getElementById('ga-script')) return
      const s = document.createElement('script')
      s.id = 'ga-script'
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
      document.head.appendChild(s)
      window.dataLayer = window.dataLayer || []
      function gtag(){ window.dataLayer.push(arguments) }
      window.gtag = gtag
      gtag('js', new Date())
      gtag('config', id)
    }

    const handle = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('cookie-consent-v1') || '{}')
        if (saved?.analytics) {
          // podmień na swój measurement id, np. G-XXXXXX
          loadGA('G-XXXXXXX')
        }
      } catch {}
    }
    handle()
    window.addEventListener('cookie-consent-updated', handle)
    return () => window.removeEventListener('cookie-consent-updated', handle)
  }, [])

  return (
    <I18nProvider>
      <MatchesProvider>
        <BrowserRouter>
          <CookieConsent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminMatches />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiesPolicy />} />
          </Routes>
        </BrowserRouter>
      </MatchesProvider>
    </I18nProvider>
  )
}