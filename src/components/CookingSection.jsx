import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import './CookingSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function CookingSection() {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(visualRef.current, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        scale: 0.94,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out'
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const { cooking } = SITE_CONFIG;

  return (
    <section ref={sectionRef} className="cooking-section" id="kitchen">
      <div className="container">
        <div className="cooking-grid">
          <div ref={visualRef} className="cooking-visual-card">
            <img
              src="/images/cooking-grill.jpg"
              alt="Live on the Big Bite grill"
              className="cooking-img"
              loading="lazy"
            />
            <div className="cooking-visual-badge">
              <Flame size={16} />
              <span>LIVE ON THE CHARCOAL GRILL</span>
            </div>
          </div>

          <div ref={textRef}>
            <span className="eyebrow">THE CRAFT</span>
            <h2 className="headline-lg" style={{ whiteSpace: 'pre-line' }}>
              {cooking.headline}
            </h2>
            <p style={{ fontSize: '1.125rem', marginTop: '1.25rem', lineHeight: '1.7' }}>
              {cooking.body}
            </p>

            <div className="cooking-stats-list">
              {cooking.stats.map((stat, i) => (
                <div key={i} className="cooking-stat-box">
                  <div className="cooking-stat-val">{stat.value}</div>
                  <div className="cooking-stat-label">{stat.label}</div>
                  <div className="cooking-stat-unit">{stat.unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
