from fastapi import FastAPI, Depends, status, HTTPException # type: ignore
from typing import List
from db.database import engine, get_db
from stock import stock_model
from stock.stock_schema import StockRequest, StockResponse
from stock.stock_model import Stock
from sqlalchemy.orm import Session # type: ignore
from datetime import datetime
from starlette.middleware.cors import CORSMiddleware # type: ignore
from utils.utils import iso8601_to_iso9075
from sqlalchemy.exc import SQLAlchemyError # type: ignore
from pydantic import ValidationError # type: ignore
import httpx # type: ignore
from datetime import datetime


import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

base_url = "https://api.marketstack.com/v1/intraday"
api_key = os.getenv('API_KEY')

# Create all tables in the database
stock_model.Base.metadata.create_all(bind=engine)
@app.get('/')
def index():
    """
    Root endpoint that returns a simple message indicating that the server is alive,
    along with the current server time.
    Returns:
        dict: A dictionary containing the server status message and current time.
    """
    return {'message': 'Running server', 'time': datetime.now()};
                

@app.get('/stocks')
def get_all_stocks(db: Session = Depends(get_db)):
    try:
        all_stocks = db.query(Stock).all()
        
        response_data = []
        for stock in all_stocks:
            try:
                stock_data = {
                    "id": stock.id,
                    "date": stock.date.isoformat(),  # Convierte datetime a cadena ISO 8601
                    "symbol": stock.symbol,
                    "exchange": stock.exchange,
                    "open": float(stock.open),
                    "high": float(stock.high),
                    "low": float(stock.low),
                    "close": float(stock.close),
                    "last": float(stock.last),
                    "volume": int(stock.volume)
                }
                
                # Validar datos contra el esquema StockResponse
                StockResponse(**stock_data)  # Lanzará ValidationError si es inválido
                response_data.append(stock_data)
            except ValidationError as ve:
                raise HTTPException(status_code=500, detail=f"Data validation error: {ve}")
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

        return response_data

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

@app.post('/fetch_and_create_stock')
async def fetch_and_create_stock(symbol: str, db: Session = Depends(get_db)):
    try:
        external_api_url = f"{base_url}?access_key={api_key}&symbols={symbol.upper()}&limit=1"
        async with httpx.AsyncClient() as client:
            response = await client.get(external_api_url)
            response.raise_for_status()
            stock_data = response.json()

        stock_info = stock_data['data'][0]
        stock_request = StockRequest(
            date=stock_info['date'],  # Asegúrate de que esta fecha sea una cadena en formato ISO
            symbol=stock_info['symbol'],
            exchange=stock_info['exchange'],
            open=stock_info['open'],
            high=stock_info['high'],
            low=stock_info['low'],
            close=stock_info['close'],
            last=stock_info['last'],
            volume=stock_info['volume']
        )

        new_stock = Stock(
            date=stock_request.date,
            symbol=stock_request.symbol,
            exchange=stock_request.exchange,
            open=stock_request.open,
            high=stock_request.high,
            low=stock_request.low,
            close=stock_request.close,
            last=stock_request.last,
            volume=stock_request.volume
        )
        db.add(new_stock)
        db.commit()
        db.refresh(new_stock)

        stock_response_data = {
            "id": new_stock.id,
            "date": new_stock.date,
            "symbol": new_stock.symbol,
            "exchange": new_stock.exchange,
            "open": float(new_stock.open),
            "high": float(new_stock.high),
            "low": float(new_stock.low),
            "close": float(new_stock.close),
            "last": float(new_stock.last),
            "volume": int(new_stock.volume)
        }
        return stock_response_data

    except httpx.HTTPStatusError as http_err:
        raise HTTPException(status_code=http_err.response.status_code, detail=str(http_err))
    except ValidationError as ve:
        raise HTTPException(status_code=400, detail=f"Data validation error: {ve}")
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")