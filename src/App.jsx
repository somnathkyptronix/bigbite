import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import ImageSequenceHero from './components/ImageSequenceHero';
import BrandIntro from './components/BrandIntro';
import MenuSection from './components/MenuSection';
import CookingSection from './components/CookingSection';
import WhyBigBite from './components/WhyBigBite';
import LocationSection from './components/LocationSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { useReducedMotion } from './hooks/useReducedMotion';
import './styles/global.css';
import './styles/animations.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="app-root">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <ImageSequenceHero />
        <BrandIntro />
        <MenuSection />
        <CookingSection />
        <WhyBigBite />
        <LocationSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
