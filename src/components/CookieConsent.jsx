import React, { useEffect, useState } from 'react'

const LS_KEY = 'cookie-consent-v1'

const defaultConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  date: null,
  version: '1.0'
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [consent, setConsent] = useState(defaultConsent)

  useEffect(() => {
    // pokaż baner tylko gdy brak decyzji
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const saved = JSON.parse(raw)
        setConsent({ ...defaultConsent, ...saved })
        setShowBanner(false)
      } else {
        setShowBanner(true)
      }
    } catch {
      setShowBanner(true)
    }
  }, [])

  useEffect(() => {
    // nasłuch na globalne otwarcie ustawień
    const open = () => setShowSettings(true)
    window.addEventListener('open-cookie-settings', open)
    return () => window.removeEventListener('open-cookie-settings', open)
  }, [])

  const saveConsent = (next) => {
    const payload = { ...next, necessary: true, date: new Date().toISOString() }
    localStorage.setItem(LS_KEY, JSON.stringify(payload))
    setConsent(payload)
    // powiadom aplikację (np. App.jsx włączy GA)
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: payload }))
  }

  const acceptAll = () => {
    const next = { ...consent, analytics: true, marketing: true }
    saveConsent(next)
    setShowBanner(false)
    setShowSettings(false)
  }

  const rejectAll = () => {
    const next = { ...consent, analytics: false, marketing: false }
    saveConsent(next)
    setShowBanner(false)
    setShowSettings(false)
  }

  const saveSettings = () => {
    saveConsent(consent)
    setShowSettings(false)
    setShowBanner(false)
  }

  return (
    <>
      {/* Baner na dole ekranu */}
      {showBanner && !showSettings && (
        <div style={styles.banner} role="dialog" aria-live="polite">
          <div style={styles.bannerInner}>
            <p style={{ margin: 0 }}>
              Używamy plików cookies. Część jest niezbędna do działania strony.
              Opcjonalnie możemy używać analitycznych i marketingowych – tylko za Twoją zgodą.
              Więcej w Polityce cookies.
            </p>
            <div style={styles.actions}>
              <button className="btn btn-sm btn-outline-light" onClick={() => setShowSettings(true)}>Ustawienia</button>
              <button className="btn btn-sm btn-light" onClick={rejectAll}>Odrzuć</button>
              <button className="btn btn-sm btn-success" onClick={acceptAll}>Akceptuj wszystko</button>
            </div>
          </div>
        </div>
      )}

      {/* Prosty modal ustawień (Bootstrap klasy używamy tylko dla stylu) */}
      {showSettings && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <div className="modal-header">
              <h5 className="modal-title">Ustawienia plików cookies</h5>
              <button type="button" className="btn-close" onClick={() => setShowSettings(false)}></button>
            </div>
            <div className="modal-body">
              <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" id="c-necessary" checked readOnly />
                <label className="form-check-label" htmlFor="c-necessary">
                  Niezbędne – wymagane do działania serwisu (włączone)
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="c-analytics"
                  checked={!!consent.analytics}
                  onChange={(e) => setConsent(c => ({ ...c, analytics: e.target.checked }))}
                />
                <label className="form-check-label" htmlFor="c-analytics">
                  Analityczne – np. Google Analytics (pomaga ulepszać stronę)
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="c-marketing"
                  checked={!!consent.marketing}
                  onChange={(e) => setConsent(c => ({ ...c, marketing: e.target.checked }))}
                />
                <label className="form-check-label" htmlFor="c-marketing">
                  Marketingowe – np. piksele reklamowe, osadzone media
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={rejectAll}>Odrzuć</button>
              <button className="btn btn-success" onClick={saveSettings}>Zapisz</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const styles = {
  banner: {
    position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 1050,
    background: '#1A472A', color: '#F0F0E1', padding: '12px'
  },
  bannerInner: { maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between' },
  actions: { display: 'flex', gap: 8 },
  modalBackdrop: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 1060,
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
  },
  modal: { background: '#fff', borderRadius: 8, maxWidth: 560, width: '100%' }
}