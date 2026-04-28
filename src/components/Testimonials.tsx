import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Testimonials.css'

const testimonials = [
  { name: 'Rina W.', avatar: '👩', rating: 5, text: 'Roti Guling BRB beneran beda banget! Lembut, isinya banyak, harganya juga worth it. Udah jadi langganan tetap.', location: 'Harapan Raya' },
  { name: 'Budi S.', avatar: '👨', rating: 5, text: 'Dubai Chewy-nya viral banget emang! Teksturnya chewy tapi pas, rasa coklatnya dapet. Recommended banget!', location: 'Panam' },
  { name: 'Sari D.', avatar: '👩‍🦰', rating: 5, text: 'Pesen Box Hampers buat lebaran, hasilnya cantik banget! Packagingnya rapi, isinya enak semua. Keluarga suka!', location: 'Tampan' },
  { name: 'Andi P.', avatar: '🧑', rating: 5, text: 'Tiramisu Cake-nya mantap! Lembut, rasa tiramisu-nya dapet, ga terlalu manis. Cocok buat hadiah ulang tahun.', location: 'Sukajadi' },
  { name: 'Dina M.', avatar: '👩‍🦱', rating: 5, text: 'Cookies Choco-nya addictive banget! Soft, rich chocolate, dan ukurannya besar. Sekali coba pasti balik lagi!', location: 'Harapan Raya' },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent(c => (c + 1) % testimonials.length)

  const getVisible = () => {
    const prev1 = (current - 1 + testimonials.length) % testimonials.length
    const next1 = (current + 1) % testimonials.length
    return [prev1, current, next1]
  }

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials-container">
        <div className="section-header">
          <p className="section-eyebrow">Ulasan Pelanggan</p>
          <h2 className="section-title">Kata Mereka <em>Tentang BRB</em></h2>
        </div>

        <div className="testi-rating-bar">
          <div className="rating-big">
            <span className="rating-number">4.9</span>
            <div>
              <div className="stars">★★★★★</div>
              <span className="rating-count">200+ ulasan</span>
            </div>
          </div>
        </div>

        <div className="testi-slider">
          {getVisible().map((idx, pos) => {
            const t = testimonials[idx]
            return (
              <div
                key={idx}
                className={`testi-card ${pos === 1 ? 'active' : 'side'}`}
              >
                <div className="testi-stars">{'★'.repeat(t.rating)}</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <span className="testi-avatar">{t.avatar}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="testi-controls">
          <button className="testi-btn" onClick={prev} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <div className="testi-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testi-dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
          <button className="testi-btn" onClick={next} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
