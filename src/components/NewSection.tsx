import { useEffect, useRef } from 'react'

export function NewSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        e.target.querySelectorAll('.reveal').forEach(el => {
          if (e.isIntersecting) el.classList.add('visible')
        })
      }),
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="new-section section-pad noise" id="lo-nuevo" ref={sectionRef}>
      <div className="seigaiha-bg" />
      <div className="container">
        <div className="menu-section-header reveal">
          <p className="section-eyebrow">Exclusivo</p>
          <h2 className="section-title text-gold">Lo Nuevo</h2>
          <p className="section-subtitle">Descubre nuestras últimas creaciones</p>
        </div>

        <style>{`
          .new-section-layout {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 3rem;
            gap: 2rem;
          }
          .new-section-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 0 1rem;
          }
          
          .desktop-only {
            display: none;
          }
          
          /* Glow effect for the spicy maki */
          .spicy-glow {
            position: relative;
          }
          .spicy-glow::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 80%;
            background: radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(239, 68, 68, 0) 70%);
            z-index: -1;
            filter: blur(40px);
          }

          @media (min-width: 768px) {
            .new-section-layout {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 5rem;
              align-items: center;
              max-width: 900px;
              margin-left: auto;
              margin-right: auto;
            }
            .new-section-text {
              align-items: flex-start;
              text-align: left;
              padding: 0;
            }
            .desktop-only {
              display: block;
            }
          }
        `}</style>

        <div className="reveal new-section-layout">
          <div className="spicy-glow" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <img
              src="/assets/content/cheeto.jpeg"
              alt="Lo Nuevo en Yeyo Maki - Furai Flamin' Hot"
              style={{
                width: '100%',
                maxWidth: '320px',
                height: 'auto',
                borderRadius: '24px',
                boxShadow: '0 25px 50px -12px rgba(220, 38, 38, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transform: 'rotate(-2deg)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-2deg) scale(1)'}
            />
          </div>

          <div className="new-section-text">
            <div className="desktop-only" style={{
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              width: 'fit-content'
            }}>
              🔥 Edición Limitada
            </div>

            <h3 className="section-title desktop-only" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              color: '#fff'
            }}>
              El nuevo <br />
              <span className="text-gold" style={{ color: '#ef4444' }}>Furai Flamin' Hot</span>
            </h3>

            <p className="about-body desktop-only" style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: '1.6'
            }}>
              Atrévete a probar nuestra más reciente creación. Una explosión de sabor con el toque inconfundible y crujiente de <strong style={{ color: '#fff' }}>Cheetos Flamin' Hot</strong>, combinado con la frescura de nuestros ingredientes.
            </p>

            <p className="about-body" style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.6)',
              marginTop: '1rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Perfecto para los amantes de las texturas atrevidas y los sabores intensos.
            </p>

            <a href="#contacto" className="btn-cta-white" style={{ background: '#ef4444', color: '#fff' }}>
              ¡Lo quiero probar!
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
