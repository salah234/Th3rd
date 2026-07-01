/** A Sanity image reference (asset + optional hotspot/crop/alt). Fed to `urlFor`. */
export interface SanityImage {
  _type?: string
  asset?: { _ref: string; _type?: string }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

/** A single colourway: display name + hex swatch + optional image. */
export interface ColorOption {
  name: string
  hex: string
  /** Photo shown when this colourway is selected (falls back to the product gallery). */
  image?: SanityImage
}

/** A Portable Text block from Sanity rich-text fields. */
export type PortableTextBlock = { _type: string; [key: string]: unknown }

export interface Item {
  // Commerce (Supabase / FastAPI)
  id: string
  price: number
  originalPrice?: number
  currency: string
  collectionId?: string
  handle?: string
  // Content (Sanity) — title falls back to the commerce title when unset
  title: string
  subtitle?: string
  images?: SanityImage[]
  body?: PortableTextBlock[]
  colorOptions?: ColorOption[]
  isNew?: boolean
  isBestseller?: boolean
}

export interface Collection {
  // Commerce (Supabase / FastAPI)
  id: string
  handle?: string
  // Content (Sanity content overrides the commerce copy for presentation)
  title: string
  description?: string
  heroImage?: SanityImage
  accentColor?: string
  layout?: unknown[]
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
