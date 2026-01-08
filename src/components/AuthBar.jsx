import React, { useEffect, useState } from 'react'
import { auth, googleProvider } from '../lib/firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

export default function AuthBar({ allowedEmails = [] }) {
  const [user, setUser] = useState(null)
  useEffect(() => onAuthStateChanged(auth, setUser), [])
  const email = (user?.email || '').toLowerCase()
  const isAllowed = !!email && (allowedEmails.length === 0 || allowedEmails.includes(email))

  return (
    <div className="d-flex align-items-center gap-3">
      {user ? (
        <>
          <small className="text-muted">{user.email}</small>
          <button className="btn btn-sm btn-outline-danger" onClick={() => signOut(auth)}>Wyloguj</button>
        </>
      ) : (
        <button className="btn btn-sm btn-outline-primary" onClick={() => signInWithPopup(auth, googleProvider)}>
          Zaloguj przez Google
        </button>
      )}
      {!isAllowed && user && <div className="text-danger small">Brak uprawnień (email poza whitelistą)</div>}
    </div>
  )
}