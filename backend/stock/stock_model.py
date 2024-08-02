from db.database import Base
from sqlalchemy import Column, Integer, String, DateTime, Numeric, BigInteger

class Stock(Base):
    """
    Database model for storing stock data.

    Attributes:
        id (int): Primary key, auto-incrementing.
        date (str): The date and time of the stock data.
        symbol (str): The stock symbol.
        exchange (str): The stock exchange where the stock is traded.
        open (numeric): The opening price of the stock.
        high (numeric): The highest price of the stock during the trading period.
        low (numeric): The lowest price of the stock during the trading period.
        close (numeric): The closing price of the stock.
        last (numeric): The last traded price of the stock.
        volume (bigint): The volume of stock traded.
    """
    __tablename__ = "stock_data"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    date = Column(String, nullable=False)
    symbol = Column(String, nullable=False)
    exchange = Column(String, nullable=False)
    open = Column(Numeric, nullable=False)
    high = Column(Numeric, nullable=False)
    low = Column(Numeric, nullable=False)
    close = Column(Numeric, nullable=False)
    last = Column(Numeric, nullable=False)
    volume = Column(BigInteger, nullable=False)
