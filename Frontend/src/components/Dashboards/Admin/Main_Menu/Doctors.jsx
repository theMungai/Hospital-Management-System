import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { EllipsisVertical, User, UserRoundPen, Trash } from 'lucide-react';

import Layout from "../Layout.jsx";
import { useDoctors } from '../../../../hooks/useDoctors.js';


function getInitials(firstName, lastName) {
    if (!firstName || !lastName) return "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};


function DoctorRow({ doctor, index}){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate()

    const {
        id,
        doctor_first_name,
        doctor_last_name,
        doctor_profile_image,
        gender,
        street_address,
        city,
        country,
        specialty,
        date_of_birth,
        doctor_phone_number,
        doctor_email,
        availability_status,
        medical_license_number
    } = doctor


    const initials = getInitials(doctor_first_name, doctor_last_name)


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
            
            <div className="flex items-center flex-1 min-w-[180px] pr-2">
                {doctor_profile_image ? (
                    <img src={doctor_profile_image} alt="" className="w-8 h-8 rounded-full object-cover mr-2" />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-xs mr-2 shrink-0">{initials}</div>
                )}
                <p className="text-sm font-semibold text-darkGray truncate">{doctor_first_name} {doctor_last_name}</p>
            </div>

            <div className="w-[15%] text-gray-600 font-medium truncate">{specialty}</div>

            <div className="w-[10%] text-gray-500 font-medium text-xs whitespace-nowrap">{medical_license_number}</div>

            <div className="w-[10%] text-gray-500 font-medium text-xs whitespace-nowrap">{formattedDate}</div>

            <div className="w-[8%] text-gray-600 font-medium">{gender}</div>
            
            <div className="flex-1 min-w-[200px] text-gray-500 text-xs truncate pr-4 italic">
                {street_address}, {city} {country}
            </div>

            <div className="w-[18%] text-gray-600 font-medium truncate text-xs">{doctor_email}</div>
            <div className="w-[17%] text-gray-600 font-medium truncate text-xs">{doctor_phone_number}</div>


            <div className="w-[5%] flex justify-end items-center pr-4">
                <div className="flex items-center gap-2 px-2 py-1">
                    <div className="relative flex h-2 w-2">
                        {availability_status === 'Available' && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-customGreen opacity-75"></span>
                        )}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${availability_status === 'Available' ? 'bg-customGreen' : 'bg-lightGray'}`}></span>
                    </div>
                    <span className={`text-[10px] font-bold tracking-wider ${availability_status === 'Available' ? 'text-customGreen' : 'text-lightGray'}`}>
                        {availability_status || 'Unavailable'}
                    </span>
                </div>
            </div>


            <div className='relative ml-2' ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="hover:bg-gray-200 p-1.5 rounded-full transition-colors">
                    <EllipsisVertical className='w-4 h-4 text-gray-400'/>
                </button>

                {isDropdownOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-100 py-1 z-50'>
                        <p className='px-4 py-2 text-[10px] font-bold text-gray-400 tracking-widest uppercase'>Actions</p>
                        <DropDownItem icon={User} text="View profile" onClick={() => navigate(`/doctors/${id}`)}/>
                        

                        <DropDownItem 
                            icon={UserRoundPen} 
                            text={availability_status === 'Available' ? "Set Unavailable" : "Set Available"} 
                            // onClick={handleToggleStatus}  
                        />
                    </div>
                )}
            </div>
        </section>
    )
}

function Doctors() {
    const { doctors, loading, error} = useDoctors(true)
   
    if (loading) {
        return (
            <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-darkGray">
                Loading doctors... 
            </div>
        );
    }

    if (error) return <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-red-600 font-poppins">{error}</div>;


    const tableHeaderClass = "text-xs font-bold text-gray-400 p-3 border-b border-gray-100 tracking-wider";

    return (
        <Layout>
            <div className="px-8 py-9 font-poppins">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-customTealBlue font-bold text-xl">Doctors</h2>
                    {/* <button className="bg-customTealBlue text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#006a70] transition-colors">
                        + Doctor
                    </button> */}
                </div>
                
                <div className="bg-white">
                    <div className="flex items-center bg-gray-50/50 border-b border-gray-100">
                    <div className={`${tableHeaderClass} flex-1 min-w-[180px]`}>Doctor</div>
                    <div className={`${tableHeaderClass} w-[15%]`}>Specialty</div>
                    <div className={`${tableHeaderClass} w-[10%]`}>Medical License Number</div>
                    <div className={`${tableHeaderClass} w-[10%]`}>Joined</div>
                    <div className={`${tableHeaderClass} w-[8%]`}>Gender</div>
                    <div className={`${tableHeaderClass} flex-1 min-w-[200px]`}>Address</div>
                    <div className={`${tableHeaderClass} w-[18%]`}>Email</div>
                    <div className={`${tableHeaderClass} w-[17%]`}>Phone Number</div>
                    <div className={`${tableHeaderClass} w-[5%] pr-4`}>Status</div>
                    <div className="w-[40px]"></div> {/* Space for the ellipsis button */}
                </div>

                    <div className="divide-y divide-gray-100">
                        {doctors.length > 0 ? (
                            doctors.map((doctor, idx) => (
                                <DoctorRow key={doctor.id} doctor={doctor} index={idx} />
                            ))
                        ) : (
                            <div className="p-20 text-center text-gray-400 italic">No doctors found.</div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Doctors;