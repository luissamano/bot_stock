from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, declarative_base
import os

db_pass = os.getenv('DB_PASS')
db_host = os.getenv('DB_HOST')

# Define the database URL for PostgreSQL
SQLALCHEMY_DATABASE_URL = f'postgresql://postgres:{db_pass}@{db_host}/stocks'

# Create a SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for the declarative class definitions
Base = declarative_base()

def get_db():
    """
    Dependency that provides a database session to route handlers.

    Yields:
        Session: A SQLAlchemy session object.

    Closes the session after the request is completed, ensuring that
    database connections are properly managed and released.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
