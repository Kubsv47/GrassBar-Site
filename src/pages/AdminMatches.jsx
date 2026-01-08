import React, { useMemo, useState } from 'react'
import Section from '../components/Section.jsx'
import { useMatches } from '../context/MatchesContext.jsx'
import AuthBar from '../components/AuthBar.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { normalizeLogoUrl } from '../utils/normalizeLogoUrl'

const OWNER_EMAILS =
  (import.meta.env.VITE_OWNER_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)

const empty = {
  date: '', time: '',
  league: '', team1: '', team1Logo: '',
  team2: '', team2Logo: '',
  visible: true
}

const SafeImg = ({ src, ...props }) => {
  if (!src) return null
  return <img src={src} onError={(e)=>{e.currentTarget.style.display='none'}} {...props} />
}

export default function AdminMatches() {
  const { matches, addMatch, updateMatch, deleteMatch } = useMatches()
  const [user, setUser] = useState(null)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')

  React.useEffect(() => onAuthStateChanged(auth, setUser), [])
  const email = (user?.email || '').toLowerCase()
  const isAllowed = !!email && (OWNER_EMAILS.length === 0 || OWNER_EMAILS.includes(email))

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const validate = () => {
    if (!form.team1?.trim() || !form.team2?.trim()) return 'Uzupełnij nazwy drużyn'
    if (!form.date || !form.time) return 'Ustaw datę i godzinę'
    return ''
  }

  const toDate = (date, time) => {
    const [y,m,d] = date.split('-').map(Number)
    const [hh,mm] = time.split(':').map(Number)
    return new Date(y, m-1, d, hh, mm, 0)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const msg = validate()
    if (msg) return setError(msg)

    const payload = {
        dateJS: toDate(form.date, form.time),
        league: form.league?.trim(),
        team1: form.team1.trim(),
        team1Logo: normalizeLogoUrl(form.team1Logo?.trim()),
        team2: form.team2.trim(),
        team2Logo: normalizeLogoUrl(form.team2Logo?.trim()),
        visible: !!form.visible
}

    try {
      if (editId) await updateMatch(editId, payload)
      else await addMatch(payload)
      setForm(empty); setEditId(null); setError('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Write error:', err)
      setError('Błąd zapisu: ' + (err?.message || 'unknown'))
    }
  }

  const onEdit = (m) => {
    const d = (typeof m.date?.toDate === 'function') ? m.date.toDate()
            : (m.dateISO ? new Date(m.dateISO) : new Date())
    const pad = n => String(n).padStart(2,'0')
    const date = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
    const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`
    setForm({
      date, time,
      league: m.league || '',
      team1: m.team1 || '',
      team1Logo: m.team1Logo || '',
      team2: m.team2 || '',
      team2Logo: m.team2Logo || '',
      visible: m.visible ?? true
    })
    setEditId(m.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sorted = useMemo(
    () => [...matches].sort((a,b) => {
      const da = (typeof a.date?.toDate === 'function') ? a.date.toDate().getTime()
               : (a.dateISO ? new Date(a.dateISO).getTime() : 0)
      const db = (typeof b.date?.toDate === 'function') ? b.date.toDate().getTime()
               : (b.dateISO ? new Date(b.dateISO).getTime() : 0)
      return db - da
    }),
    [matches]
  )

  return (
    <>
      <Section title="Panel admina - mecze" backgroundColor="#f9f8f4" textColor="#1A472A" padding="py-4">
        <div className="d-flex justify-content-end mb-3">
          <AuthBar allowedEmails={OWNER_EMAILS} />
        </div>

        {!user ? (
          <p className="text-center">Zaloguj się, aby zarządzać meczami.</p>
        ) : !isAllowed ? (
          <p className="text-center text-danger">Brak uprawnień do edycji.</p>
        ) : (
          <form className="row gy-3" onSubmit={onSubmit}>
            {error && <div className="col-12 text-danger">{error}</div>}

            <div className="col-6 col-md-3">
              <label className="form-label">Data</label>
              <input type="date" name="date" value={form.date} onChange={onChange} className="form-control" required />
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label">Godzina</label>
              <input type="time" name="time" value={form.time} onChange={onChange} className="form-control" required />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Liga / Turniej</label>
              <input type="text" name="league" value={form.league} onChange={onChange} className="form-control" placeholder="Premier League" />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Gospodarz</label>
              <input type="text" name="team1" value={form.team1} onChange={onChange} className="form-control" placeholder="Arsenal" required />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Logo gospodarza (URL)</label>
              <input type="url" name="team1Logo" value={form.team1Logo} onChange={onChange} className="form-control" placeholder="https://..." />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Goście</label>
              <input type="text" name="team2" value={form.team2} onChange={onChange} className="form-control" placeholder="Chelsea" required />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Logo gości (URL)</label>
              <input type="url" name="team2Logo" value={form.team2Logo} onChange={onChange} className="form-control" placeholder="https://..." />
            </div>

            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="visible" name="visible" checked={form.visible} onChange={onChange} />
                <label className="form-check-label" htmlFor="visible">Pokazuj w sekcji "Upcoming Matches"</label>
              </div>
            </div>

            <div className="col-12 d-flex gap-2">
              <button type="submit" className="btn btn-success">{editId ? 'Zapisz zmiany' : 'Dodaj mecz'}</button>
              {editId && <button type="button" className="btn btn-outline-secondary" onClick={()=>{setForm(empty);setEditId(null)}}>Anuluj</button>}
            </div>
          </form>
        )}
      </Section>

      <Section title="Twoje mecze" backgroundColor="#ffffff" textColor="#1A472A" padding="py-4">
        {!user ? (
          <p className="text-center">Zaloguj się, aby zobaczyć listę i zarządzać.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Data</th><th>Godz.</th><th>Liga</th><th>Gospodarz</th><th>Goście</th><th>Widoczny</th><th></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map(m => {
                  const d = (typeof m.date?.toDate === 'function') ? m.date.toDate()
                          : (m.dateISO ? new Date(m.dateISO) : new Date())
                  const pad = n => String(n).padStart(2,'0')
                  const date = `${pad(d.getDate())}.${pad(d.getMonth()+1)}.${d.getFullYear()}`
                  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`
                  return (
                    <tr key={m.id}>
                      <td>{date}</td>
                      <td>{time}</td>
                      <td>{m.league}</td>
                      <td className="text-nowrap">
                        <SafeImg src={m.team1Logo} style={{width:24, height:24, objectFit:'contain'}} className="me-2" />
                        {m.team1}
                      </td>
                      <td className="text-nowrap">
                        <SafeImg src={m.team2Logo} style={{width:24, height:24, objectFit:'contain'}} className="me-2" />
                        {m.team2}
                      </td>
                      <td>{m.visible ? 'Tak' : 'Nie'}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>onEdit(m)}>Edytuj</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteMatch(m.id)}>Usuń</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </>
  )
}