import React, { useState } from "react";
import { formSteps } from "./RegistrationFormSteps.jsx";
import { Link } from "react-router-dom";
import {labels} from "./RegistrationFormSteps.jsx";

const selectFields = {
    gender: ["Male", "Female", "Other"],
    marital_status: ["Single", "Married", "Divorced", "Widowed"],
    blood_type: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    country: ["United States", "Canada", "United Kingdom", "India", "Australia"],
};

function Form() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({

    });

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
        <div className="w-4/5 mx-auto mt-12 font-sans px-4  ">
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
            <h2 className="text-xl font-semibold mb-1">{currentStep.title}</h2>
            <p className="text-gray-600 text-sm mb-6">{currentStep.description}</p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
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
                                    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
                                    <select
                                        name={field}
                                        required
                                        value={value}
                                        onChange={handleChange}
                                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                                <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
                                <input
                                    name={field}
                                    type={isDate ? "date" : isPassword ? "password" : "text"}
                                    value={value}
                                    required
                                    onChange={handleChange}
                                    className="p-2 border border-customTealBlue rounded outline-none"
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
                                className="bg-customWhite text-gray-800 px-4 py-2 rounded "
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="submit"
                            className="bg-customTealBlue text-white px-4 py-2 rounded hover:bg-opacity-90"
                        >
                            {step < totalSteps - 1 ? "Next" : "Submit"}
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default Form;
