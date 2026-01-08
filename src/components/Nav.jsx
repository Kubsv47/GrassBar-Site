import React, { useCallback } from 'react'
import './Nav.css'
import { FaInstagram, FaFacebookF, FaClover } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nContext.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import Collapse from 'bootstrap/js/dist/collapse'

const brandLogo = '/images/logo.png'

export default function Nav() {
  const { t } = useI18n()

 
  const toggleMenu = useCallback(() => {
    const el = document.getElementById('navbarNavContent')
    if (!el) return
    const instance = Collapse.getOrCreateInstance(el, { toggle: false })
    instance.toggle()
  }, [])

  
  const closeOnMobile = useCallback(() => {
    if (window.matchMedia('(min-width: 992px)').matches) return
    const el = document.getElementById('navbarNavContent')
    if (!el) return
    const instance = Collapse.getOrCreateInstance(el, { toggle: false })
    instance.hide()
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark st-patricks-nav sticky-top">
      <div className="container p-0">
        
         <a
          href="/"
          className="navbar-brand d-flex align-items-center navbar-brand-custom nav-link-custom gap-2"
          onClick={closeOnMobile}
        >
          <img src={brandLogo} alt="Grass Bar logo" className="navbar-logo" />
          
        </a>
        
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNavContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div className="collapse navbar-collapse" id="navbarNavContent">
          <div className="navbar-right ms-lg-auto w-100 d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-end gap-2 gap-lg-4 pt-2 pt-lg-0">

            
            <ul className="navbar-nav flex-column flex-lg-row align-items-center gap-2 gap-lg-4 mb-2 mb-lg-0">
              <li className="nav-item">
                <a href="#about" className="nav-link-custom" onClick={closeOnMobile}>
                  {t('nav.about')}
                </a>
              </li>
              <li className="nav-item">
                <a href="#matches" className="nav-link-custom" onClick={closeOnMobile}>
                  {t('nav.gallery')}
                </a>
              </li>
              <li className="nav-item">
                <a href="#menu" className="nav-link-custom" onClick={closeOnMobile}>
                  {t('nav.menu')}
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link-custom" onClick={closeOnMobile}>
                  {t('nav.contact')}
                </a>
              </li>
            </ul>

            
            <div className="d-flex align-items-center gap-3">
              <a href="https://www.instagram.com/grass_gdansk/" className="social-icon" onClick={closeOnMobile}>
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/GrassRestaurant/?locale=pl_PL" className="social-icon" onClick={closeOnMobile}>
                <FaFacebookF />
              </a>
            </div>

            
            <div className="lang-switcher-wrap" onClick={closeOnMobile}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}