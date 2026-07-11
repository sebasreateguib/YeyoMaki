import { useEffect, useRef } from 'react'
import { menuData } from '../data/menuData'

export function SignatureSection() {
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
    <section className="signature-section section-pad" id="signature" ref={sectionRef}>
      <div className="signature-bg-img" />
      <div className="seighaiba-bg seigaiha-bg" />
      <div className="container">
        <div className="signature-grid">
          <div className="signature-content reveal-left">
            <p className="section-eyebrow">
              <span>★</span> Yeyo Signature <span>★</span>
            </p>
            <h2 className="signature-title">
              Nuestros
              <span className="signature-jp">看板メニュー</span>
            </h2>

            {/* Mobile only — replaces all text content */}
            <img
              src="/assets/content/yeyo5.jpeg"
              alt="Yeyo Maki Signature"
              className="signature-mobile-img"
            />

            <p className="signature-desc">
              Creaciones únicas que nacieron de la obsesión por el sabor.
              Estos son los rolls que nos ponen en el mapa.
              <em>Just ask the chef ;)</em>
            </p>

            <div className="signature-items">
              {menuData.signature.map((item, i) => (
                <div className="signature-item" key={i} data-hover>
                  <div>
                    <div className="signature-item-name">{item.name}</div>
                    <div className="signature-item-desc">{item.desc}</div>
                  </div>
                  <div className="signature-item-price">{item.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="signature-image-wrap reveal-right">
            <img
              src="/assets/content/yeyo9.jpeg"
              alt="Yeyo Maki Signature Roll"
              className="signature-image-main"
            />
            <div className="signature-image-badge">
              <span className="sig-badge-jp">寿司</span>
              <span className="sig-badge-text">Premium<br />Artisanal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
