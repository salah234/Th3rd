from fastapi import APIRouter, HTTPException

from app.supa import get_client
from app.models import Collection
router = APIRouter(prefix="/collections", tags=["collections"])


@router.get("", summary="List all collections")
async def list_collections():
    """Return every collection, newest first."""
    response = (
        get_client()
        .table("collections")
        .select("*")
        .order("created_at", desc=True)
        .execute()
    )
    
    collections = []
    collections = [Collection(**item) for item in response.data]
    
    return {"collections": collections, "total": len(collections)}


@router.get("/{collection_id}", summary="Get a single collection")
async def get_collection(collection_id: str):
    """
    param collection_id: The UUID of the collection to retrieve.

    Returns the collection record, or 404 if it doesn't exist.
    """
    response = (
        get_client()
        .table("collections")
        .select("*")
        .eq("id", collection_id)
        .execute()
    )        
    
   
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Collection not found")
    return Collection(**response.data[0])