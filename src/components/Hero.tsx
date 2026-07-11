function Petals() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: `${6 + Math.random() * 8}px`,
    opacity: 0.3 + Math.random() * 0.4,
  }))

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
  )
}

export function Hero() {
  return (
    <section className="hero noise" id="top">
      <div className="hero-bg">
        <div className="hero-bg-image" />
        <div className="hero-bg-gradient" />
        <div className="seigaiha-bg" />
        <div className="hero-red-circle" />
        <div className="hero-gold-accent" />
      </div>

      <div className="hero-jp-text">我々は愛をもって料理する</div>

      <Petals />

      <div className="container hero-content">
        <p className="hero-eyebrow">Lima · Perú · 2024</p>

        <h1 className="hero-title">
          <span className="line-1">YEYO</span>
          <span className="line-2">まき</span>
        </h1>

        <p className="hero-subtitle">
          Makis artesanales con alma peruana y espíritu japonés.<br />
          <em>We love what we do.</em>
        </p>

        <div className="hero-actions">
          <a href="#menu" className="btn-primary">
            Ver Menú ↓
          </a>
          <a href="#nosotros" className="btn-outline">
            Nuestra Historia
          </a>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <div className="hero-scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
