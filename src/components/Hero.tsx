import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

/* ─── Falling petals ─── */
function Petals() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: `${6 + Math.random() * 8}px`,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  return (
    <div className="hero-petals">
      {petals.map(p => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            top: '-10px',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Hero ─── */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState('/assets/content/yeyo2.mp4');

  const handleVideoEnded = () => {
    if (currentVideo === '/assets/content/yeyo2.mp4') {
      setCurrentVideo('/assets/content/yeyo3.mp4');
    } else {
      setCurrentVideo('/assets/content/yeyo2.mp4');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElementRef.current?.play().catch(() => { });
        } else {
          videoElementRef.current?.pause();
        }
      },
      { threshold: 0 }
    );

    if (videoElementRef.current) {
      observer.observe(videoElementRef.current);
    }

    return () => observer.disconnect();
  }, [currentVideo]);

  // Framer Motion Scroll Integration
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const [isHidden, setIsHidden] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.05 && !isHidden) setIsHidden(true);
    else if (latest <= 0.05 && isHidden) setIsHidden(false);
  });

  const vw = typeof window !== 'undefined' ? window.innerWidth : 390;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 844;
  const isMobile = vw < 768;

  const startW = isMobile ? 180 : Math.min(320, Math.max(280, vw * 0.25));
  const endW = vw * (isMobile ? 1 : 0.95);
  const width = useTransform(scrollYProgress, [0, 1], [`${startW}px`, `${endW}px`]);

  const startH = isMobile ? 240 : 480;
  const endH = vh * (isMobile ? 1 : 0.88);
  const height = useTransform(scrollYProgress, [0, 1], [`${startH}px`, `${endH}px`]);

  const radius = useTransform(scrollYProgress, [0, 1], [isMobile ? 30 : 20, 0]);

  const boxShadow = useTransform(
    scrollYProgress,
    [0, 1],
    [`0 8px 60px rgba(0,0,0,0.7)`, `0 38px 100px rgba(0,0,0,0.9)`]
  );

  const vignetteOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0]);
  const vignetteBg = useTransform(vignetteOpacity, (v) => `radial-gradient(ellipse at center, transparent 30%, rgba(13,10,8,${v}) 100%)`);

  const darkOverlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0]);
  const goldBorderAlpha = useTransform(scrollYProgress, [0, 1], [0.35, 0]);
  const borderStyle = useTransform(goldBorderAlpha, (v) => `1px solid rgba(201,168,76,${v})`);

  return (
    <section className="hero noise" id="top" ref={heroRef}>
      <div className="hero-sticky-container">
        {/* Background */}
        <div
          className="hero-bg"
          style={{ opacity: isHidden ? 0 : 1, transition: 'opacity 0.3s ease' }}
        >
          <div className="hero-bg-image" />
          <div className="hero-bg-gradient" />
          <div className="seigaiha-bg" />
          <div className="hero-red-circle" />
          <div className="hero-gold-accent" />
        </div>

        <div
          className="hero-jp-text"
          style={{ opacity: isHidden ? 0 : 0.5, transition: 'opacity 0.3s ease' }}
        >
          我々は愛をもって料理する
        </div>
        <div style={{ opacity: isHidden ? 0 : 1, transition: 'opacity 0.3s ease' }}>
          <Petals />
        </div>

        {/* ─── Main editorial layout ─── */}
        <div
          className="hero-layout"
          style={{
            opacity: isHidden ? 0 : 1,
            pointerEvents: isHidden ? 'none' : 'auto',
            transition: 'opacity 0.3s ease'
          }}
        >
          {/* LEFT COLUMN — brand identity */}
          <div className="hero-col-left">
            <p className="hero-eyebrow">Lima · Perú · 2024</p>
            <h1 className="hero-title">
              <span className="line-1">YEYO</span>
              <span className="line-2">まき</span>
            </h1>
            <div className="hero-divider-line" />
            <p className="hero-tagline">Fusión nikkei.<br />Alma peruana.</p>
          </div>

          {/* CENTER — video portal (absolutely positioned) */}
          {!isMobile && <div className="hero-col-center" aria-hidden="true" />}

          {/* RIGHT COLUMN — subtitle + CTA */}
          <div className="hero-col-right">
            <p className="hero-subtitle">
              Makis artesanales con alma peruana y espíritu japonés.{' '}
              <em>We love what we do.</em>
            </p>
            <div className="hero-actions">
              <a href="#menu" className="btn-primary">Ver Menú ↓</a>
              <a href="#nosotros" className="btn-outline">Nuestra Historia</a>
            </div>
          </div>
        </div>

        {/* ─── Video portal — absolutely centered, expands on scroll ─── */}
        <motion.div
          style={{
            position: 'absolute',
            top: isMobile ? '55%' : '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            width,
            height,
            borderRadius: radius,
            overflow: 'hidden',
            boxShadow,
            pointerEvents: 'none',
          }}
        >
          <video
            ref={videoElementRef}
            src={currentVideo}
            autoPlay
            muted
            loop={false}
            playsInline
            onEnded={handleVideoEnded}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Vignette overlay fades as video expands */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: vignetteBg,
              pointerEvents: 'none',
            }}
          />
          {/* Dark overlay fades as video expands */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.2)',
              opacity: darkOverlayOpacity,
              pointerEvents: 'none',
            }}
          />
          {/* Gold border ring */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: radius,
              border: borderStyle,
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        {/* ─── Scroll Hint (Centered below video on desktop) ─── */}
        <div
          className="hero-scroll-hint"
          style={{
            opacity: isHidden ? 0 : 1,
            pointerEvents: isHidden ? 'none' : 'auto',
            transition: 'opacity 0.3s ease'
          }}
        >
          <div className="hero-scroll-line" />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
