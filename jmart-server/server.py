from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Boolean, asc, desc
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from typing import List, Optional

DATABASE_URL = "postgresql://localhost:5432/postgres"

Base = declarative_base()

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Goods(Base):
    __tablename__ = "goods"
    id = Column(Integer, primary_key=True, index=True)
    imageUrl = Column("imageurl", String)
    name = Column(String, index=True)
    price = Column(Integer)
    description = Column(String)
    stock = Column(Integer)
    discountRate = Column("discountrate",Integer)
    discountPrice = Column("discountprice",Integer)
    is_liked = Column(Boolean)
    isInBasket = Column("isinbasket",Boolean)

class GoodsCreate(BaseModel):
    imageUrl: str
    name: str
    price: int
    description: str
    stock: int
    discountRate: int
    discountPrice: int
    is_liked: bool
    isInBasket: bool

class GoodsResponse(GoodsCreate):
    id: int

class GoodsListResponse(BaseModel):
    goods: List[GoodsResponse]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/goods/", response_model=GoodsResponse)
def create_goods(goods: GoodsCreate, db: Session = Depends(get_db)):
    db_goods = Goods(**goods.dict())
    db.add(db_goods)
    db.commit()
    db.refresh(db_goods)
    return db_goods

@app.get("/goods/{goods_id}", response_model=GoodsResponse)
def read_goods(goods_id: int, db: Session = Depends(get_db)):
    db_goods = db.query(Goods).filter(Goods.id == goods_id).first()
    if db_goods is None:
        raise HTTPException(status_code=404, detail="Goods not found")
    return db_goods

@app.get("/goods/", response_model=GoodsListResponse)
def read_all_goods(search: str = "", skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    goods = db.query(Goods).order_by(asc(Goods.id))
    
    if search:
        goods = goods.filter(Goods.name.contains(search))

    return {"goods": goods.offset(skip).limit(limit).all()}

@app.put("/goods/{goods_id}", response_model=GoodsResponse)
def update_goods(goods_id: int, goods: GoodsCreate, db: Session = Depends(get_db)):
    db_goods = db.query(Goods).filter(Goods.id == goods_id).first()
    if db_goods is None:
        raise HTTPException(status_code=404, detail="Goods not found")
    for key, value in goods.dict().items():
        setattr(db_goods, key, value)
    db.commit()
    db.refresh(db_goods)
    return db_goods

@app.delete("/goods/{goods_id}", response_model=GoodsResponse)
def delete_goods(goods_id: int, db: Session = Depends(get_db)):
    db_goods = db.query(Goods).filter(Goods.id == goods_id).first()
    if db_goods is None:
        raise HTTPException(status_code=404, detail="Goods not found")
    db.delete(db_goods)
    db.commit()
    return db_goods

@app.get("/goods/in-basket/", response_model=GoodsListResponse)
def read_goods_in_basket(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    goods_in_basket = db.query(Goods).filter(Goods.isInBasket == True).offset(skip).limit(limit).all()
    return {"goods": goods_in_basket}

@app.patch("/goods/{goods_id}/toggle-basket", response_model=GoodsResponse)
def toggle_goods_in_basket(goods_id: int, db: Session = Depends(get_db)):
    db_goods = db.query(Goods).filter(Goods.id == goods_id).first()
    if db_goods is None:
        raise HTTPException(status_code=404, detail="Goods not found")
    db_goods.isInBasket = not db_goods.isInBasket
    db.commit()
    db.refresh(db_goods)
    return db_goods

@app.get("/goods/liked/", response_model=GoodsListResponse)
def read_liked_goods(db: Session = Depends(get_db)):
    goods = db.query(Goods).filter(Goods.is_liked == True).all()
    return {"goods": goods}

@app.patch("/goods/{goods_id}/toggle-liked", response_model=GoodsResponse)
def toggle_goods_liked(goods_id: int, db: Session = Depends(get_db)):
    db_goods = db.query(Goods).filter(Goods.id == goods_id).first()
    if db_goods is None:
        raise HTTPException(status_code=404, detail="Goods not found")

    db_goods.is_liked = not db_goods.is_liked
    db.commit()
    db.refresh(db_goods)
    return db_goods



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
