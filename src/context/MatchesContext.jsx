import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'


const MatchesContext = createContext(null)

export const MATCHES_GRACE_HOURS = 12     // pokazuj wydarzenia, które zaczęły się do X godzin temu
export const MATCHES_RANGE_DAYS = 60      // ile dni do przodu
export const MATCHES_LIMIT = 12           // maksymalna liczba kart

export function MatchesProvider({ children }) {
  const [matches, setMatches] = useState([])
  const colRef = collection(db, 'matches')

  useEffect(() => {
    const now = Date.now()
    const startTs = Timestamp.fromDate(new Date(now - MATCHES_GRACE_HOURS * 60 * 60 * 1000))
    const endTs = Timestamp.fromDate(new Date(now + MATCHES_RANGE_DAYS * 24 * 60 * 60 * 1000))

    // Serwerowy filtr: tylko widoczne, w zakresie, posortowane, limit
    const q = query(
      colRef,
      where('visible', '==', true),
      where('date', '>=', startTs),
      where('date', '<=', endTs),
      orderBy('date', 'asc'),
      limit(MATCHES_LIMIT)
    )

    
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        setMatches(list)
      },
      (err) => {
        console.error('[Firestore] Matches query failed. Upewnij się, że pole "date" to Timestamp i utwórz wymagany index w konsoli:', err)
        
        setMatches([])
      }
    )

    return () => unsub()
  }, [])

  // CRUD 
  const addMatch = async ({ dateJS, ...rest }) => {
    await addDoc(colRef, {
      ...rest,
      date: Timestamp.fromDate(dateJS),
      visible: rest.visible ?? true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }

  const updateMatch = async (id, patch) => {
    const ref = doc(db, 'matches', id)
    const payload = { ...patch, updatedAt: serverTimestamp() }
    if (patch.dateJS) {
      payload.date = Timestamp.fromDate(patch.dateJS)
      delete payload.dateJS
    }
    await updateDoc(ref, payload)
  }

  const deleteMatch = async (id) => {
    await deleteDoc(doc(db, 'matches', id))
  }

  return (
    <MatchesContext.Provider value={{ matches, addMatch, updateMatch, deleteMatch }}>
      {children}
    </MatchesContext.Provider>
  )
}

export const useMatches = () => useContext(MatchesContext)