import React, { useState } from "react";
import { formSteps } from "./RegistrationFormSteps.jsx";
import { Link } from "react-router-dom";
import {labels} from "/src/utils/InputLabels.jsx";
import {initialFormData} from "../../utils/formData.jsx";
import {ChevronRightIcon, ChevronLeftIcon , } from '@heroicons/react/24/solid';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const selectFields = {
    gender: ["Male", "Female", "Other"],
    marital_status: ["Single", "Married", "Divorced", "Widowed"],
    blood_type: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    country: ["United States", "Canada", "United Kingdom", "India", "Australia"],
};

function Form() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false)

    const currentStep = formSteps[step];
    const totalSteps = formSteps.length;
    const progressPercentage = ((step + 1) / totalSteps) * 100;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step < formSteps.length - 1) {
            setStep(step + 1);
        } else {
            // Final submission
            fetch("http://localhost:3000/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert("Registration successful!");
                    console.log("Submitted data:", data);
                })
                .catch((err) => console.error("Submission error:", err));
        }
    };

    return (
        <div className="relative w-4/5 xs:w-full sm:w-full md:w-full lg:w-[95%] mx-auto my-12 xs:my-7 sm:my-9 font-dmsans px-4 xs:px-1 sm:px-3">
            <div className="">
                <h1 className="text-center text-[30px] xs:text-[24px] sm:text-[28px] text-customTealBlue font-extrabold mb-12 xs:mb-8 sm:mb-10">Create Your Account</h1>
                {/* Progress Bar */}
                <div className="relative h-10 mb-8 xs:mb-5 sm:mb-6 xs:w-[95%] xs:transform xs:-translate-x-1/2 xs:left-1/2">
                    <div className="absolute top-1/2 left-0 right-0 h-2 xs:h-[6px] bg-gray-200 rounded-full transform -translate-y-1/2 " />
                    <div
                        className="absolute top-1/2 left-0 h-2 xs:h-[6px] bg-customTealBlue rounded-full transform -translate-y-1/2 transition-all duration-300"
                        style={{ width: `${progressPercentage}%`, zIndex: 1 }}
                    />
                    {formSteps.map((_, index) => {
                        const isActive = index <= step;
                        const spacing = (index / (totalSteps - 1)) * 100;

                        return (
                            <div
                                key={index}
                                className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 "
                                style={{ left: `${spacing}%` }}
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
                <h2 className="text-customTealBlue text-[24px] xs:text-[20px] text-center font-semibold mb-2">{currentStep.title}</h2>
                <p className="text-gray-600 text-center text-sm mb-9">{currentStep.description}</p>
            </div>


            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 px-3">
                <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 gap-4">
                    {currentStep.fields.map((field) => {
                        const value = formData[field] || "";
                        const label = labels[field] || field;

                        // Determine input type
                        const isDate = field === "date_of_birth";
                        const isPassword = field.toLowerCase().includes("password");

                        if (selectFields[field]) {
                            return (
                                <div key={field} className="flex flex-col">
                                    <label className="mb-2.5 text-[#282938] font-normal text-[19px] xs:text-sm sm:text-sm block">{label}</label>
                                    <select
                                        name={field}
                                        required
                                        value={value}
                                        onChange={handleChange}
                                        className="bg-transparent p-4 text-[1rem] text-[#282938] border border-customTealBlue outline-none rounded-[6px] w-full"
                                    >
                                        <option value="">-- Select {label} --</option>
                                        {selectFields[field].map((option) => (
                                            <option key={option} value={option.toLowerCase()}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }

                        return (
                            <div key={field} className="flex flex-col">
                                <label className="mb-2.5 text-[#282938] font-normal text-[19px] xs:text-sm sm:text-sm  block">{label}</label>
                                <input
                                    name={field}
                                    type={isDate ? "date" : isPassword ? "password" : "text"}
                                    value={value}
                                    required
                                    onChange={handleChange}
                                    className="bg-transparent p-3 text-[1rem]  text-[#282938] border border-customTealBlue outline-none rounded-[6px] w-full"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex xs:flex-col sm:flex-col flex-row-reverse justify-between mt-6">


                    <div className="flex  gap-4 xs:gap-0  xs:flex-col-reverse sm:flex-col-reverse">
                        {step > 0 && (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="xs:w-full xs:justify-center sm:w-full sm:justify-center xs:mb-1 sm:mb-1 flex items-center gap-2 bg-transparent text-customTealBlue px-4 py-2 rounded border border-customTealBlue "
                            >
                                <ChevronLeftIcon className="h-5 w-5" />Previous Step
                            </button>
                        )}
                        <button
                            type="submit"
                            className="xs:w-full xs:justify-center sm:w-full sm:justify-center xs:mb-2.5 sm:mb-2.5  flex items-center gap-2 bg-customTealBlue text-white px-4 py-2 rounded hover:bg-opacity-90"
                        >
                            {step < totalSteps - 1 ? (
                                <>
                                    Next Step <ChevronRightIcon className="h-5 w-5" />
                                </>
                            ) : (
                                <>
                                    Submit <CheckCircleIcon className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </div>
                    <Link to="/log-in">
                        <button className="text-customTealBlue underline xs:w-full xs:flex xs:justify-center sm:w-full sm:flex sm:justify-center">Back to Login</button>
                    </Link>
                </div>
            </form>

        </div>
    );
}

export default Form;
