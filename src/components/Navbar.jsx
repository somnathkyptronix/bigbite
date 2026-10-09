import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', href: '#hero' },
    { label: 'OUR MENU', href: '#menu' },
    { label: 'OUR STORY', href: '#story' },
    { label: 'FIND OUR TRUCK', href: '#location' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#hero" className="nav-logo" onClick={(e) => handleLinkClick(e, '#hero')}>
            <span>BIG BITE</span>
            <span className="nav-logo-dot" />
          </a>

          <nav>
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="nav-link"
                    onClick={(e) => handleLinkClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <a
              href="#menu"
              className="btn btn-primary"
              style={{ padding: '0.7rem 1.4rem', fontSize: '0.75rem' }}
              onClick={(e) => handleLinkClick(e, '#menu')}
            >
              GET A BIG BITE
              <ArrowUpRight size={14} />
            </a>

            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-drawer-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="nav-link"
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div>
          <a
            href="#menu"
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={(e) => handleLinkClick(e, '#menu')}
          >
            GET A BIG BITE
          </a>
        </div>
      </div>
    </>
  );
}
