import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Config ─────────────────────────────────────────────── */
const TOTAL_FRAMES = 240;
const FRAME_BASE = '/makiacevi/ezgif-frame-';
const FRAME_EXT = '.jpg';

function pad(n: number, width: number): string {
  return String(n).padStart(width, '0');
}

function frameSrc(i: number): string {
  return FRAME_BASE + pad(i + 1, 3) + FRAME_EXT;
}

/* ── Component ──────────────────────────────────────────── */
export function MakiScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d')!;
    const frames: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    let framesLoaded = 0;
    let currentFrame = 0;
    let st: ScrollTrigger | null = null;
    let tween: gsap.core.Tween | null = null;

    /* Keep the canvas at the original image resolution to avoid compression */
    function sizeCanvas() {
      if (!canvas || !frames[0]) return;
      canvas.width = frames[0].naturalWidth;
      canvas.height = frames[0].naturalHeight;
      // CSS object-fit: cover will handle the visual scaling inside the card
    }

    function drawFrame(index: number) {
      const img = frames[index];
      if (!canvas || !img || !img.complete) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw 1:1 at native resolution
      ctx.drawImage(img, 0, 0);
    }

    function updateProgress(loaded: number) {
      const pct = (loaded / TOTAL_FRAMES) * 100;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      if (barLabelRef.current) barLabelRef.current.textContent = `${loaded} / ${TOTAL_FRAMES}`;
    }

    function loadFrame(i: number, onComplete: () => void) {
      const img = new Image();
      img.onload = () => {
        frames[i] = img;
        framesLoaded++;
        updateProgress(framesLoaded);
        if (framesLoaded === TOTAL_FRAMES) onComplete();
      };
      img.onerror = () => {
        framesLoaded++;
        updateProgress(framesLoaded);
        if (framesLoaded === TOTAL_FRAMES) onComplete();
      };
      img.src = frameSrc(i);
    }

    function initScrollTrigger() {
      const proxy = { frame: 0 };

      // Main Canvas Animation
      tween = gsap.to(proxy, {
        frame: TOTAL_FRAMES - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const idx = Math.round(self.progress * (TOTAL_FRAMES - 1));
            if (idx !== currentFrame) {
              currentFrame = idx;
              drawFrame(currentFrame);
            }
          },
        },
      });

      st = ScrollTrigger.getAll().find(t => t.trigger === section) ?? null;

      // Text Overlays Animations
      const steps = gsap.utils.toArray<HTMLElement>('.maki-step');
      steps.forEach((step, i) => {

        // Fading in
        gsap.fromTo(step,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
              end: 'top 40%',
              scrub: 1,
            }
          }
        );

        // Fading out
        if (i !== steps.length - 1) { // Don't fade out the last one as aggressively
          gsap.fromTo(step,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -60,
              ease: "power2.in",
              scrollTrigger: {
                trigger: step,
                start: 'bottom 60%',
                end: 'bottom 25%',
                scrub: 1,
              }
            }
          );
        }
      });
    }

    /* Canvas fills the card — no viewport sizing needed */
    const first = new Image();
    first.onload = () => {
      frames[0] = first;
      framesLoaded = 1;
      sizeCanvas();
      drawFrame(0);
      updateProgress(framesLoaded);

      // Load the rest in parallel
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        loadFrame(i, () => {
          // All done — hide loader and start GSAP
          requestAnimationFrame(() => {
            if (loaderRef.current) {
              loaderRef.current.style.opacity = '0';
              loaderRef.current.style.pointerEvents = 'none';
              setTimeout(() => {
                if (loaderRef.current) loaderRef.current.style.display = 'none';
              }, 600);
            }
            initScrollTrigger();
          });
        });
      }
    };
    first.onerror = () => {
      console.warn('[MakiScroll] Frame 1 failed — check /maki/ path.');
      framesLoaded++;
      if (framesLoaded === TOTAL_FRAMES) initScrollTrigger();
    };
    first.src = frameSrc(0);

    /* Resize handler */
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        sizeCanvas();
        drawFrame(currentFrame);
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      tween?.kill();
      st?.kill();
      // kill text scroll triggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && trigger.trigger.classList.contains('maki-step')) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="maki-scroll-section"
      aria-label="Animación de maki roll"
      id="maki-animation"
    >
      {/* ── Sticky viewport ─────────────────────────────── */}
      <div ref={stickyRef} className="maki-scroll-sticky">

        {/* Contained card */}
        <div ref={cardRef} className="maki-scroll-card">

          {/* Loading overlay */}
          <div ref={loaderRef} className="maki-scroll-loader">
            <div className="maki-loader-inner">
              <p className="maki-loader-label">Cargando</p>
              <div className="maki-loader-track">
                <div ref={barRef} className="maki-loader-bar" />
              </div>
              <span ref={barLabelRef} className="maki-loader-count">0 / 240</span>
            </div>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="maki-scroll-canvas"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ── Editorial Overlay ─────────────────────────────── */}
      <div className="maki-content-overlay">

        <div className="maki-step maki-step-1">
          <div className="maki-step-panel">
            <p className="maki-step-eyebrow">Precisión Japonesa</p>
            <h2 className="maki-step-title">Arte<br />Milenario</h2>
            <p className="maki-step-desc">
              Cada corte es una declaración de intenciones. Respetamos la pureza de los ingredientes con técnicas tradicionales para un bocado perfecto.
            </p>
          </div>
        </div>

        <div className="maki-step maki-step-2">
          <div className="maki-step-panel">
            <p className="maki-step-eyebrow">Identidad Nikkei</p>
            <h2 className="maki-step-title">Fusión<br /><em>Audaz</em></h2>
            <p className="maki-step-desc">
              Salsas acevichadas, toques de ají amarillo y texturas que despiertan los sentidos. El equilibrio exacto entre dos culturas culinarias.
            </p>
          </div>
        </div>

        <div className="maki-step maki-step-3">
          <div className="maki-step-panel">
            <p className="maki-step-eyebrow">Materia Prima</p>
            <h2 className="maki-step-title">Sabor<br />Inigualable</h2>
            <p className="maki-step-desc">
              Solo el pescado más fresco y el arroz cultivado con dedicación logran esta textura que se deshace en el paladar.
            </p>
          </div>
        </div>

        <div className="maki-step maki-step-4">
          <div className="maki-step-4-inner">
            <h2 className="maki-step-title"><em>Pruébalo</em></h2>
            <a href="#menu" className="btn-cta-white" style={{ background: '#ef4444', color: '#fff' }}>Ver Menú Completo</a>
          </div>
        </div>

      </div>

    </section>
  );
}
