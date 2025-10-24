// Doctor data
export const initialFormData = {
    // Step 0: Role
    role: localStorage.getItem("selectedRole") || "",

    // Step 1: Personal Information
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    national_id_or_passport: "",
    email: "",
    phone: "",

    // Step 2: Contact Information
    street_address: "",
    street_address_2: "",
    city: "",
    region: "",
    zip: "",
    country: "",

    // Step 3: Professional Details
    medical_license_number: "",
    specialty: "",
    years_of_experience: "",
    current_workplace: "",

    // Step 4: Education & Certifications
    medical_school: "",
    graduation_year: "",
    level_of_education: "",
    degree_certificate_upload: "",
    license_certificate_upload: "",
    additional_certifications_upload: "",

    // Step 5: Account Security
    username: "",
    password: "",
    confirm_password: "",
    recovery_email: "",

};


export const specialty = [
    "Anesthesiology",
    "Cardiology",
    "Dentistry",
    "Dermatology",
    "Emergency Medicine",
    "Endocrinology",
    "Family Medicine",
    "Gastroenterology",
    "General Surgery",
    "Geriatrics",
    "Gynecology",
    "Hematology",
    "Infectious Disease",
    "Internal Medicine",
    "Nephrology",
    "Neurology",
    "Neurosurgery",
    "Nurse",
    "Obstetrics",
    "Oncology",
    "Ophthalmology",
    "Optical",
    "Orthopedics",
    "Otolaryngology (ENT)",
    "Pathology",
    "Pediatrics",
    "Pharmacy",
    "Physical Medicine & Rehabilitation",
    "Plastic Surgery",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Surgery",
    "Urology"
]
