import React from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import { normalizeLogoUrl } from '../utils/normalizeLogoUrl.js'

const placeholder =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60">
       <rect width="100%" height="100%" fill="#E6E5D3"/>
       <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
             font-family="Arial" font-size="10" fill="#1A472A">NO LOGO</text>
     </svg>`
  );

const toDate = (v) => {
  if (!v) return null
  if (typeof v?.toDate === 'function') return v.toDate()
  if (typeof v === 'object' && 'seconds' in v) return new Date(v.seconds * 1000)
  return new Date(v)
}

export default function MatchCard({ match }) {
  const { formatDate, formatTime } = useI18n()
  const d = toDate(match.date || match.dateISO) || new Date()

  const team1Src = normalizeLogoUrl(match.team1Logo) || placeholder
  const team2Src = normalizeLogoUrl(match.team2Logo) || placeholder

  return (
    <div className="match-card h-100">
      <div className="match-card-header d-flex justify-content-between align-items-center">
        <span className="match-date">{formatDate(d)}</span>
        <span className="match-time">{formatTime(d)}</span>
      </div>
      <div className="match-card-body d-flex align-items-center justify-content-around my-3">
        <div className="team-info text-center">
          <img src={team1Src} onError={(e)=>{ e.currentTarget.src = placeholder }} alt="" className="match-logo" />
          <h5 className="team-name mt-2">{match.team1}</h5>
        </div>
        <span className="vs-text">VS</span>
        <div className="team-info text-center">
          <img src={team2Src} onError={(e)=>{ e.currentTarget.src = placeholder }} alt="" className="match-logo" />
          <h5 className="team-name mt-2">{match.team2}</h5>
        </div>
      </div>
      <div className="match-card-footer text-center">
        <span className="league-name">{(match.league || '').toUpperCase()}</span>
      </div>
    </div>
  )
}