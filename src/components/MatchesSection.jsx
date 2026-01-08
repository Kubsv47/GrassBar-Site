import React from 'react'
import Section from './Section.jsx'
import MatchCard from './MatchCard.jsx'
import { useMatches } from '../context/MatchesContext.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import './MatchesSection.css'

const toDateAny = (v) => {
  if (!v) return null
  if (typeof v?.toDate === 'function') return v.toDate()
  if (typeof v === 'object' && 'seconds' in v) return new Date(v.seconds * 1000)
  return new Date(v)
}

export default function MatchesSection() {
  const { matches } = useMatches()
  const { t } = useI18n()

  const now = Date.now()
  const GRACE_MS = 12 * 60 * 60 * 1000
  const MAX_AHEAD_MS = 60 * 24 * 60 * 60 * 1000

  const upcoming = matches
    .map(m => ({ ...m, _date: toDateAny(m.date || m.dateISO) }))
    .filter(m => {
      if (m.visible === false) return false
      if (!m._date || isNaN(m._date.getTime())) return false
      const t = m._date.getTime()
      return t >= (now - GRACE_MS) && t <= (now + MAX_AHEAD_MS)
    })
    .sort((a,b) => a._date - b._date)
    .slice(0, 12)

  return (
    <Section id="matches" title={t('matches.title')} backgroundColor="#ffffff" textColor="#1A472A" padding="py-5">
      <div className="row gy-4">
        {upcoming.length === 0 && <p className="text-center">{t('matches.empty')}</p>}
        {upcoming.map(m => (
          <div key={m.id} className="col-lg-4 col-md-6">
            <MatchCard match={m} />
          </div>
        ))}
      </div>
    </Section>
  )
}