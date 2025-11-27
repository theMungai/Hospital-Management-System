from  sqlalchemy import Integer, Column

from ..database.database import Base

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True)