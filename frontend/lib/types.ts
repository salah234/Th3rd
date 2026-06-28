export interface Item {
  id: string
  title: string
  subtitle?: string
  price: number
  originalPrice?: number
  currency: string
  imageUrl?: string
  colorOptions?: string[]
  isNew?: boolean
  isBestseller?: boolean
  collectionId?: string
}

export interface Collection {
  id: string
  title: string
  description?: string
  imageUrl?: string
  handle?: string
  accentColor?: string
}

export interface CartItem {
  id: string
  item: Item
  quantity: number
}

export interface Cart {
  id: string
  items: CartItem[]
  total: number
  currency: string
}

export interface Client {
  id: string
  email: string
  firstName?: string
  lastName?: string
  stripeCustomerId?: string
}

export interface Subscriber {
  email: string
  firstName?: string
  subscribedAt: string
}
