import React from 'react';

import beerImage from '../assets/guinness.webp';
import flagSticker from '../assets/beer.png';
import luckySticker from '../assets/cheers.png';
import hopSticker from '../assets/pipe-smoking.png';
import { useI18n } from '../i18n/I18nContext.jsx'

export default function MainHeroSection({ sinceYear = 2017 }) {
    const { t } = useI18n()
    return (
        <section className="hero row align-items-center py-5">
            <div className="col-lg-6 text-center text-lg-start">
        <h1 className="hero-title">
          {t('hero.titleLine1')} <br /> {t('hero.titleLine2')}
        </h1>
        
          <p className="hero-since">
          {t('hero.since')} {sinceYear}
            </p>

        <p className="hero-tagline">{t('hero.tagline')}</p>

        <div className="d-flex gap-3 justify-content-center justify-content-lg-start hero-buttons-container">
          <a href="/menu.pdf"
						target="_blank"
						rel="noopener noreferrer" className="btn-custom">{t('hero.getMenu')}</a>
          <a href="#about" className="btn-custom">{t('hero.readMore')}</a>
        </div>
      </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
                <div className="image-frame-container">
                    <div className="image-frame">
                        <img 
                            src={beerImage}
                            alt="Guinness Beer"
                            className="beer-image"
                        />
                    </div>

                    <div className="d-flex gap-3 justify-content-center justify-content-lg-start hero-buttons-container"></div>
                    
                    <img src={flagSticker} alt="Beer Sticker" className="sticker hat-sticker" />
                    <img src={luckySticker} alt="Cheers Sticker" className="sticker lucky-sticker" />
                    <img src={hopSticker} alt="Pipe Smoking Sticker" className="sticker hop-sticker" />
                </div>
            </div>
        </section>
    );
}