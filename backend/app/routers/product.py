"""Product Endpoint"""

# API Routes for product 

from __future__ import annotations

from fastapi import APIRouter, Query

router = APIRouter(tags=["product"])


@router.get("/api/products")
async def list_products( # Probably need pagination if we get lots of products in our site (Future Step)
    collection: str | None = Query(default=None),
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0)
): 
    """
    Goal: List Products
    - Have Collection Filter
    - Return Item model (For now dictionary format but mayber later in Pydantic Model)
    - Request: Collection that the item is part of, Limit of how much seen in API, offset (stuff to skip )
    - Response: {Items/Products, Specific Collection, Limit, offset, total (total items found)}
    """

    return {
        "items": [],
        "collection": collection,
        "limit": limit,
        "offset": offset,
        "total": 0
    }

@router.get("/api/products/{product_id}") 
async def get_product(product_id: str): # Might be UUID
    """
    - Getting products filtered by product_id (Single Product)

    """
    return {
        "id": product_id,
        "name": "Temp Product",
        "price": 9.99
    }

"""

Need to do later
- Wire Medusa and Query Medusa Products as well as link it to APIs above
- Apply Collection Filter
- In both return statements -> Want to return an ItemRepsonse Pydantic Model that is mapped from information returned from Medusa

"""