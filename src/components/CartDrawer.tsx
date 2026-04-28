import { X, Trash2, Minus, Plus, ShoppingBag, MessageCircle } from 'lucide-react'
import type { CartItem } from '../types'
import './CartDrawer.css'

const PRODUCT_EMOJI: Record<string, string> = {
  'Roti Guling':   '🥐',
  'Roti Roll':     '🌀',
  'Dubai Chewy':   '🍫',
  'Cookies Choco': '🍪',
  'Tiramisu Cake': '🎂',
  'Box Hampers':   '🎁',
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  loading: boolean
  totalItems: number
  totalPrice: number
  onUpdateQty: (id: string, qty: number) => Promise<void>
  onRemove: (id: string) => Promise<void>
  onCheckout: () => void
  onClear: () => Promise<void>
}

export default function CartDrawer({
  isOpen, onClose, cartItems, loading,
  totalItems, totalPrice,
  onUpdateQty, onRemove, onCheckout, onClear,
}: CartDrawerProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="cart-drawer">
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-header-left">
            <ShoppingBag size={22} />
            <h2>Keranjang Belanja</h2>
            {totalItems > 0 && (
              <span className="drawer-badge">{totalItems}</span>
            )}
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Tutup">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="drawer-body">
          {loading ? (
            <div className="drawer-loading">
              <div className="drawer-spinner" />
              <p>Memuat keranjang...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="drawer-empty">
              <span className="drawer-empty-emoji">🛒</span>
              <h3>Keranjang Kosong</h3>
              <p>Yuk pilih menu BRB favoritmu!</p>
              <button className="btn-browse" onClick={onClose}>
                Lihat Menu
              </button>
            </div>
          ) : (
            <>
              <div className="drawer-items">
                {cartItems.map(item => (
                  <div key={item.id} className="drawer-item">
                    <div className="item-emoji">
                      {PRODUCT_EMOJI[item.product?.name ?? ''] ?? '🍞'}
                    </div>
                    <div className="item-info">
                      <p className="item-name">{item.product?.name}</p>
                      <p className="item-price">
                        Rp {(item.product?.price ?? 0).toLocaleString('id-ID')}
                        <span className="item-each"> / pcs</span>
                      </p>
                    </div>
                    <div className="item-controls">
                      <div className="item-qty">
                        <button
                          className="item-qty-btn"
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          aria-label="Kurang"
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="item-qty-btn"
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          aria-label="Tambah"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="item-subtotal">
                        Rp {((item.product?.price ?? 0) * item.quantity).toLocaleString('id-ID')}
                      </p>
                      <button
                        className="item-remove"
                        onClick={() => onRemove(item.id)}
                        aria-label="Hapus"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="clear-cart-btn" onClick={onClear}>
                Kosongkan Keranjang
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="footer-summary">
              <div className="footer-row">
                <span>Subtotal ({totalItems} item)</span>
                <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="footer-row footer-note">
                <span>Ongkir & lainnya dikonfirmasi via WhatsApp</span>
              </div>
            </div>

            <button className="btn-checkout" onClick={onCheckout}>
              <MessageCircle size={20} />
              <span>
                Pesan via WhatsApp
                <small>Rp {totalPrice.toLocaleString('id-ID')}</small>
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  )
}
