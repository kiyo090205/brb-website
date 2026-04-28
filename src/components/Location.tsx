import { MapPin, Clock, Phone } from 'lucide-react'
import './Location.css'

const branches = [
  {
    name: 'BRB Harapan Raya',
    address: 'Jl. Harapan Raya, Pekanbaru',
    hours: 'Setiap Hari: 07.00 – 21.00',
    phone: '0812-3456-7890',
    emoji: '🏪',
    main: true,
  },
  {
    name: 'BRB Panam',
    address: 'Jl. HR Soebrantas, Panam, Pekanbaru',
    hours: 'Setiap Hari: 08.00 – 21.00',
    phone: '0812-3456-7891',
    emoji: '🏬',
    main: false,
  },
  {
    name: 'BRB Sukajadi',
    address: 'Jl. Sukajadi, Pekanbaru',
    hours: 'Setiap Hari: 08.00 – 20.00',
    phone: '0812-3456-7892',
    emoji: '🏢',
    main: false,
  },
]

const platforms = [
  { name: 'GoFood', emoji: '🟢', color: '#00AA13' },
  { name: 'GrabFood', emoji: '🟢', color: '#00B14F' },
  { name: 'ShopeeFood', emoji: '🟠', color: '#EE4D2D' },
]

export default function Location() {
  return (
    <section id="location" className="location">
      <div className="location-container">
        <div className="section-header">
          <p className="section-eyebrow">Temukan Kami</p>
          <h2 className="section-title">Cabang <em>BRB</em> Terdekat</h2>
          <p className="section-desc">Kunjungi kami atau order lewat platform ojol favoritmu.</p>
        </div>

        <div className="branches-grid">
          {branches.map((b, i) => (
            <div key={i} className={`branch-card ${b.main ? 'main-branch' : ''}`}>
              {b.main && <span className="branch-main-tag">Pusat</span>}
              <div className="branch-emoji">{b.emoji}</div>
              <h3 className="branch-name">{b.name}</h3>
              <div className="branch-info">
                <div className="branch-info-row">
                  <MapPin size={15} />
                  <span>{b.address}</span>
                </div>
                <div className="branch-info-row">
                  <Clock size={15} />
                  <span>{b.hours}</span>
                </div>
                <div className="branch-info-row">
                  <Phone size={15} />
                  <a href={`tel:${b.phone.replace(/-/g,'')}`}>{b.phone}</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="ojol-section">
          <p className="ojol-title">Juga tersedia di platform ojol</p>
          <div className="ojol-pills">
            {platforms.map((p, i) => (
              <div key={i} className="ojol-pill">
                <span>{p.emoji}</span>
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
