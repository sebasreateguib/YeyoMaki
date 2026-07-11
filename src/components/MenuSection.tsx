import { useState, useEffect, useRef } from 'react'
import { menuData, type MenuCategory } from '../data/menuData'

export function MenuSection() {
  const [active, setActive] = useState<MenuCategory>('makis')
  const sectionRef = useRef<HTMLElement>(null)

  const tabs: { key: MenuCategory; label: string }[] = [
    { key: 'makis', label: 'Makis' },
    { key: 'signature', label: 'Signature' },
    { key: 'bites', label: 'Sushi Bites' },
    { key: 'entradas', label: 'Entradas' },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        e.target.querySelectorAll('.reveal').forEach((el, i) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add('visible'), i * 60)
          }
        })
      }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [active])

  const items = menuData[active]

  return (
    <section className="menu-section section-pad" id="menu" ref={sectionRef}>
      <div className="seigaiha-bg" />
      <div className="container">
        <div className="menu-section-header reveal">
          <p className="section-eyebrow">Nuestro Menú</p>
          <h2 className="section-title text-gold">
            Cada bocado,<br />una historia
          </h2>
          <p className="section-subtitle">Makis artesanales con ingredientes seleccionados</p>
        </div>

        <div className="menu-tabs reveal">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`menu-tab${active === t.key ? ' active' : ''}`}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {items.map((item, i) => (
            <div className="menu-item reveal" key={i} style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="menu-item-header">
                <div>
                  <div className="menu-item-name">{item.name}</div>
                  {item.tag && <div className="menu-item-tag">{item.tag}</div>}
                </div>
                <div className="menu-item-price">{item.price}</div>
              </div>
              <p className="menu-item-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
