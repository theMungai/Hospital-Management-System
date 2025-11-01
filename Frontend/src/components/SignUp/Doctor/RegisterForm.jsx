// Doctor registration
import React, {useState} from 'react';
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";
import {ChevronRightIcon, ChevronLeftIcon} from "@heroicons/react/24/solid";
import {CheckCircleIcon, CloudArrowUpIcon} from "@heroicons/react/24/outline";
import validator from "validator";
import {getNames} from "country-list";
import {useNavigate} from "react-router-dom";

import {initialFormData} from "../../../utils/DoctorData.jsx";
import {labels} from "../../../utils/DoctorInputLabels.jsx"
import {formSteps} from "./RegistrationSteps.jsx";
import {specialty} from "../../../utils/DoctorData.jsx";



const allCountries = getNames()

const selectFields = {
    specialty: specialty,
    years_of_experience: ["Less than 5 years", "5 years to 9 years", "10 years to 14 years", "15 years to 19 years", "Above 20 years"],
    country: allCountries,
    gender: ["Male", "Female", "Other"],
    level_of_education : ["Upper Secondary Education", "Vocational/Technical Training","Certificate",
        "Diploma", "Undergraduate (Bachelor’s Degree)", "Postgraduate (Master’s Degree)", "Doctoral Degree (PhD)"]

};

function RegisterForm() {
    // useStates
    const [step, setStep] = useState(0)
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const navigate = useNavigate()
    const totalSteps = formSteps.length
    const currentStep = formSteps[step]
    const progressPercentage = ((step + 1) / totalSteps * 100)


    function handleChange(name, value) {
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))

        setErrors(prev => ({
            ...prev,
            [name]: null
        }))

    }

    function validateStep() {
        const newErrors = {}

        currentStep.fields.forEach(field => {
            const value = formData[field]

            if (!value || (typeof value === "string" && value.trim() === "")) {
                newErrors[field] = `${labels[field] || field} is required.`;
                return;
            }

            if (field === "email") {
                if (!validator.isEmail(value)) {
                    newErrors[field] = "Please enter a valid email address"
                }
            }

            if (field === "password") {
                const pwd = value
                const minLength = 8
                const hasUpper = /[A-Z]/.test(pwd)
                const hasLower = /[a-z]/.test(pwd)
                const hasSpecial = /[^A-Za-z0-9]/.test(pwd)

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
                    newErrors[field] = "Password do not match"
                }

            }

            if (field === "phone") {
                if (!/^\d+$/.test(value)) {
                    newErrors[field] = "Phone number must contain only digits"
                }

                if (value.length < 7) {
                    newErrors[field] = "Phone number is too short"
                }
            }

        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0

    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validateStep()) return;

        if (step < totalSteps - 1) {
            setStep(step + 1);
        } else {
            const data = new FormData();

            for (const key in formData) {
                data.append(key, formData[key]);
            }

            fetch("http://127.0.0.1:8000/doctors", {
                method: "POST",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    console.log("Submitted data:", data);
                    navigate('/registration-complete')
                })
                .catch(err => {
                    navigate('/registration-failed')
                });
        }
    }


    return (
            <div
                className="relative w-4/5 xs:w-full sm:w-full md:w-full lg:w-[95%] mx-auto my-12 xs:my-7 sm:my-9 font-dmsans px-4 xs:px-1 sm:px-3">
                <div className="">
                    <h1 className="text-center text-[30px] xs:text-[24px] sm:text-[28px] text-customTealBlue font-extrabold mb-12 xs:mb-8 sm:mb-10">
                        Medical Practitioner Registration
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
                            const isEmail = field === "email" || field === "recovery_email";
                            const isNumber = field === "zip" || field === "graduation_year";
                            const isPhone = field === "phone" || field === "contact";
                            const isFile = field.endsWith("_upload");


                            // Placeholder suggestions
                            let placeholder = "";
                            if (isEmail) placeholder = "you@example.com";
                            else if (isPassword) placeholder = "Enter a strong password";
                            else if (isConfirmPassword) placeholder = "Re-enter password";
                            else if (isDate) placeholder = "Select your date of birth";
                            else if (isPhone) placeholder = "Enter phone number";
                            else if (isNumber) placeholder = `Enter ${label}`;
                            else placeholder = `Enter ${label}`;

                            // Choose input type
                            let inputType = "text";

                            if (isEmail) {
                                inputType = "email";
                            } else if (isDate) {
                                inputType = "date";
                            } else if (isPassword) {
                                inputType = showPassword ? "text" : "password";
                            } else if (isConfirmPassword) {
                                inputType = showConfirmPassword ? "text" : "password";
                            } else if (isNumber) {
                                inputType = "number";
                            }

                            if (field in selectFields) {
                                return (
                                    <div key={field} className="flex flex-col">
                                        <label
                                            className="mb-2.5 text-[#4D4F7C] font-normal text-[19px] xs:text-sm sm:text-sm block">
                                            {label}
                                        </label>
                                        <select
                                            name={field}
                                            value={value}
                                            onChange={e => handleChange(field, e.target.value)}
                                            className="bg-transparent p-4 text-[1rem] text-[#4D4F7C] border border-customTealBlue outline-none rounded-[6px] w-full"
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
                                            className="mb-2.5 text-[#4D4F7C] font-normal text-[19px] xs:text-sm sm:text-sm block">
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
                                            inputClass="!bg-transparent !text-[#4D4F7C] !text-[1rem] !border !border-customTealBlue !rounded-[6px] !w-full !py-6 !px-10 focus:!outline-none"
                                            buttonClass="!border-none !bg-transparent"
                                            containerClass="!w-full"
                                        />
                                        {errorMsg && <span className="text-red-600 text-sm mt-1">{errorMsg}</span>}
                                    </div>
                                );
                            }

                            if (isFile) {
                                // Value is a File object, use its name for display
                                const fileName = value instanceof File ? value.name : 'No file selected';

                                return (
                                    <div key={field} className="flex flex-col">
                                        <label
                                            className="mb-2.5 text-[#4D4F7C] font-normal text-[19px] xs:text-sm sm:text-sm block">
                                            {label}
                                        </label>

                                        {/* Hidden File Input */}
                                        <input
                                            id={field}
                                            name={field}
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={e => handleChange(field, e.target.files[0])}
                                            className="hidden"
                                        />

                                        {/* Custom Upload Button */}
                                        <label
                                            htmlFor={field}
                                            className="flex flex-col items-center justify-center gap-2 cursor-pointer
               border-2 border-dashed border-customTealBlue rounded-lg
               p-6 text-center text-gray-600 hover:bg-gray-50 transition"
                                        >
                                            <CloudArrowUpIcon className="h-10 w-10 text-customTealBlue"/>
                                            <span
                                                className="text-sm text-gray-500">Click to upload (PDF, JPG, PNG)</span>
                                        </label>

                                        {/* Show Selected File */}
                                        <span className="text-gray-500 text-sm mt-2 flex items-center">
                                            {value instanceof File ? (
                                                <><CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />Selected: {fileName}</>
                                            ) : (
                                                fileName
                                            )}
                                        </span>

                                        {errorMsg && <span className="text-red-600 text-sm mt-1">{errorMsg}</span>}
                                    </div>
                                );
                            }


                            return (
                                <div key={field} className="flex flex-col">
                                    <label
                                        className="mb-2.5 text-[#4D4F7C] font-normal text-[19px] xs:text-sm sm:text-sm block">
                                        {label}
                                    </label>
                                    <div className="relative">
                                        <input
                                            name={field}
                                            type={inputType}
                                            placeholder={placeholder}
                                            value={value}
                                            onChange={e => handleChange(field, e.target.value)}
                                            className="bg-transparent p-3 text-[1rem] text-[#4D4F7C] border border-customTealBlue outline-none rounded-[6px] w-full"
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

export default RegisterForm;