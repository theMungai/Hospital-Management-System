import enum

class RoleEnum(str, enum.Enum):
    doctor = "doctor"
    patient = "patient"
    admin = "admin"