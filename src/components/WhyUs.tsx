import './WhyUs.css'

const reasons = [
  { icon: '🌾', title: 'Bahan Premium', desc: 'Tepung, mentega, dan bahan pilihan terbaik untuk cita rasa yang konsisten.' },
  { icon: '🕐', title: 'Fresh Every Day', desc: 'Diproduksi segar setiap pagi. Tidak ada produk kemarin di rak kami.' },
  { icon: '🚫', title: 'No Pengawet', desc: 'Bebas pengawet buatan. Aman untuk keluarga dan anak-anak.' },
  { icon: '👨‍🍳', title: 'Resep Artisan', desc: 'Resep dikembangkan oleh baker berpengalaman dengan teknik artisan.' },
  { icon: '🛵', title: 'Delivery Cepat', desc: 'Tersedia layanan antar ke area Pekanbaru via GoFood & GrabFood.' },
  { icon: '💬', title: 'Custom Order', desc: 'Terima pesanan khusus untuk hampers, ulang tahun, dan acara spesial.' },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="why-us">
      <div className="why-us-container">
        <div className="section-header">
          <p className="section-eyebrow">Keunggulan Kami</p>
          <h2 className="section-title">Kenapa Pilih <em>BRB?</em></h2>
          <p className="section-desc">Kami berkomitmen memberikan yang terbaik di setiap loyang.</p>
        </div>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{r.icon}</div>
              <h3 className="why-title">{r.title}</h3>
              <p className="why-desc">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="why-quote">
          <span className="quote-mark">"</span>
          <p>Setiap roti yang keluar dari dapur kami adalah karya yang dibuat dengan hati.</p>
          <cite>— Tim BRB Pekanbaru</cite>
        </div>
      </div>
    </section>
  )
}
