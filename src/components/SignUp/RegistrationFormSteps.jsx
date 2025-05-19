export const formSteps = [
    {
        title: "Step 1: Personal Info",
        description:
            "Please enter your name, email, and password to get started.",
        fields: ["First Name","Last Name", "email", "phone", "password", "confirm_password", "date_of_birth", "gender", "marital_status"],
    },
    {
        title: "Step 2: Contact Information",
        description: "Provide your address information so we can contact you.",
        fields: ["street_address", "street_address_2","city", "region","zip","country"],
    },
    {
        title: "Step 3: Medical Information",
        description: "Tell us more about your job so we can personalize your experience.",
        fields: ["blood_type", "any_medication", "additional_notes", "family_doctor_name"],
    },
    {
        title: "Step 4: Emergency Contact",
        description: "Tell us more about your job so we can personalize your experience.",
        fields: ["first_name", "last_name", "relationship", "contact"],
    },
    {
        title: "Step 5: Insurance & Billing Info",
        description: "Tell us more about your job so we can personalize your experience.",
        fields: ["insurance_provider", "insurance_ID", "policyholder_name ", "group_number"],
    }
]


