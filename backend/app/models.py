from pydantic import BaseModel
class Item(BaseModel):
    id: str
    title: str
    subtitle: str
    price: float
    original_price: float
    currency: str
    is_new: bool
    is_bestseller: bool
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
    
    
    
    
    
    
    
    