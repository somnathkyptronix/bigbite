import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '../data/siteConfig';
import './WhyBigBite.css';

gsap.registerPlugin(ScrollTrigger);

export default function WhyBigBite() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section why-section">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            THE BIG BITE PROMISE
          </span>
          <h2 className="headline-lg">WHY CHOOSE BIG BITE</h2>
        </div>

        <div className="why-grid">
          {SITE_CONFIG.features.map((feature, idx) => (
            <div
              key={feature.title}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="why-card"
            >
              <div className="why-badge-num">{feature.badge}</div>
              <h3 className="why-card-title">{feature.title}</h3>
              <p className="why-card-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
