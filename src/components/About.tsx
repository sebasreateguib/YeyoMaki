import { useEffect, useRef } from 'react'

export function About() {
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
    <section className="about section-pad noise" id="nosotros" ref={sectionRef}>
      <div className="seigaiha-bg" />
      <div className="container">
        <div className="about-grid">
          <div className="about-images reveal-left">
            <img
              src="/assets/content/yeyo11.jpeg"
              alt="Yeyo Maki makis XL"
              className="about-img-main"
            />
            <img
              src="/assets/content/yeyo10.jpeg"
              alt="Yeyo Maki signature rolls"
              className="about-img-accent"
            />
            <div className="about-img-badge">
              <span className="about-img-badge-text">WE LOVE<br />WHAT<br />WE DO</span>
            </div>
          </div>

          <div className="about-content reveal-right">
            <p className="about-eyebrow">Nuestra Historia</p>
            <h2 className="about-title">
              Pasión en cada
              <span className="about-title-jp">一つひとつに情熱を</span>
            </h2>
            <p className="about-body">
              Yeyo Maki nació de una obsesión: hacer makis que realmente importen.
              Fusionamos la precisión japonesa con sabores peruanos auténticos —
              ebi furai, palta fresca, bonito flameado, salsas propias.
              Cada roll es una obra de arte comestible.
            </p>
            <p className="about-body">
              Nuestra cocina es abierta, nuestra actitud es directa: <em>amamos lo que hacemos</em>,
              y eso se siente en cada bocado.
            </p>

            <div className="gold-divider">
              <span>寿司</span>
            </div>

            <div className="about-stats">
              <div>
                <div className="about-stat-num">8+</div>
                <div className="about-stat-label">Makis Signature</div>
              </div>
              <div>
                <div className="about-stat-num">4+</div>
                <div className="about-stat-label">Sushi Bites</div>
              </div>
              <div>
                <div className="about-stat-num">∞</div>
                <div className="about-stat-label">Sabor</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
