import { useEffect, useRef, useState } from 'react';

function useScrollExpand() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('top');
      if (!hero) return;
      
      const rect = hero.getBoundingClientRect();
      const scrollableDistance = hero.offsetHeight - window.innerHeight;
      
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(scrolled / scrollableDistance, 1));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollProgress;
}

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
  const scrollProgress = useScrollExpand();
  const videoRef = useRef<HTMLDivElement>(null);
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
    window.scrollTo(0, 0);
  }, []);

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
  }, []);

  const fadeOut = Math.max(0, 1 - scrollProgress * 2.5);

  const vw = typeof window !== 'undefined' ? window.innerWidth : 390;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 844;
  const isMobile = vw < 768;

  // Video dimensions — start width must match .hero-col-center: clamp(280px, 25vw, 320px)
  const startW = isMobile ? Math.min(200, vw * 0.5) : Math.min(320, Math.max(280, vw * 0.25));
  const endW = vw * (isMobile ? 1 : 0.95);
  const width = startW + scrollProgress * (endW - startW);

  const startH = isMobile ? 280 : 480; // Portrait portal on desktop & mobile
  const endH = vh * (isMobile ? 1 : 0.88);
  const height = startH + scrollProgress * (endH - startH);
  const radius = isMobile ? (30 - scrollProgress * 30) : (20 - scrollProgress * 20);

  return (
    <section className="hero noise" id="top">
      <div className="hero-sticky-container">
        {/* Background */}
      <div className="hero-bg" style={{ opacity: fadeOut }}>
        <div className="hero-bg-image" />
        <div className="hero-bg-gradient" />
        <div className="seigaiha-bg" />
        <div className="hero-red-circle" />
        <div className="hero-gold-accent" />
      </div>

      <div className="hero-jp-text" style={{ opacity: fadeOut * 0.5 }}>我々は愛をもって料理する</div>
      <div style={{ opacity: fadeOut }}><Petals /></div>

      {/* ─── Main editorial layout ─── */}
      <div
        className="hero-layout"
        style={{ opacity: fadeOut, pointerEvents: fadeOut < 0.1 ? 'none' : 'auto' }}
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
      <div
        ref={videoRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: `${radius}px`,
          overflow: 'hidden',
          boxShadow: `0 ${8 + scrollProgress * 30}px ${60 + scrollProgress * 40}px rgba(0,0,0,${0.7 + scrollProgress * 0.2})`,
          transition: 'all 0.15s ease-out',
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
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
                radial-gradient(ellipse at center, transparent 30%, rgba(13,10,8,${0.55 - scrollProgress * 0.55}) 100%)
              `,
            pointerEvents: 'none',
          }}
        />
        {/* Dark overlay fades as video expands */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.2)',
            opacity: Math.max(0, 0.6 - scrollProgress * 0.6),
            pointerEvents: 'none',
          }}
        />
        {/* Gold border ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: `${radius}px`,
            border: `1px solid rgba(201,168,76,${0.35 - scrollProgress * 0.35})`,
            pointerEvents: 'none',
          }}
        />
      </div>

        {/* ─── Scroll Hint (Centered below video on desktop) ─── */}
        <div className="hero-scroll-hint" style={{ opacity: fadeOut, pointerEvents: fadeOut < 0.1 ? 'none' : 'auto' }}>
          <div className="hero-scroll-line" />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
