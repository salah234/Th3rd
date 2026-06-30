from pydantic import BaseModel
from enum import Enum

class Item(BaseModel):
    id: str
    title: str
    subtitle: str
    price: float
    original_price: float
    currency: str
    collection_id: str
    created_at: str


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
    quanity: int
    

class Client(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    strip_customer_id: str
    created_at: str
    

class OrderStatus(str, Enum):
    pending = "pending"
    paid = "paid"
    fulfilled = "fulfilled"
    cancelled = "cancelled"
    refunded = "refunded"


class Order(BaseModel):
    id: str
    client_id: str
    cart_id: str
    status: OrderStatus
    total: float
    currency: str = "USD"
    stripe_payment_intent_id: str | None = None
    created_at: str
    updated_at: str | None = None

    
    
    
    
    
    