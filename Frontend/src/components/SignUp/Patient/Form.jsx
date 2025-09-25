import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {ChevronRightIcon, ChevronLeftIcon} from "@heroicons/react/24/solid";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import validator from "validator";
import {getNames} from "country-list";


import {formSteps} from "./RegistrationFormSteps.jsx";
import {initialFormData} from "../../../utils/formData.jsx";
import {labels} from "../../../utils/InputLabels.jsx"

const allCountries = getNames()

const selectFields = {
    gender: ["Male", "Female", "Other"],
    marital_status: ["Single", "Married", "Divorced", "Widowed"],
    blood_type: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    country: allCountries
};

function Form() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate()

    const totalSteps = formSteps.length;
    const currentStep = formSteps[step];
    const progressPercentage = ((step + 1) / totalSteps) * 100;

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Clear error on change
        setErrors(prev => ({
            ...prev,
            [name]: null,
        }));
    };

    const validateStep = () => {
        const newErrors = {};

        currentStep.fields.forEach(field => {
            const value = formData[field];

            // Required field check
            if (!value || (typeof value === "string" && value.trim() === "")) {
                newErrors[field] = `${labels[field] || field} is required`;
                return;
            }

            // Specific validations
            if (field === "email") {
                if (!validator.isEmail(value)) {
                    newErrors[field] = "Please enter a valid email address";
                }
            }

            if (field === "password") {
                // Password strength: min 8 chars, at least one uppercase, one lowercase, one special char
                const pwd = value;
                const minLength = 8;
                const hasUpper = /[A-Z]/.test(pwd);
                const hasLower = /[a-z]/.test(pwd);
                const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
                if (pwd.length < minLength || !hasUpper || !hasLower || !hasSpecial) {
                    newErrors[field] = (
                        <>
                            <p>Password must:</p>
                            <ul className="pl-1.5">
                                <li>• Be at least 8 characters long</li>
                                <li>• Contain at least one uppercase letter (A–Z)</li>
                                <li>• Contain at least one lowercase letter (a–z)</li>
                                <li>• Contain at least one number (0–9)</li>
                                <li>• Contain at least one special character (!, @, #, $, %, etc.)</li>
                            </ul>
                        </>
                    );
                }
            }

            if (field === "confirm_password") {
                if (value !== formData.password) {
                    newErrors[field] = "Passwords do not match";
                }
            }

            if (field === "phone") {
                // Ensure only digits (after country code), and maybe minimum length
                if (!/^\d+$/.test(value)) {
                    newErrors[field] = "Phone number must contain only digits";
                }
                if (value.length < 7) {
                    newErrors[field] = "Phone number is too short";
                }
            }
        });

        setErrors(newErrors);
        // Return whether valid
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateStep()) {
            return; // do not proceed if validation fails
        }

        if (step < totalSteps - 1) {
            setStep(step + 1);
        } else {
            // Final submission
            fetch("http://localhost:3000/user", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            })
                .then(res => res.json())
                .then(data => {
                    navigate('/registration-complete')
                    console.log("Submitted data:", data);
                })
                .catch(err => {
                    console.error("Submission error:", err);
                    navigate('/registration-failed')
                });
        }
    };

    return (
        <div
            className="relative w-4/5 xs:w-full sm:w-full md:w-full lg:w-[95%] mx-auto my-12 xs:my-7 sm:my-9 font-dmsans px-4 xs:px-1 sm:px-3">
            <div className="">
                <h1 className="text-center text-[30px] xs:text-[24px] sm:text-[28px] text-customTealBlue font-extrabold mb-12 xs:mb-8 sm:mb-10">
                    Create Your Account
                </h1>
                {/* Progress Bar */}
                <div
                    className="relative h-10 mb-8 xs:mb-5 sm:mb-6 xs:w-[95%] xs:transform xs:-translate-x-1/2 xs:left-1/2">
                    <div
                        className="absolute top-1/2 left-0 right-0 h-2 xs:h-[6px] bg-gray-200 rounded-full transform -translate-y-1/2"/>
                    <div
                        className="absolute top-1/2 left-0 h-2 xs:h-[6px] bg-customTealBlue rounded-full transform -translate-y-1/2 transition-all duration-300"
                        style={{width: `${progressPercentage}%`, zIndex: 1}}
                    />
                    {formSteps.map((_, index) => {
                        const isActive = index <= step;
                        const spacing = (index / (totalSteps - 1)) * 100;
                        return (
                            <div
                                key={index}
                                className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                                style={{left: `${spacing}%`}}
                            >
                                <div
                                    className={`w-6 h-6 xs:w-5 xs:h-5 xs:text-[12px] rounded-full text-white text-sm font-bold flex items-center justify-center ${
                                        isActive ? "bg-customTealBlue" : "bg-gray-300"
                                    }`}
                                >
                                    {index + 1}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* Step Title and Description */}
                <h2 className="text-customTealBlue text-[24px] xs:text-[20px] text-center font-semibold mb-2">
                    {currentStep.title}
                </h2>
                <p className="text-gray-600 text-center text-sm mb-9">
                    {currentStep.description}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-3">
                <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 gap-4">
                    {currentStep.fields.map((field) => {
                        const value = formData[field] || "";
                        const label = labels[field] || field;
                        const errorMsg = errors[field];

                        const isDate = field === "date_of_birth";
                        const isPassword = field === "password";
                        const isConfirmPassword = field === "confirm_password";
                        const isEmail = field === "email";
                        const isNumber = field === "zip" || field === "group_number";
                        const isPhone = field === "phone" || field === "contact";

                        // Placeholder suggestions
                        let placeholder = "";
                        if (isEmail) placeholder = "you@example.com";
                        else if (isPassword) placeholder = "Enter a strong password";
                        else if (isConfirmPassword) placeholder = "Re-enter password";
                        else if (isDate) placeholder = "Select your date of birth";
                        else if (isPhone) placeholder = "Enter phone number";
                        else if (isNumber) placeholder = "Enter number";
                        else placeholder = `Enter ${label}`;

                        // Choose input type
                        let inputType = "text";

                        if (isEmail) {
                            inputType = "email";
                        } else if (isDate) {
                            inputType = "date";
                        } else if (isPassword) {
                            inputType = showPassword ? "text" : "password";
                        }
                        else if(isConfirmPassword){
                            inputType = showConfirmPassword ? "text" : "password";
                        }
                        else if (isNumber) {
                            inputType = "number";
                        }

                        if (field in selectFields) {
                            // selectFields is from your existing code
                            return (
                                <div key={field} className="flex flex-col">
                                    <label
                                        className="mb-2.5 text-[#282938] font-normal text-[19px] xs:text-sm sm:text-sm block">
                                        {label}
                                    </label>
                                    <select
                                        name={field}
                                        required
                                        value={value}
                                        onChange={e => handleChange(field, e.target.value)}
                                        className="bg-transparent p-4 text-[1rem] text-[#282938] border border-customTealBlue outline-none rounded-[6px] w-full"
                                    >
                                        <option value=""> Select {label} </option>
                                        {selectFields[field].map((option) => (
                                            <option key={option} value={option.toLowerCase()}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    {errorMsg && <span className="text-red-600 text-sm mt-1">{errorMsg}</span>}
                                </div>
                            );
                        }

                        if (isPhone) {
                            // Use phone input component
                            return (
                                <div key={field} className="flex flex-col">
                                    <label
                                        className="mb-2.5 text-[#282938] font-normal text-[19px] xs:text-sm sm:text-sm block">
                                        {label}
                                    </label>
                                    <PhoneInput
                                        country={"ke"}
                                        value={value}
                                        onChange={phone => handleChange(field, phone)}
                                        placeholder={placeholder}
                                        inputProps={{
                                            name: field,
                                            required: true,
                                        }}
                                        inputClass="!bg-transparent !text-[#282938] !text-[1rem] !border !border-customTealBlue !rounded-[6px] !w-full !py-6 !px-10 focus:!outline-none"
                                        buttonClass="!border-none !bg-transparent"
                                        containerClass="!w-full"
                                    />
                                    {errorMsg && <span className="text-red-600 text-sm mt-1">{errorMsg}</span>}
                                </div>
                            );
                        }


                        return (
                            <div key={field} className="flex flex-col">
                                <label
                                    className="mb-2.5 text-[#282938] font-normal text-[19px] xs:text-sm sm:text-sm block">
                                    {label}
                                </label>
                                <div className="relative">
                                    <input
                                        name={field}
                                        type={inputType}
                                        placeholder={placeholder}
                                        value={value}
                                        required
                                        onChange={e => handleChange(field, e.target.value)}
                                        className="bg-transparent p-3 text-[1rem] text-[#282938] border border-customTealBlue outline-none rounded-[6px] w-full"
                                    />
                                    {(isPassword || isConfirmPassword) && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (isPassword) setShowPassword(prev => !prev);
                                                if (isConfirmPassword) setShowConfirmPassword(prev => !prev);
                                            }}
                                            className="absolute inset-y-0 right-3 flex items-center"
                                        >
                                            {(isPassword && showPassword) || (isConfirmPassword && showConfirmPassword)
                                                ? "Hide"
                                                : "Show"
                                            }
                                        </button>
                                    )}
                                </div>
                                {errorMsg && <span className="text-red-600 text-sm mt-1">{errorMsg}</span>}
                            </div>
                        );
                    })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex xs:flex-col sm:flex-col flex-row-reverse justify-between mt-6">
                    <div className="flex gap-4 xs:gap-0 xs:flex-col-reverse sm:flex-col-reverse">
                        {step > 0 && (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="xs:w-full xs:justify-center sm:w-full sm:justify-center xs:mb-1 sm:mb-1 flex items-center gap-2 bg-transparent text-customTealBlue px-4 py-2 rounded border border-customTealBlue"
                            >
                                <ChevronLeftIcon className="h-5 w-5"/>
                                Previous Step
                            </button>
                        )}
                        <button
                            type="submit"
                            className="xs:w-full xs:justify-center sm:w-full sm:justify-center xs:mb-2.5 sm:mb-2.5 flex items-center gap-2 bg-customTealBlue text-white px-4 py-2 rounded hover:bg-opacity-90"
                        >
                            {step < totalSteps - 1 ? (
                                <>
                                    Next Step <ChevronRightIcon className="h-5 w-5"/>
                                </>
                            ) : (
                                <>
                                    Submit <CheckCircleIcon className="h-5 w-5"/>
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default Form;
