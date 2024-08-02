from pydantic import BaseModel
from datetime import datetime

class StockBase(BaseModel):
    """
    Base schema for stock data.

    Attributes:
        date (str): The date and time of the stock data.
        symbol (str): The stock symbol.
        exchange (str): The stock exchange where the stock is traded.
        open (float): The opening price of the stock.
        high (float): The highest price of the stock during the trading period.
        low (float): The lowest price of the stock during the trading period.
        close (float): The closing price of the stock.
        last (float): The last traded price of the stock.
        volume (int): The volume of stock traded.
    """
    date: str
    symbol: str
    exchange: str
    open: float
    high: float
    low: float
    close: float
    last: float
    volume: int

    class Config:
        """
        Pydantic configuration for the StockBase schema.
        """
        orm_mode = True

class StockRequest(StockBase):
    """
    Schema for creating a new stock record, inheriting from StockBase.
    """
    class Config:
        """
        Pydantic configuration for the StockRequest schema.
        """
        orm_mode = True

class StockResponse(StockBase):
    """
    Schema for returning stock data in responses, inheriting from StockBase.

    Attributes:
        id (int): The unique identifier of the stock record.
    """
    id: int

    class Config:
        """
        Pydantic configuration for the StockResponse schema.
        """
        orm_mode = True
