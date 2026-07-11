import { useEffect, useRef } from 'react'

export function Hours() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        e.target.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => {
          if (e.isIntersecting) el.classList.add('visible')
        })
      }),
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hours-section section-pad" id="horarios" ref={sectionRef}>
      <div className="seigaiha-bg" />
      <div className="container">
        <div className="hours-inner">
          <div className="hours-img-wrap reveal-left">
            <img
              src="/assets/content/yeyo12.jpeg"
              alt="Yeyo Maki horarios"
              className="hours-img"
            />
            <div className="hours-img-overlay" />
          </div>

          <div className="hours-content reveal-right">
            <p className="hours-eyebrow">Visítanos</p>
            <h2 className="hours-title">
              Horarios
              <span className="hours-title-jp">営業時間</span>
            </h2>

            <div className="hours-modes">
              <div className="hours-mode-card">
                <div className="hours-mode-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
                    <rect width="13" height="8" x="9" y="11" rx="1" />
                    <circle cx="11" cy="19" r="2" /><circle cx="18" cy="19" r="2" />
                  </svg>
                </div>
                <div>
                  <div className="hours-mode-title">Delivery</div>
                  <div className="hours-mode-sub">Pedido por WhatsApp</div>
                </div>
              </div>

              <div className="hours-mode-card">
                <div className="hours-mode-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div>
                  <div className="hours-mode-title">Presencial</div>
                  <div className="hours-mode-sub">Come aquí con nosotros</div>
                </div>
              </div>
            </div>

            <p className="hours-note">
              美味しい瞬間 — Momentos deliciosos.<br />
              Lunes cerrado. Te esperamos con las mejores tablas.
            </p>

            <div style={{ marginTop: '2rem' }}>
              <a href="#contacto" className="btn-primary" style={{ textDecoration: 'none' }}>
                Hacer una reserva
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
