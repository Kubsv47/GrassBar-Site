import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'


const brandLogo = '/images/logo.png'

export default function Footer() {
  const year = new Date().getFullYear()

  const openCookieSettings = () => {
    window.dispatchEvent(new Event('open-cookie-settings'))
  }

  return (
    <footer className="site-footer py-4">
      <div className="container text-center">

        <img
          src={brandLogo}
          alt="Grass Bar logo"
          className="footer-logo mb-3"
          width="220" height="64" 
          decoding="async"
        />

        <nav className="footer-links d-flex flex-wrap justify-content-center align-items-center gap-3">
          <Link to="/privacy" className="footer-link">Privacy policy</Link>
          <span className="footer-divider" aria-hidden="true">•</span>
          <Link to="/cookies" className="footer-link">Cookie policy</Link>
          <span className="footer-divider" aria-hidden="true">•</span>
          <button type="button" className="footer-link footer-link-btn" onClick={openCookieSettings}>
            Cookie settings
          </button>
        </nav>

        <small className="d-block mt-3 opacity-75">
          © {year} Grass British Sports Bar
        </small>
      </div>
    </footer>
  )
}