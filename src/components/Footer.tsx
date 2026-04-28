import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-brb">BRB</span>
            <span className="footer-logo-dot">·</span>
          </div>
          <p className="footer-tagline">Bukan Roti Biasa</p>
          <p className="footer-sub">Artisan Bakery · Pekanbaru</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <p className="footer-col-title">Menu</p>
            <a href="#products">Roti Guling</a>
            <a href="#products">Roti Roll</a>
            <a href="#products">Dubai Chewy</a>
            <a href="#products">Cookies Choco</a>
            <a href="#products">Tiramisu Cake</a>
            <a href="#products">Box Hampers</a>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Navigasi</p>
            <a href="#hero">Beranda</a>
            <a href="#about">Tentang Kami</a>
            <a href="#why-us">Keunggulan</a>
            <a href="#testimonials">Ulasan</a>
            <a href="#location">Cabang</a>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Hubungi</p>
            <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER ?? ''}`} target="_blank" rel="noopener noreferrer">
              💬 WhatsApp
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              📸 Instagram
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              🎵 TikTok
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Bukan Roti Biasa (BRB). All rights reserved.</p>
        <p>Made with ❤️ in Pekanbaru</p>
      </div>
    </footer>
  )
}
