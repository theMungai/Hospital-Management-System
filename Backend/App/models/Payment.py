from sqlalchemy import Column, Integer

from ..database.database import Base

class Payment(Base):
    __tablename__ = "payments"

    id =  Column(Integer, primary_key=True)