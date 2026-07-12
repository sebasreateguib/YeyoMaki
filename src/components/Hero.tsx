import { useEffect, useRef, useState } from 'react';

/* ─── Scroll logic shared between portal + text ─── */
function useScrollExpand() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fullyExpanded, setFullyExpanded] = useState(false);

  useEffect(() => {
    const handleWheel = (e: Event) => {
      const we = e as WheelEvent;
      if (fullyExpanded && we.deltaY < 0 && window.scrollY <= 5) {
        setFullyExpanded(false);
        we.preventDefault();
        return;
      }
      if (!fullyExpanded) {
        we.preventDefault();
        setScrollProgress(prev => {
          const next = Math.min(Math.max(prev + we.deltaY * 0.001, 0), 1);
          if (next >= 1) setFullyExpanded(true);
          return next;
        });
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: Event) => {
      touchStartY = (e as TouchEvent).touches[0].clientY;
    };
    const handleTouchMove = (e: Event) => {
      const te = e as TouchEvent;
      const delta = touchStartY - te.touches[0].clientY;
      if (fullyExpanded && delta < -20 && window.scrollY <= 5) {
        setFullyExpanded(false);
        te.preventDefault();
        return;
      }
      if (!fullyExpanded) {
        te.preventDefault();
        setScrollProgress(prev => {
          const next = Math.min(Math.max(prev + delta * 0.006, 0), 1);
          if (next >= 1) setFullyExpanded(true);
          return next;
        });
        touchStartY = te.touches[0].clientY;
      }
    };
    const handleScroll = () => {
      if (!fullyExpanded) window.scrollTo(0, 0);
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.hash !== '#top') {
        e.preventDefault();
        setFullyExpanded(true);
        setTimeout(() => {
          document.querySelector(anchor.hash)?.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', anchor.hash);
        }, 50);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [fullyExpanded]);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeOut = Math.max(0, 1 - scrollProgress * 2.5);

  const vw = typeof window !== 'undefined' ? window.innerWidth : 390;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 844;
  const isMobile = vw < 768;

  // Video dimensions — start width must match .hero-col-center: clamp(260px, 28vw, 340px)
  const startW = isMobile ? Math.min(300, vw * 0.8) : Math.min(340, Math.max(260, vw * 0.28));
  const endW   = vw * (isMobile ? 0.95 : 0.95);
  const width  = startW + scrollProgress * (endW - startW);

  const startH = isMobile ? 220 : 300;
  const endH   = vh * 0.88;
  const height = startH + scrollProgress * (endH - startH);
  const radius = 20 - scrollProgress * 20;

  return (
    <section className="hero noise" id="top">
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
        <div className="hero-col-center" aria-hidden="true" />

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

      {/* ─── Scroll Hint (Centered below video) ─── */}
      <div className="hero-scroll-hint" style={{ opacity: fadeOut, pointerEvents: fadeOut < 0.1 ? 'none' : 'auto' }}>
        <div className="hero-scroll-line" />
        <span>Scroll</span>
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
          transition: 'none',
          pointerEvents: 'none',
        }}
      >
        <video
          src="/assets/content/SushiChefVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
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
    </section>
  );
}
