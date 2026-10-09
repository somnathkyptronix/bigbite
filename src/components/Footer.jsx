import React from 'react';
import { Globe, Share2, Heart } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import './Footer.css';

export default function Footer() {
  const { brandName, tagline, established, location } = SITE_CONFIG;

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              <span>{brandName}</span>
              <span className="footer-logo-dot" />
            </div>
            <p style={{ maxWidth: '340px', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
              {tagline} Serving gourmet street fare from our mobile flame kitchen.
            </p>
            <div className="footer-social-links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Instagram"
              >
                <Globe size={17} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Twitter"
              >
                <Share2 size={17} />
              </a>
            </div>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                letterSpacing: '0.12em',
                color: 'var(--color-cream)',
                marginBottom: '1.25rem'
              }}
            >
              EXPLORE
            </h4>
            <ul className="footer-nav-list">
              <li>
                <a href="#hero" className="footer-nav-link" onClick={(e) => handleScroll(e, '#hero')}>
                  HOME
                </a>
              </li>
              <li>
                <a href="#story" className="footer-nav-link" onClick={(e) => handleScroll(e, '#story')}>
                  OUR STORY
                </a>
              </li>
              <li>
                <a href="#menu" className="footer-nav-link" onClick={(e) => handleScroll(e, '#menu')}>
                  SIGNATURE MENU
                </a>
              </li>
              <li>
                <a href="#kitchen" className="footer-nav-link" onClick={(e) => handleScroll(e, '#kitchen')}>
                  THE KITCHEN
                </a>
              </li>
              <li>
                <a href="#location" className="footer-nav-link" onClick={(e) => handleScroll(e, '#location')}>
                  FIND OUR TRUCK
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                letterSpacing: '0.12em',
                color: 'var(--color-cream)',
                marginBottom: '1.25rem'
              }}
            >
              GET IN TOUCH
            </h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Direct: {location.contact.phone}
            </p>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
              Email: {location.contact.email}
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-yellow)' }}>
              {location.statusNotice}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {brandName} Street Food Truck. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Crafted with <Heart size={14} color="var(--color-red)" fill="var(--color-red)" /> for street food lovers
          </div>
        </div>
      </div>
    </footer>
  );
}
