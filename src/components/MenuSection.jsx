import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Flame, X, Sparkles } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuItems';
import './MenuSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function MenuSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section menu-section" id="menu">
      <div className="container">
        <div className="menu-header">
          <div>
            <span className="eyebrow">THE CROWD FAVOURITES</span>
            <h2 className="headline-lg">
              YOUR CRAVINGS.<br />OUR SPECIALITY.
            </h2>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-secondary"
          >
            VIEW FULL MENU
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="menu-cards-grid">
          {MENU_ITEMS.map((item, index) => (
            <article
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="menu-card"
            >
              <div className="menu-card-image-wrap">
                <span className="menu-card-tag">{item.tag}</span>
                <img
                  src={item.image}
                  alt={item.title}
                  className="menu-card-img"
                  loading="lazy"
                />
              </div>

              <div className="menu-card-body">
                <div>
                  <h3 className="menu-card-title">{item.title}</h3>
                  <p className="menu-card-desc">{item.subtitle}</p>
                </div>

                <div className="menu-card-highlights">
                  {item.highlights.map((h, i) => (
                    <span key={i} className="highlight-chip">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Menu Modal */}
      {modalOpen && (
        <div className="menu-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="menu-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="menu-modal-close"
              onClick={() => setModalOpen(false)}
              aria-label="Close full menu modal"
            >
              <X size={20} />
            </button>

            <span className="eyebrow">CURATED CRAFT MENU</span>
            <h3 className="headline-md" style={{ marginBottom: '1.5rem' }}>
              COMPLETE STREET KITCHEN MENU
            </h3>
            <p style={{ marginBottom: '2rem' }}>
              Every item is freshly prepared on our mobile flattop grill and wok stations using locally sourced ingredients and craft seasoning rubs.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {MENU_ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid rgba(255, 245, 232, 0.1)',
                    paddingBottom: '1.25rem',
                    gap: '1.5rem'
                  }}
                >
                  <div>
                    <h4 style={{ color: 'var(--color-cream)', fontSize: '1.15rem', marginBottom: '0.35rem' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-cream-muted)', margin: 0 }}>
                      {item.subtitle}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.75rem',
                      color: 'var(--color-yellow)',
                      letterSpacing: '0.1em',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-cream-muted)' }}>
                Special dietary requirements or catering inquiries? Ask our team at the truck hatch or contact us below!
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
