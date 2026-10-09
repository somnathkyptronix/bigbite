import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Utensils } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import './FinalCTA.css';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const ctaRef = useRef(null);

  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    const ctx = gsap.context(() => {
      gsap.from(cta, {
        scrollTrigger: {
          trigger: cta,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      });
    }, cta);

    return () => ctx.revert();
  }, []);

  const { finalCTA } = SITE_CONFIG;

  const scrollToMenu = (e) => {
    e.preventDefault();
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="final-cta-section">
      <div className="final-cta-glow" />
      <div className="container">
        <div ref={ctaRef} className="final-cta-content">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            READY FOR REAL FLAVOUR?
          </span>

          <h2 className="headline-xl">{finalCTA.headline}</h2>

          <p style={{ fontSize: '1.25rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.7' }}>
            {finalCTA.body}
          </p>

          <div className="cta-actions">
            <a href="#menu" className="btn btn-primary" onClick={scrollToMenu}>
              {finalCTA.buttons[0].text}
              <Utensils size={16} />
            </a>
            <a href="#menu" className="btn btn-secondary" onClick={scrollToMenu}>
              {finalCTA.buttons[1].text}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
