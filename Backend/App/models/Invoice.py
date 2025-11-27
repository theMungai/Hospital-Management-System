from sqlalchemy import Column, Integer

from  ..database.database import Base

class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True)