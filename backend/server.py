from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class VisitorCount(BaseModel):
    model_config = ConfigDict(extra="ignore")
    count: int = 0

class VoteData(BaseModel):
    model_config = ConfigDict(extra="ignore")
    valid_votes: int = 0
    invalid_votes: int = 0
    total_votes: int = 0

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Visitor Counter Endpoints
@api_router.get("/visitor-count", response_model=VisitorCount)
async def get_visitor_count():
    """Get current visitor count"""
    result = await db.visitors.find_one({"type": "counter"})
    if not result:
        # Initialize counter if doesn't exist
        await db.visitors.insert_one({"type": "counter", "count": 0})
        return VisitorCount(count=0)
    return VisitorCount(count=result.get("count", 0))

@api_router.post("/visitor-count")
async def increment_visitor_count():
    """Increment visitor count"""
    result = await db.visitors.find_one({"type": "counter"})
    if not result:
        await db.visitors.insert_one({"type": "counter", "count": 1})
        return {"count": 1}
    
    new_count = result.get("count", 0) + 1
    await db.visitors.update_one(
        {"type": "counter"},
        {"$set": {"count": new_count}}
    )
    return {"count": new_count}

# Voting System Endpoints
@api_router.get("/votes", response_model=VoteData)
async def get_votes():
    """Get current vote counts"""
    result = await db.votes.find_one({"type": "dpo_votes"})
    if not result:
        # Initialize votes if doesn't exist
        await db.votes.insert_one({
            "type": "dpo_votes",
            "valid_votes": 0,
            "invalid_votes": 0,
            "total_votes": 0
        })
        return VoteData(valid_votes=0, invalid_votes=0, total_votes=0)
    
    return VoteData(
        valid_votes=result.get("valid_votes", 0),
        invalid_votes=result.get("invalid_votes", 0),
        total_votes=result.get("total_votes", 0)
    )

@api_router.post("/vote")
async def submit_vote(vote_type: str):
    """Submit a vote (valid or invalid)"""
    if vote_type not in ["valid", "invalid"]:
        return {"error": "Vote type must be 'valid' or 'invalid'"}, 400
    
    result = await db.votes.find_one({"type": "dpo_votes"})
    
    if not result:
        # Initialize if doesn't exist
        valid_votes = 1 if vote_type == "valid" else 0
        invalid_votes = 1 if vote_type == "invalid" else 0
        await db.votes.insert_one({
            "type": "dpo_votes",
            "valid_votes": valid_votes,
            "invalid_votes": invalid_votes,
            "total_votes": 1
        })
        return {
            "valid_votes": valid_votes,
            "invalid_votes": invalid_votes,
            "total_votes": 1
        }
    
    # Update votes
    valid_votes = result.get("valid_votes", 0)
    invalid_votes = result.get("invalid_votes", 0)
    total_votes = result.get("total_votes", 0)
    
    if vote_type == "valid":
        valid_votes += 1
    else:
        invalid_votes += 1
    total_votes += 1
    
    await db.votes.update_one(
        {"type": "dpo_votes"},
        {"$set": {
            "valid_votes": valid_votes,
            "invalid_votes": invalid_votes,
            "total_votes": total_votes
        }}
    )
    
    return {
        "valid_votes": valid_votes,
        "invalid_votes": invalid_votes,
        "total_votes": total_votes
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()