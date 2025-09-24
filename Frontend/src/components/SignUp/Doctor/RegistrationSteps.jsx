export const formSteps = [
    {
        title: "Step 1: Personal Information",
        description: "Provide your basic personal details to create your profile and verify your identity.",
        fields: ["first_name", "middle_name", "last_name", "date_of_birth", "gender", "national_id_or_passport", "email", "phone"],
    },
    {
        title: "Step 2: Contact Information",
        description: "Enter your residential and communication details for official correspondence.",
        fields: ["street_address", "street_address_2", "city", "region", "zip", "country"],
    },
    {
        title: "Step 3: Professional Details",
        description: "Share your medical license, specialty, and workplace details to verify your professional credentials.",
        fields: ["medical_license_number", "specialty", "years_of_experience", "current_workplace", "designation"],
    },
    {
        title: "Step 4: Education & Certifications",
        description: "Provide your educational background and upload necessary certifications.",
        fields: ["medical_school", "graduation_year", "postgraduate_qualifications", "board_certifications", "degree_certificate_upload", "license_certificate_upload", "additional_certifications_upload"],
    },
    {
        title: "Step 5: Account Security",
        description: "Set up your account login credentials to securely access the system.",
        fields: ["username", "password", "confirm_password", "recovery_email"],
    },
    {
        title: "Step 6: Optional Information",
        description: "Add extra details to make your profile more complete and accessible.",
        fields: ["languages_spoken", "availability", "linkedin_profile", "short_bio"],
    },
];
