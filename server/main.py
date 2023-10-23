from fastapi import FastAPI, HTTPException
from starlette.responses import StreamingResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
from pydantic import BaseModel
import json


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    with open("db.json", "r") as file:
        db = json.load(file)
except FileNotFoundError:
    db = []

class BottleItem(BaseModel):
    bottle_number: int
    date: str
    time: str
    
@app.post("/store/")
def store_bottle_data(item: BottleItem):
    item.bottle_number = db.__len__()+1
    print(item)
    db.append(item.dict())
    
    with open('db.json', 'w') as file:
        json.dump(db, file, indent=4)
    

    return {"message": "Data stored successfully"}

@app.get("/get_all")
def get_all_bottle_data():
    return db

@app.get("/get_count")
def get_all_bottle_data():
    return db.__len__()

