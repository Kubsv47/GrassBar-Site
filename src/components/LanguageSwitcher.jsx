import React from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useI18n()
  return (
    <div className={`btn-group btn-group-sm ${className}`} role="group" aria-label="Language switcher">
      <button
        type="button"
        className={`btn ${lang === 'en' ? 'btn-light' : 'btn-outline-light'}`}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={`btn ${lang === 'pl' ? 'btn-light' : 'btn-outline-light'}`}
        onClick={() => setLang('pl')}
      >
        PL
      </button>
    </div>
  )
}