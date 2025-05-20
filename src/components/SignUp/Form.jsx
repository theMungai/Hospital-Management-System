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
        <div className="w-4/5 mx-auto my-12 font-dmsans px-4">
            <h1 className="text-center text-3xl text-customTealBlue font-extrabold mb-12">Create Your Account</h1>
            {/* Progress Bar */}
            <div className="relative h-10 mb-8">
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full transform -translate-y-1/2" />
                <div
                    className="absolute top-1/2 left-0 h-2 bg-customTealBlue rounded-full transform -translate-y-1/2 transition-all duration-300"
                    style={{ width: `${progressPercentage}%`, zIndex: 1 }}
                />
                {formSteps.map((_, index) => {
                    const isActive = index <= step;
                    const spacing = (index / (totalSteps - 1)) * 100;

                    return (
                        <div
                            key={index}
                            className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                            style={{ left: `${spacing}%` }}
                        >
                            <div
                                className={`w-6 h-6 rounded-full text-white text-sm font-bold flex items-center justify-center ${
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
            <h2 className="text-customTealBlue text-2xl text-center font-semibold mb-2">{currentStep.title}</h2>
            <p className="text-gray-600 text-center text-sm mb-9">{currentStep.description}</p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentStep.fields.map((field) => {
                        const value = formData[field] || "";
                        const label = labels[field] || field;

                        // Determine input type
                        const isDate = field === "date_of_birth";
                        const isPassword = field.toLowerCase().includes("password");

                        if (selectFields[field]) {
                            return (
                                <div key={field} className="flex flex-col">
                                    <label className="mb-2.5 text-[#282938] font-normal text-[19px] block">{label}</label>
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
                                <label className="mb-2.5 text-[#282938] font-normal text-[19px] block">{label}</label>
                                <input
                                    name={field}
                                    type={isDate ? "date" : isPassword ? "password" : "text"}
                                    value={value}
                                    required
                                    onChange={handleChange}
                                    className="bg-transparent p-3 text-[1rem] text-[#282938] border border-customTealBlue outline-none rounded-[6px] w-full"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <Link to="/log-in">
                        <button className="text-customTealBlue underline">Back to Login</button>
                    </Link>

                    <div className="flex gap-4">
                        {step > 0 && (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="flex items-center gap-2 bg-transparent text-customTealBlue px-4 py-2 rounded border border-customTealBlue "
                            >
                                <ChevronLeftIcon className="h-5 w-5" />Previous Step
                            </button>
                        )}
                        <button
                            type="submit"
                            className=" flex items-center gap-2 bg-customTealBlue text-white px-4 py-2 rounded hover:bg-opacity-90"
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
                </div>
            </form>

        </div>
    );
}

export default Form;
