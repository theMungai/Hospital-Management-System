import React, {useState} from 'react';
import Inputs from "../common/Inputs.jsx";
import country from 'country-list-js';


function Select({ label, options = [], className = '', ...props })
{
    return (
        <div className={`flex flex-col ${className}`}>
            {label && <label className="mb-2.5 text-[#282938] font-normal text-[19px] block ">{label}</label>}
            <select
                className="p-4 text-[1rem] text-[#282938] border border-customTealBlue outline-none rounded-[6px] w-full"
                {...props}
            >
                <option value="">-- Select {label} --</option>
                {options.map((option, idx) =>
                    typeof option === 'string' ? (
                        <option key={idx} value={option.toLowerCase()}>
                            {option}
                        </option>
                    ) : (
                        <option key={idx} value={option.value}>
                            {option.label}
                        </option>
                    )
                )}
            </select>
        </div>
    );
}

const countryList = country.names()

function Form() {
    const [formData, setFormData] = useState({
        userType: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender:"",
        DOB:"",
        address:"",
        country:"",
        maritalStatus: "",
        height:"",
        weight:"",
        emergencyFirstName:"",
        emergencyLastName:"",
        emergencyRelationShip:"",
        emergencyPhone:"",
    })

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    function handleSubmit(event){
        event.preventDefault()
        console.log(formData)

        fetch("http://localhost:3000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((data) => setFormData(data))
            .catch((error) => console.log("Unable to post data", error))

    }



    return (
        <div className="basis-[100%] overflow-y-scroll py-12 ">
            <h1 className="text-[40px] text-center my-6 font-extrabold text-customTealBlue">Create Your Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2 ">Register as</h2>
                    <span className=" text-gray-500 italic">(Account type)</span>
                    <div className="flex gap-4 mt-4">
                        <label><input required type="radio" name="userType" value="doctor" checked={formData.userType === "doctor"} onChange={handleChange} /> Doctor</label>
                        <label><input required type="radio" name="userType" value="patient" checked={formData.userType === "patient"} onChange={handleChange} /> Patient</label>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <Inputs label="First Name" name="firstName" value={formData.firstName}  onChange={handleChange}  placeholder="Enter your first name" />
                        <Inputs label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange}  placeholder="Enter your last name" />
                        <Inputs label="Email" name="email" value={formData.email} onChange={handleChange}  placeholder="Enter your email" type="email" />
                        <Inputs label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}  placeholder="Enter your phone number" />
                        <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                        <Inputs label="Date of Birth" name="DOB" value={formData.DOB} onChange={handleChange}  type="date" />
                        <Inputs label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main Street" />
                        <Select label="Country of Residence" name="country" value={formData.country} onChange={handleChange}  options={countryList} />
                        <Select label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} options={['Single', 'Married', 'Other']} />
                        <Inputs label="Height (cm)" name='height' value={formData.height} onChange={handleChange}  type="number" />
                        <Inputs label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} type="number" />
                    </div>

                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Emergency Contact Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Inputs label="First Name"  onChange={handleChange} placeholder="Enter contact's first name" />
                        <Inputs label="Last Name" onChange={handleChange} placeholder="Enter contact's last name" />
                        <Inputs label="Relationship" onChange={handleChange} placeholder="e.g., Spouse, Parent" />
                        <Inputs label="Phone Number" onChange={handleChange} placeholder="Enter contact's phone number" />
                    </div>
                </div>

                <button className="bg-customTealBlue py-3 px-10 mt-8 rounded-[8px] text-white text-[18px] font-semibold cursor-pointer relative left-1/2 -translate-x-1/2"> Create account</button>
            </form>
        </div>
    );
};

export default Form;