import { useState, useEffect } from 'react'
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Product, CartItem } from '../types'
import './Products.css'

const PRODUCT_META: Record<string, { emoji: string; badge?: string }> = {
  'Roti Guling':    { emoji: '🥐', badge: 'Bestseller' },
  'Roti Roll':      { emoji: '🌀', badge: 'Favorit' },
  'Dubai Chewy':    { emoji: '🍫', badge: 'Viral' },
  'Cookies Choco':  { emoji: '🍪' },
  'Tiramisu Cake':  { emoji: '🎂', badge: 'Premium' },
  'Box Hampers':    { emoji: '🎁', badge: 'Spesial' },
}

interface ProductsProps {
  cartItems: CartItem[]
  onAddToCart: (product: Product) => Promise<void>
  onUpdateQty: (cartItemId: string, qty: number) => Promise<void>
  onOpenCart: () => void
}

export default function Products({ cartItems, onAddToCart, onUpdateQty, onOpenCart }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState<string | null>(null)
  const [justAdded, setJustAdded] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: true })
      setProducts(data ?? [])
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const getCartItem = (productId: string) =>
    cartItems.find(i => i.product_id === productId)

  const handleAdd = async (product: Product) => {
    setAdding(product.id)
    await onAddToCart(product)
    setAdding(null)
    setJustAdded(product.id)
    setTimeout(() => setJustAdded(null), 1500)
  }

  const handleIncrease = async (product: Product) => {
    const item = getCartItem(product.id)
    if (item) {
      await onUpdateQty(item.id, item.quantity + 1)
    } else {
      await handleAdd(product)
    }
  }

  const handleDecrease = async (product: Product) => {
    const item = getCartItem(product.id)
    if (item) {
      await onUpdateQty(item.id, item.quantity - 1)
    }
  }

  const totalInCart = cartItems.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <section id="products" className="products">
      <div className="products-container">
        <div className="section-header">
          <p className="section-eyebrow">Menu Kami</p>
          <h2 className="section-title">
            Pilihan <em>Terbaik</em> BRB
          </h2>
          <p className="section-desc">
            Semua dibuat segar setiap hari dengan bahan pilihan premium.
          </p>
        </div>

        {loading ? (
          <div className="products-skeleton">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="product-skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => {
              const meta = PRODUCT_META[product.name] ?? { emoji: '🍞' }
              const cartItem = getCartItem(product.id)
              const qty = cartItem?.quantity ?? 0
              const isAdding = adding === product.id
              const wasAdded = justAdded === product.id

              return (
                <div key={product.id} className={`product-card ${qty > 0 ? 'in-cart' : ''}`}>
                  {meta.badge && (
                    <span className="product-badge">{meta.badge}</span>
                  )}

                  <div className="product-emoji-wrap">
                    <span className="product-emoji">{meta.emoji}</span>
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>
                    <p className="product-price">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="product-actions">
                    {qty === 0 ? (
                      <button
                        className={`btn-add ${isAdding ? 'loading' : ''} ${wasAdded ? 'added' : ''}`}
                        onClick={() => handleAdd(product)}
                        disabled={isAdding}
                      >
                        {wasAdded ? (
                          <><Check size={16} /> Ditambahkan!</>
                        ) : isAdding ? (
                          <><span className="spinner" /> Menambah...</>
                        ) : (
                          <><ShoppingCart size={16} /> Tambah</>
                        )}
                      </button>
                    ) : (
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => handleDecrease(product)}>
                          <Minus size={16} />
                        </button>
                        <span className="qty-num">{qty}</span>
                        <button className="qty-btn" onClick={() => handleIncrease(product)}>
                          <Plus size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {totalInCart > 0 && (
          <div className="cart-floating-bar">
            <div className="cart-bar-info">
              <ShoppingCart size={20} />
              <span><strong>{totalInCart} item</strong> di keranjang</span>
            </div>
            <button className="cart-bar-btn" onClick={onOpenCart}>
              Lihat Keranjang →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
