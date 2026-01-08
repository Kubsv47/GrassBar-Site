import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const translations = {
  en: {
    nav: { home: 'HOME', about: 'ABOUT', gallery: 'MATCHES', menu: 'MENU', contact: 'CONTACT' },
    hero: {
      titleLine1: 'Grass British',
      titleLine2: 'Sports Bar',
      since: 'Since',
      tagline: 'Surround yourself in green',
      getMenu: 'Get menu',
      readMore: 'Read more'
    },

    about: {
      title: 'About us',
      heading: 'Sports Pub in Gdańsk',
      p1: 'Grass – our passion for international cuisine, Irish Guinness and football led us to open our pub seven years ago on Szeroka Street in Gdańsk. Not only is our menu international — our staff also come from many parts of the world. Our sports pub is located right in the heart of the city — on Szeroka Street.',
      p2: 'The name “Grass” says it all: the green of Ireland, home of Guinness, and the green turf of football stadiums. If you share our passions, drop by — we promise you will feel right at home.'
    },
    matches: { title: 'UPCOMING MATCHES', empty: 'No planned matches.' },
    menu: {
      title: 'OUR MENU',
      description: 'Discover our wide range of classic British pub dishes, Guinness and other beers, and signature cocktails. There is something for everyone.',
      viewFull: 'View full menu'
    },
    contact: {
      title: 'WHERE TO FIND US',
      openingHours: 'Opening hours',
      getInTouch: 'Get in touch',
      callUsPrefix: 'Call us on',
      days: {
        mon: 'Monday',
        tue: 'Tuesday',
        wed: 'Wednesday',
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: 'Sunday'
      }
    },
    admin: { title: 'Admin panel - matches' }
  },
  pl: {
    nav: { home: 'STRONA GŁÓWNA', about: 'O NAS', gallery: 'MECZE', menu: 'MENU', contact: 'KONTAKT' },
    hero: {
      titleLine1: 'Grass British',
      titleLine2: 'Sports Bar',
      tagline: 'Otocz się zielenią',
      since: 'Od',
      getMenu: 'Zobacz menu',
      readMore: 'Czytaj więcej'
    },
    matches: { title: 'NADCHODZĄCE MECZE', empty: 'Brak zaplanowanych meczów.' },
    about: {
      title: 'O nas',
      heading: 'Sports Pub w Gdańsku',
      p1: 'Grass – pasja do międzynarodowej kuchni, irlandzkiego Guinnessa i do piłki nożnej sprawiła, że 7 lat temu w Gdańsku przy ulicy Szerokiej otworzyliśmy nasz pub. Nie tylko kuchnia jest u nas międzynarodowa – nasi pracownicy także pochodzą z najróżniejszych części świata. Nasz sports pub w Gdańsku znajduje się w samym sercu miasta – przy ulicy Szerokiej.',
      p2: 'Nazwa Grass sugeruje wszystko to, co lubimy najbardziej – zieloną Irlandię skąd pochodzi piwo Guinness i zieloną murawę stadionów, na których rozgrywane są mecze piłkarskie. Jeśli podzielasz nasze pasje – wpadnij do nas koniecznie. Zapewniamy – tu na pewno poczujesz się jak u siebie.'
    },
    menu: {
      title: 'NASZE MENU',
      description: 'Odkryj naszą szeroką ofertę klasycznych dań brytyjskich pubów, piwa Guinness i innych piw oraz autorskich koktajli. Każdy znajdzie coś dla siebie.',
      viewFull: 'Zobacz pełne menu'
    },
    contact: {
      title: 'GDZIE NAS ZNALEŹĆ',
      openingHours: 'Godziny otwarcia',
      getInTouch: 'Skontaktuj się',
      callUsPrefix: 'Tel:',
      days: {
        mon: 'Poniedziałek',
        tue: 'Wtorek',
        wed: 'Środa',
        thu: 'Czwartek',
        fri: 'Piątek',
        sat: 'Sobota',
        sun: 'Niedziela'
      }
    },
    admin: { title: 'Panel admina - mecze' }
  }
}
const localeMap = {
  en: { date: 'en-GB', time: 'en-GB' },
  pl: { date: 'pl-PL', time: 'pl-PL' }
}

function get(obj, path) {
  return path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj)
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = (key, fallback) => {
    const v = get(translations[lang], key) ?? get(translations.en, key)
    return v ?? fallback ?? key
  }

  const formatDate = (date) => {
    const d = date instanceof Date ? date : new Date(date)
    return d.toLocaleDateString(localeMap[lang].date, { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase()
  }

  const formatTime = (date) => {
    const d = date instanceof Date ? date : new Date(date)
    return d.toLocaleTimeString(localeMap[lang].time, { hour: '2-digit', minute: '2-digit' })
  }

  const value = useMemo(() => ({ lang, setLang, t, formatDate, formatTime }), [lang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)