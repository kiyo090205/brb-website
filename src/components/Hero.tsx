import { ShoppingBag, Star, ArrowDown } from 'lucide-react'
import './Hero.css'

interface HeroProps {
  onOrderClick: () => void
}

export default function Hero({ onOrderClick }: HeroProps) {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <div className="hero-circle hero-circle-1" />
        <div className="hero-circle hero-circle-2" />
        <div className="hero-circle hero-circle-3" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Star size={14} fill="currentColor" />
            <span>Artisan Bakery #1 Harapan Raya</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-line1">Bukan</span>
            <span className="hero-title-line2">Roti</span>
            <span className="hero-title-line3">Biasa<span className="hero-dot">.</span></span>
          </h1>

          <p className="hero-desc">
            Roti artisan premium dengan bahan pilihan terbaik.
            Freshly baked setiap hari di Pekanbaru, Harapan Raya.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={onOrderClick}>
              <ShoppingBag size={18} />
              Pesan Sekarang
            </button>
            <a href="#about" className="btn-ghost">
              Kenali Kami
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-num">6+</span>
              <span className="stat-label">Menu Pilihan</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="stat-num">3</span>
              <span className="stat-label">Cabang</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="stat-num">1K+</span>
              <span className="stat-label">Pelanggan</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card-main">
            <div className="hero-emoji-big">🍞</div>
            <div className="hero-card-label">Fresh Daily</div>
          </div>
          <div className="hero-card-float float-1">
            <span>🥐</span>
            <span>Roti Guling</span>
          </div>
          <div className="hero-card-float float-2">
            <span>🍪</span>
            <span>Cookies Choco</span>
          </div>
          <div className="hero-card-float float-3">
            <span>🎂</span>
            <span>Tiramisu Cake</span>
          </div>
          <div className="hero-rating">
            <div className="rating-stars">★★★★★</div>
            <div className="rating-text">4.9 · 200+ ulasan</div>
          </div>
        </div>
      </div>

      <a href="#about" className="hero-scroll-hint">
        <ArrowDown size={18} />
        <span>Scroll ke bawah</span>
      </a>
    </section>
  )
}
