from pydantic import BaseModel
class Item(BaseModel):
    # Mirrors the actual public.items table (Sanity-backed: content lives in Sanity,
    # Supabase holds commerce fields + a sanity_id pointer + handle).
    id: str
    title: str
    price: float
    original_price: float | None = None
    currency: str
    sanity_id: str
    collection_id: str | None = None
    created_at: str
    handle: str | None = None



class Collection(BaseModel):
    id: str
    title: str
    description: str
    handle: str
    created_at: str
    


class Carts(BaseModel):
    id: str 
    client_id: str
    currency: str
    created_at: str


class CartItems(BaseModel) :
    id: str
    cart_id: str
    item_id: str
    item_id: str
    quanity: int
    

class Client(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    strip_customer_id: str
    created_at: str
    
    
    
    
    
    
    
    