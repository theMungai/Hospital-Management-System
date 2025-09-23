export const formSteps = [
    {
        title: "Step 1: Personal Info",
        description: "Provide your basic personal details to create your account and verify your identity.",
        fields: ["First Name","Last Name", "email", "phone", "password", "confirm_password", "date_of_birth", "gender", "marital_status"],
    },
    {
        title: "Step 2: Contact Information",
        description: "Enter your complete residential address for official communications and service delivery.",
        fields: ["street_address", "street_address_2","city", "region","zip","country"],
    },
    {
        title: "Step 3: Medical Information",
        description: "Share your essential health details to help us provide better medical care and services.",
        fields: ["blood_type", "any_medication", "additional_notes", "family_doctor_name"],
    },
    {
        title: "Step 4: Emergency Contact",
        description: "Provide contact information for someone we should notify in case of emergencies.",
        fields: ["first_name", "last_name", "relationship", "contact"],
    },
    {
        title: "Step 5: Insurance & Billing Info",
        description: "Enter your health insurance details for billing and claim processing purposes.",
        fields: ["insurance_provider", "insurance_ID", "policyholder_name", "group_number"],
    }
]