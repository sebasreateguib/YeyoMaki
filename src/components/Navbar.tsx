import { useState, useEffect } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="container navbar-inner">
        <a href="#top" className="navbar-logo" aria-label="Yeyo Maki Home" onClick={() => setMenuOpen(false)}>
          <img src="/assets/content/YeyoBanner.png" alt="Yeyo Maki Logo" />
        </a>

        <ul className={`navbar-nav ${menuOpen ? 'active' : ''}`}>
          <li><a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a></li>
          <li><a href="#menu" onClick={() => setMenuOpen(false)}>Menú</a></li>
          <li><a href="#ofertas" onClick={() => setMenuOpen(false)}>Ofertas</a></li>
          <li><a href="#signature" onClick={() => setMenuOpen(false)}>Signature</a></li>
          <li><a href="#horarios" onClick={() => setMenuOpen(false)}>Horarios</a></li>
        </ul>

        <a href="#contacto" className="navbar-cta" onClick={() => setMenuOpen(false)}>Pedir</a>

        <button 
          className={`navbar-mobile-toggle ${menuOpen ? 'active' : ''}`} 
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
