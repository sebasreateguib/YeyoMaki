import { useState, useEffect } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#top" className="navbar-logo" aria-label="Yeyo Maki Home">
          <img src="/assets/content/YeyoBanner.png" alt="Yeyo Maki Logo" />
        </a>

        <ul className="navbar-nav">
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#menu">Menú</a></li>
          <li><a href="#ofertas">Ofertas</a></li>
          <li><a href="#signature">Signature</a></li>
          <li><a href="#horarios">Horarios</a></li>
        </ul>

        <a href="#contacto" className="navbar-cta">Reservar</a>

        <button className="navbar-mobile-toggle" aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
