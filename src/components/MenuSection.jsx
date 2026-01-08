import React from 'react'
import Section from './Section.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import defaultMenuImage from '../assets/menu.webp'

export default function MenuSection({
  imageSrc = defaultMenuImage,
  menuPdfHref = '/menu.pdf'
}) {
  const { t } = useI18n()

  return (
    <Section
      id="menu"
      title={t('menu.title')}
      backgroundColor="#F9F8F4"
      textColor="#1A472A"
      className="menu-section"
      padding="py-5"
    >
      <div className="row align-items-center">
        
        <div className="col-lg-6 text-center text-lg-start">
          
          <h3 className="mb-3">GRASS MENU</h3>
          
          <p className="lead mb-4 mb-md-5">
            {t('menu.description')}
          </p>

          <a
            href={menuPdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-custom"
          >
            {t('menu.viewFull')}
          </a>
        </div>

        <div className="col-lg-6 mt-4 mt-lg-0">
          <div className="image-frame ms-lg-auto" style={{ maxWidth: '400px' }}>
            <img
              src={imageSrc}
              alt={t('menu.title')}
              className="img-fluid"
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}