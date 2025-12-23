import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { EllipsisVertical, User, UserRoundPen, Trash } from 'lucide-react';

import Layout from "../Layout.jsx";
import { usePatients } from '../../../../hooks/usePatients.js';


function getInitials(firstName, lastName) {
    if (!firstName || !lastName) return "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};


function PatientRow({ patient, index}){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate()

    const {
        id,
        patient_first_name,
        patient_last_name,
        patient_profile_image,
        gender,
        street_address,
        city,
        country,
        Disease,
        date_of_birth,
        patient_phone_number,
        patient_email
    } = patient


    const initials = getInitials(patient_first_name, patient_last_name)


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    function DropDownItem({ icon: Icon, text, onClick, className = '' }){
        return (
            <button
                className={`flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-[#007E85]/[0.06] hover:text-customTealBlue transition-colors ${className}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(false);
                    if (onClick) onClick();
                }}
            >
                <Icon className="w-4 h-4 mr-3" />
                {text}
            </button>
        );
    }

    const formattedDate = new Date(date_of_birth).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });


    return(
        <section className={`flex items-center p-3 text-sm hover:bg-customTealBlue/[0.02] relative ${index % 2 === 0 ? 'bg-white' : 'bg-customTealBlue/[0.04]'}`}>
             <div className="flex items-center flex-1 min-w-[150px] pr-2">
                {patient_profile_image ? (
                    <img src={patient_profile_image} alt="" className="w-8 h-8 rounded-full object-cover mr-2" />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-xs mr-2">{initials}</div>
                )}
                <div>
                    <p className="text-base font-semibold text-darkGray">{patient_first_name} {patient_last_name}</p>
                </div>
            </div>

            <div className="flex-1 min-w-[200px] text-gray-700 truncate pr-2">{street_address} {city} {country}</div>
            <div className="w-[15%] text-gray-600 font-medium">{Disease}</div>
            <div className="w-[10%] text-gray-600 font-medium whitespace-nowrap">{formattedDate}</div>
            <div className="w-[15%] text-gray-600 font-medium">{gender}</div>
            <div className="w-[15%] text-gray-600 font-medium">{patient_email}</div>
            <div className="w-[15%] text-gray-600 font-medium">{patient_phone_number}</div>

            <div className='relative' ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`hover:bg-gray-200 p-2 rounded-full transition-colors ${isDropdownOpen ? 'bg-gray-200' : ''}`}
                >
                    <EllipsisVertical className='w-5 h-5 text-gray-600'/>
                </button>

                {isDropdownOpen && (
                    <div className='absolute right-0 mt-2 w-56 bg-white shadow-2xl rounded-xl border border-gray-100 py-2 z-70 transform transition-all duration-500 ease-in-out origin-top-right'>
                        <p className='px-4 py-2 text-[10px] font-bold text-gray-400 tracking-widest'>Actions</p>

                        <DropDownItem icon={User} text="View profile" onClick={() => navigate('/profile')}/>
                        <DropDownItem icon={UserRoundPen} text="Edit details" onClick={() => console.log("Edit")}  />

                    </div>
                )}
            </div>

        </section>
    )
}

function Patients() {
    const { patients, loading, error} = usePatients(true)
   
    if (loading) {
        return (
            <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-darkGray">
                Loading patients... 
            </div>
        );
    }

    if (error) return <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-red-600 font-poppins">{error}</div>;


    const tableHeaderClass = "text-xs font-bold text-gray-400 p-3 border-b border-gray-100 tracking-wider";

    return (
        <Layout>
            <div className="px-8 py-9 font-poppins">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-customTealBlue font-bold text-xl">Patients</h2>
                    <button className="bg-customTealBlue text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#006a70] transition-colors">
                        + New Patient
                    </button>
                </div>
                
                <div className="bg-white">
                    <div className="flex items-center bg-gray-50/50">
                        <div className={`${tableHeaderClass} flex-1 min-w-[150px]`}>Patient Name</div>
                        <div className={`${tableHeaderClass} flex-1 min-w-[150px]`}>Address</div>
                        <div className={`${tableHeaderClass} flex-1 min-w-[200px]`}>Diagnose</div>
                        <div className={`${tableHeaderClass} w-[10%]`}>Date of birth</div>
                        <div className={`${tableHeaderClass} w-[15%]`}>Gender</div>
                        <div className={`${tableHeaderClass} w-[15%]`}>Email</div>
                        <div className={`${tableHeaderClass} w-[15%]`}>Phone Number</div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {patients.length > 0 ? (
                            patients.map((patient, idx) => (
                                <PatientRow key={patient.id} patient={patient} index={idx} />
                            ))
                        ) : (
                            <div className="p-20 text-center text-gray-400 italic">No patients found.</div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Patients;