import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Mail, Phone, Globe, Send } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import './LocationSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function LocationSection() {
  const sectionRef = useRef(null);

  const { location } = SITE_CONFIG;

  return (
    <section ref={sectionRef} className="section location-section" id="location">
      <div className="container">
        <div className="location-layout">
          <div>
            <span className="eyebrow">MOBILE SCHEDULE</span>
            <h2 className="headline-lg">{location.headline}</h2>
            <p style={{ marginBottom: '1.75rem', fontSize: '1.125rem' }}>
              {location.body}
            </p>

            <div className="location-status-badge">
              <span className="status-dot-pulse" />
              <span>{location.statusNotice}</span>
            </div>

            <div className="schedule-card-list">
              {location.schedule.map((item, idx) => (
                <div key={idx} className="schedule-card">
                  <div>
                    <h3 className="schedule-day">{item.day}</h3>
                    <p className="schedule-spot">{item.location}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="schedule-time">{item.time}</span>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--color-orange)', marginTop: '0.2rem', textTransform: 'uppercase', fontWeight: '700' }}>
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-box">
            <h3 className="headline-md" style={{ marginBottom: '1.5rem' }}>
              CONNECT & CATERING
            </h3>
            <p style={{ marginBottom: '2.5rem' }}>
              Want the Big Bite truck at your corporate bash, block festival, or private celebration? Get in touch with our team directly.
            </p>

            <div className="contact-item">
              <div className="contact-icon-wrap">
                <Mail size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-cream-muted)', textTransform: 'uppercase' }}>Email Inquiries</div>
                <a href={`mailto:${location.contact.email}`} style={{ fontWeight: '600' }}>
                  {location.contact.email}
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon-wrap">
                <Phone size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-cream-muted)', textTransform: 'uppercase' }}>Phone Direct</div>
                <a href={`tel:${location.contact.phone}`} style={{ fontWeight: '600' }}>
                  {location.contact.phone}
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon-wrap">
                <Globe size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-cream-muted)', textTransform: 'uppercase' }}>Social Live Updates</div>
                <span style={{ fontWeight: '600' }}>{location.contact.instagram}</span>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <a
                href={`mailto:${location.contact.email}?subject=Booking%20Inquiry%20Big%20Bite`}
                className="btn btn-gold"
                style={{ width: '100%' }}
              >
                REQUEST TRUCK BOOKING
                <Send size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
