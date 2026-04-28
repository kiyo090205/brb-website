import './Marquee.css'

const items = [
  '🥐 Roti Guling',
  '🌀 Roti Roll',
  '🍫 Dubai Chewy',
  '🍪 Cookies Choco',
  '🎂 Tiramisu Cake',
  '🎁 Box Hampers',
  '✨ Fresh Every Day',
  '🛵 Free Ongkir Area Tertentu',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-sep">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
