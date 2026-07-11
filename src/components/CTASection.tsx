import { useEffect, useRef } from 'react'

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        e.target.querySelectorAll('.reveal').forEach(el => {
          if (e.isIntersecting) el.classList.add('visible')
        })
      }),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="cta-section" id="contacto" ref={sectionRef}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <p className="cta-jp-title reveal">まず食べてみて</p>
        <h2 className="cta-title reveal">¿Listo para<br />el siguiente nivel?</h2>
        <p className="cta-sub reveal">We love what we do — y tú lo vas a amar también.</p>

        <div className="cta-actions reveal">
          <a href="https://wa.me/51999999999" className="btn-cta-white" target="_blank" rel="noopener">
            WhatsApp →
          </a>
          <a href="https://instagram.com/yeyomaki" className="btn-cta-outline-white" target="_blank" rel="noopener">
            Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
