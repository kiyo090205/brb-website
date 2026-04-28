import './About.css'

const stats = [
  { num: '2021', label: 'Berdiri Sejak' },
  { num: '3', label: 'Cabang Aktif' },
  { num: '1000+', label: 'Pelanggan Setia' },
  { num: '6', label: 'Varian Menu' },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-visual">
          <div className="about-card-main">
            <span className="about-emoji">🍞</span>
            <div className="about-card-text">
              <strong>Artisan Bakery</strong>
              <span>Pekanbaru</span>
            </div>
          </div>
          <div className="about-tag about-tag-1">✨ Fresh Baked Daily</div>
          <div className="about-tag about-tag-2">🏆 Premium Quality</div>
          <div className="about-bg-shape" />
        </div>

        <div className="about-content">
          <p className="about-eyebrow">Tentang Kami</p>
          <h2 className="about-title">
            Roti yang Dibuat dengan <em>Cinta & Keahlian</em>
          </h2>
          <p className="about-body">
            BRB (Bukan Roti Biasa) lahir dari passion terhadap roti artisan berkualitas tinggi.
            Kami percaya setiap gigitan harus memberikan pengalaman yang berbeda — lembut, lezat,
            dan tak terlupakan.
          </p>
          <p className="about-body">
            Dibuat segar setiap hari dengan bahan-bahan pilihan terbaik, tanpa pengawet buatan.
            Dari dapur kami di Harapan Raya, Pekanbaru — langsung ke tangan Anda.
          </p>

          <div className="about-stats">
            {stats.map((s, i) => (
              <div key={i} className="about-stat">
                <span className="about-stat-num">{s.num}</span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
