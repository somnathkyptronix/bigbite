import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ChevronDown, ArrowRight, Sparkles, FastForward, Play, Pause } from 'lucide-react';
import {
  TOTAL_FRAMES,
  FRAME_ASPECT_RATIO,
  NATIVE_WIDTH,
  NATIVE_HEIGHT,
  STORY_STAGES,
  getFrameUrl
} from '../data/imageSequenceConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './ImageSequenceHero.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ImageSequenceHero({ onIntroComplete }) {
  const containerRef = useRef(null);
  const stickyFrameRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollTriggerInstanceRef = useRef(null);
  const imagesRef = useRef([]); // Stores all 36 HTMLImageElement instances
  const activeFrameIndexRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const [loadedCount, setLoadedCount] = useState(0);
  const [currentDisplayFrame, setCurrentDisplayFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);

  // Draw a specific frame to canvas with responsive cover sizing
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use requested frame if loaded, otherwise fallback to closest loaded frame
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let closest = null;
      let minDiff = Infinity;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const diff = Math.abs(i - frameIdx);
          if (diff < minDiff) {
            minDiff = diff;
            closest = candidate;
          }
        }
      }
      img = closest;
    }

    if (!img) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const displayWidth = Math.round(rect.width);
    const displayHeight = Math.round(rect.height);

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Cover math: preserve 16:9 ratio, center crop
    const imgW = img.naturalWidth || NATIVE_WIDTH;
    const imgH = img.naturalHeight || NATIVE_HEIGHT;
    const scale = Math.max(displayWidth / imgW, displayHeight / imgH);
    const xOffset = (displayWidth - imgW * scale) / 2;
    const yOffset = (displayHeight - imgH * scale) / 2;

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, 0, 0, imgW, imgH, xOffset, yOffset, imgW * scale, imgH * scale);
    ctx.restore();
  }, []);

  // Preload all 36 frames efficiently
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);

    // Load Frame 1 immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      setLoadedCount((c) => Math.max(c, 1));
      drawFrame(0);
    };

    // Preload all remaining frames in parallel
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (i === 0) continue;
      const img = new Image();
      img.src = getFrameUrl(i + 1);
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[i] = img;
        setLoadedCount((c) => c + 1);

        if (activeFrameIndexRef.current === i) {
          drawFrame(i);
        }
      };
      img.onerror = () => {
        console.warn(`Frame ${i + 1} failed to load from ${getFrameUrl(i + 1)}`);
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Setup GSAP Native Pinning & ScrollTrigger
  useEffect(() => {
    const container = containerRef.current;
    const stickyFrame = stickyFrameRef.current;
    if (!container || !stickyFrame) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        activeFrameIndexRef.current = 15;
        drawFrame(15);
        return;
      }

      const frameTracker = { frame: 0 };
      const scrollDistance = window.innerWidth <= 768 ? 2600 : 3800;

      // GSAP Pin + Scrub:
      // Holds the hero pinned on screen through all 36 frames.
      // Once frame 36 is reached, it unpins and smoothly transitions into "OUR STORY".
      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: stickyFrame,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.round(p * (TOTAL_FRAMES - 1)))
          );

          if (targetFrame !== activeFrameIndexRef.current) {
            activeFrameIndexRef.current = targetFrame;
            setCurrentDisplayFrame(targetFrame + 1);
            requestAnimationFrame(() => {
              drawFrame(targetFrame);
            });
          }

          if (p >= 0.98 && onIntroComplete) {
            onIntroComplete();
          }
        }
      });

      scrollTriggerInstanceRef.current = st;
    }, container);

    const handleResize = () => {
      drawFrame(activeFrameIndexRef.current);
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [drawFrame, prefersReducedMotion, onIntroComplete]);

  // Auto-play cinematic sequence like the video, then roll into OUR STORY
  const handleAutoPlay = () => {
    if (isPlayingAuto) return;
    setIsPlayingAuto(true);

    const st = scrollTriggerInstanceRef.current;
    if (!st) return;

    const startPos = window.scrollY;
    const targetPos = st.end + 50; // Just past the hero pin, right into "OUR STORY"

    window.scrollTo({ top: st.start, behavior: 'instant' });

    gsap.to(window, {
      scrollTo: targetPos,
      duration: 5.5, // 5.5 seconds cinematic playback
      ease: 'power1.inOut',
      onComplete: () => {
        setIsPlayingAuto(false);
      }
    });
  };

  // Smooth skip past cinematic intro directly to OUR STORY
  const handleSkipIntro = () => {
    const storySection = document.getElementById('story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    } else {
      const st = scrollTriggerInstanceRef.current;
      if (st) {
        window.scrollTo({ top: st.end + 10, behavior: 'smooth' });
      }
    }
  };

  // Helper to calculate stage card opacity and translateY
  const getStageStyle = (stage) => {
    const { progressStart, progressPeak, progressEnd } = stage;
    const p = scrollProgress;

    if (p < progressStart || p > progressEnd) {
      return { opacity: 0, transform: 'translateY(24px)', pointerEvents: 'none' };
    }

    let opacity = 0;
    let translateY = 20;

    if (p >= progressStart && p < progressPeak) {
      const ratio = (p - progressStart) / (progressPeak - progressStart);
      opacity = ratio;
      translateY = 20 * (1 - ratio);
    } else if (p >= progressPeak && p <= progressEnd - 0.05) {
      opacity = 1;
      translateY = 0;
    } else {
      const exitRatio = (p - (progressEnd - 0.05)) / 0.05;
      opacity = Math.max(0, 1 - exitRatio);
      translateY = -15 * exitRatio;
    }

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.5 ? 'auto' : 'none'
    };
  };

  return (
    <section ref={containerRef} className="hero-scroll-container" id="hero">
      <div ref={stickyFrameRef} className="hero-sticky-frame">
        {/* Canvas renderer */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* Ambient Vignette & Scrim */}
        <div className="hero-scrim" />

        {/* Action Controls in Top Right */}
        <div style={{ position: 'absolute', top: '5.5rem', right: 'clamp(1rem, 3vw, 2.5rem)', zIndex: 15, display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={handleAutoPlay}
            className="skip-intro-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', position: 'static' }}
            title="Auto-play all 36 frames as video"
          >
            <Play size={12} fill="currentColor" />
            <span>PLAY FULL VIDEO</span>
          </button>

          <button
            onClick={handleSkipIntro}
            className="skip-intro-btn"
            style={{ position: 'static' }}
            aria-label="Skip to OUR STORY"
          >
            <FastForward size={12} style={{ display: 'inline', marginRight: 4 }} />
            OUR STORY
          </button>
        </div>

        {/* Synchronized Story Overlays */}
        <div className="hero-overlays-container">
          {STORY_STAGES.map((stage) => {
            const style = getStageStyle(stage);
            return (
              <div
                key={stage.id}
                className={`hero-stage-card align-${stage.alignment}`}
                style={style}
              >
                <div className="stage-badge">
                  <Sparkles size={13} />
                  {stage.badge}
                </div>

                <h1 className="stage-title">{stage.title}</h1>

                <p className="stage-desc">{stage.description}</p>

                {stage.buttons && (
                  <div className="stage-actions">
                    {stage.buttons.map((btn, idx) => (
                      <a
                        key={idx}
                        href={btn.target}
                        className={`btn ${btn.primary ? 'btn-primary' : 'btn-secondary'}`}
                      >
                        {btn.text}
                        {btn.primary ? <ArrowRight size={16} /> : null}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Frame Progress Pill */}
        <div className="hero-progress-pill" aria-live="polite">
          <span>FRAME {String(currentDisplayFrame).padStart(2, '0')} / {TOTAL_FRAMES}</span>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${Math.round((currentDisplayFrame / TOTAL_FRAMES) * 100)}%` }}
            />
          </div>
          <span>{Math.round((currentDisplayFrame / TOTAL_FRAMES) * 100)}%</span>
        </div>

        {/* Scroll Indicator */}
        <div
          className="scroll-indicator-pill animate-float"
          onClick={() => {
            window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
          }}
        >
          <span>SCROLL TO ADVANCE</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </section>
  );
}
