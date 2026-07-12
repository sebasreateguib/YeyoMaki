import { useEffect, useRef } from 'react'

export function Offers() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        e.target.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => {
          if (e.isIntersecting) el.classList.add('visible')
        })
      }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="offers-section section-pad" id="ofertas" ref={sectionRef}>
      <div className="seigaiha-bg" />
      <div className="container">
        <div className="offers-header reveal">
          <p className="section-eyebrow">Promociones</p>
          <h2 className="section-title text-gold">
            YEYOFERTAS!!
          </h2>
          <p className="section-subtitle">Las promos que no puedes dejar pasar</p>
        </div>

        <div className="offers-grid">
          {/* Promo 1 — Yeyo Maki */}
          <div className="offer-card reveal-left">
            <div className="offer-card-img-wrap">
              <img src="/assets/content/yeyo4.jpeg" alt="Yeyo Maki promo" className="offer-card-img" />
              <div className="offer-card-img-overlay" />
            </div>
            <div className="offer-card-body">
              <div className="offer-tag">Oooobviamente pues!</div>
              <h3 className="offer-title">YEYO MAKI?<br /><span>YEYO MAKI!</span></h3>
              <div className="offer-detail">20 makis <span className="offer-sep">·</span> 2 sabores</div>
              <div className="offer-price">S/ <strong>48</strong></div>
            </div>
          </div>

          {/* Promo 2 — Promo Makis */}
          <div className="offer-card reveal-right">
            <div className="offer-card-img-wrap">
              <img src="/assets/content/yeyo2.jpeg" alt="Promo Makis" className="offer-card-img" />
              <div className="offer-card-img-overlay" />
            </div>
            <div className="offer-card-body">
              <div className="offer-tag">La de siempre ;)</div>
              <h3 className="offer-title">PROMO<br /><span>MAKIS</span></h3>
              <div className="offer-detail">30 cortes <span className="offer-sep">·</span> 3 sabores</div>
              <div className="offer-price">S/ <strong>70</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
