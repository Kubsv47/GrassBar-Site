import React from 'react'
import Section from './Section.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'

export default function ContactSection({
  mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2325.2885158890927!2d18.64866347701687!3d54.351882499013776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd73757ce32b33%3A0x3f2ae80307421865!2sSzeroka%20121%2F122%2C%2080-834%20Gda%C5%84sk!5e0!3m2!1spl!2spl!4v1761083107361!5m2!1spl!2spl',
  address = 'Szeroka 121/122, 80-835 Gdańsk, Poland',
  phone = '+48 58 301 46 82',
  openingHours = {
    mon: '11:00 - 02:00',
    tue: '11:00 - 02:00',
    wed: '11:00 - 03:00',
    thu: '11:00 - 03:00',
    fri: '11:00 - 03:00',
    sat: '11:00 - 03:00',
    sun: '11:00 - 02:00'
  }
}) {
  const { t } = useI18n()
  const days = ['mon','tue','wed','thu','fri','sat','sun']

  return (
    <Section
      id="contact"
      title={t('contact.title')}
      backgroundColor="#F9F8F4"
      textColor="#1A472A"
      className="contact-section"
      padding="py-5"
    >
      {/* Mapa w ramce */}
      <div className="image-frame mb-5" style={{ maxWidth: '100%', padding: '1rem' }}>
        <iframe
          src={mapSrc}
          style={{ border: 0, width: '100%', height: 450, display: 'block' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title="map"
        />
      </div>

      <div className="row">
        {/* Godziny otwarcia */}
        <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
          <h3 className="mb-4">{t('contact.openingHours')}</h3>
          <div className="opening-hours">
            {days.map((d) => (
              <p key={d}>
                <span>{t(`contact.days.${d}`)}:</span> <span>{openingHours[d]}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Kontakt */}
        <div className="col-lg-6 text-center text-lg-start">
          <h3 className="mb-4">{t('contact.getInTouch')}</h3>
          <p>{address}</p>
          <p>{t('contact.callUsPrefix')} {phone}</p>
        </div>
      </div>
    </Section>
  )
}