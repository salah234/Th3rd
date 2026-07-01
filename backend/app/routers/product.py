"""Product Endpoint"""

# API Routes for product 

from __future__ import annotations

from fastapi import APIRouter, Query
from app.models import Item
from app.supa import get_client

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
    query = get_client().table("items").select("*", count="exact")
    if collection:
        query = query.eq("collection_id", collection)
    response = (
        query
        .order("created_at", desc=True)
        .range(offset, offset + limit - 1)
        .execute()
    )
    items = [Item(**item) for item in response.data]
    return {
        "items": items,
        "collection": collection,
        "limit": limit,
        "offset": offset,
        "total": response.count if response.count is not None else len(items)
    }
    

@router.get("/api/products/{product_id}") 
async def get_product(product_id: str): # Might be UUID
    """
    - Getting products filtered by product_id (Single Product)

    """
    response = (
                get_client()
                .table("items")
                .select("*")
                .eq("id", product_id)
                .execute()
                )
    selct_product = [Item(**item) for item in response.data]
    return {"product": selct_product}
# """

# Need to do later
# - Wire Medusa and Query Medusa Products as well as link it to APIs above
# - Apply Collection Filter
# - In both return statements -> Want to return an ItemRepsonse Pydantic Model that is mapped from information returned from Medusa

# """
