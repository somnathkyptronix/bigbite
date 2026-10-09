import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import './BrandIntro.css';

gsap.registerPlugin(ScrollTrigger);

export default function BrandIntro() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      });

      gsap.from(rightColRef.current, {
        scrollTrigger: {
          trigger: rightColRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const { story } = SITE_CONFIG;

  return (
    <section ref={sectionRef} className="brand-intro-section" id="story">
      <div className="container">
        <div className="intro-grid">
          <div ref={headlineRef} className="intro-left">
            <span className="eyebrow">{story.eyebrow}</span>
            <h2 className="headline-xl" style={{ whiteSpace: 'pre-line' }}>
              {story.headline}
            </h2>
            <div className="intro-highlight-pill">
              <Flame size={16} />
              <span>{story.highlight}</span>
            </div>
          </div>

          <div ref={rightColRef} className="intro-right">
            <p className="intro-lead-text">{story.body}</p>
            <p>
              From dawn prep to late-night festival rushes, our mobile kitchen operates on pure passion.
              Every brioche bun is toasted to order, every wok toss carries authentic flame-seared aroma,
              and every guest is treated like family at our hatch.
            </p>

            <div className="intro-stats-row">
              <div className="stat-item">
                <span className="stat-num">100%</span>
                <span className="stat-label">Scratch Made</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">500°</span>
                <span className="stat-label">Sear Heat</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">4.9★</span>
                <span className="stat-label">Street Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
