import React from 'react'
import Section from './Section.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'
import aboutImage from '../assets/about.webp'

export default function AboutSection() {
  const { t } = useI18n()

  return (
    <Section
      id="about"
      title={t('about.title')}
      backgroundColor="#ffffff"
      textColor="#1A472A"
      padding="py-5"
    >
      <div className="row align-items-center">
        
        <div className="col-lg-6 text-center mb-4 mb-lg-0">
          <div className="image-frame" style={{ maxWidth: '420px', marginInline: 'auto' }}>
            <img
              src={aboutImage}
              alt={t('about.heading')}
              className="img-fluid"
            />
          </div>
        </div>

        <div className="col-lg-6 text-center text-lg-start">
          <h3 className="mb-3">{t('about.heading')}</h3>
          <p className="lead">{t('about.p1')}</p>
          <p className="lead mb-0">{t('about.p2')}</p>
        </div>
      </div>
    </Section>
  )
}