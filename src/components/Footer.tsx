export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-logo">
            YEYO<span>.</span>MAKI
          </div>
          <div className="footer-jp">イエヨマキ · We Love What We Do</div>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Yeyo Maki · Lima, Perú
        </p>

        <div className="footer-social">
          <a href="https://instagram.com/yeyomaki" aria-label="Instagram" target="_blank" rel="noopener">
            IG
          </a>
          <a href="https://wa.me/51999999999" aria-label="WhatsApp" target="_blank" rel="noopener">
            WA
          </a>
          <a href="https://tiktok.com/@yeyomaki" aria-label="TikTok" target="_blank" rel="noopener">
            TT
          </a>
        </div>
      </div>
    </footer>
  )
}
