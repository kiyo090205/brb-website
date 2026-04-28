export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  image_url?: string
  emoji?: string
  is_available: boolean
}

export interface CartItem {
  id: string
  session_id: string
  product_id: string
  quantity: number
  product?: Product
}
