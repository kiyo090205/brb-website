import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '../lib/supabase'
import type { CartItem, Product } from '../types'

function getSessionId(): string {
  let id = localStorage.getItem('brb_session_id')
  if (!id) {
    id = uuidv4()
    localStorage.setItem('brb_session_id', id)
  }
  return id
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const sessionId = getSessionId()

  const fetchCart = useCallback(async () => {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, product:products(*)')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })

    if (!error) {
      setCartItems(data ?? [])
    }
    setLoading(false)
  }, [sessionId])

  useEffect(() => {
    fetchCart()

    const channel = supabase
      .channel(`cart-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cart_items',
          filter: `session_id=eq.${sessionId}`,
        },
        () => { fetchCart() }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchCart, sessionId])

  const addToCart = async (product: Product) => {
    const existing = cartItems.find(i => i.product_id === product.id)
    if (existing) {
      await updateQuantity(existing.id, existing.quantity + 1)
    } else {
      await supabase.from('cart_items').insert({
        session_id: sessionId,
        product_id: product.id,
        quantity: 1,
      })
      await fetchCart()
    }
  }

  const updateQuantity = async (cartItemId: string, qty: number) => {
    if (qty < 1) {
      await removeFromCart(cartItemId)
      return
    }
    await supabase
      .from('cart_items')
      .update({ quantity: qty, updated_at: new Date().toISOString() })
      .eq('id', cartItemId)
    await fetchCart()
  }

  const removeFromCart = async (cartItemId: string) => {
    await supabase.from('cart_items').delete().eq('id', cartItemId)
    await fetchCart()
  }

  const clearCart = async () => {
    await supabase.from('cart_items').delete().eq('session_id', sessionId)
    await fetchCart()
  }

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, i) => sum + (i.product?.price ?? 0) * i.quantity,
    0
  )

  const checkoutToWhatsApp = () => {
    const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER as string
    if (!waNumber) {
      alert('Nomor WhatsApp belum dikonfigurasi.')
      return
    }
    if (cartItems.length === 0) {
      alert('Keranjang belanja masih kosong!')
      return
    }

    const lines = cartItems.map(
      i =>
        `• ${i.product?.name} x${i.quantity} = Rp ${(
          (i.product?.price ?? 0) * i.quantity
        ).toLocaleString('id-ID')}`
    )

    const message = [
      '🍞 *Halo BRB! Saya mau pesan:*',
      '',
      ...lines,
      '',
      `*Total: Rp ${totalPrice.toLocaleString('id-ID')}*`,
      '',
      'Mohon konfirmasi ketersediaan dan info pembayaran ya kak! 🙏',
    ].join('\n')

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return {
    cartItems,
    loading,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkoutToWhatsApp,
  }
}
