import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { EllipsisVertical, User, UserRoundPen} from 'lucide-react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Layout from "../Layout.jsx";
import { useDoctors } from '../../../../hooks/useDoctors.js';


function getInitials(firstName, lastName) {
    if (!firstName || !lastName) return "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};


function DoctorRow({ doctor, index }){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const dropdownRef = useRef(null);
    const rowRef = useRef(null)
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

        useGSAP(() => {
        if (!rowRef.current) return;
        
        setIsAnimating(true);

        gsap.set(rowRef.current, { y: -20, opacity: 0 });

        gsap.to(rowRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2 + (index * 0.08),
            ease: "back.out(1.2)",
            onComplete: () => {
                const animateContent = () => {
                    const doctorImg = rowRef.current?.querySelector('.doctor-img');
                    const doctorName = rowRef.current?.querySelector('.doctor-name');
                    const doctorSpecialty = rowRef.current?.querySelector('.specialty');
                    const doctorGender = rowRef.current?.querySelector('.gender');
                    const doctorAddress = rowRef.current?.querySelector('.address');
                    const dateOfBirth = rowRef.current?.querySelector('.date-of-birth');
                    const doctorPhone = rowRef.current?.querySelector('.phone');
                    const doctorEmail = rowRef.current?.querySelector('.email');
                    const doctorStatus = rowRef.current?.querySelector('.status');
                    const doctorLicence = rowRef.current?.querySelector('.licence');
                    const actions = rowRef.current?.querySelector('.actions');

                    if (doctorImg) gsap.set(doctorImg, { scale: 0 });

                    const textElements = [
                        doctorName, doctorSpecialty, doctorGender, doctorAddress, 
                        dateOfBirth, doctorPhone, doctorEmail, doctorStatus, 
                        doctorLicence, actions
                    ].filter(el => el !== null && el !== undefined);
                    
                    textElements.forEach(el => {
                        gsap.set(el, { x: -20, opacity: 0 });
                    });
                    
                    const contentDelay = 0.2 + (index * 0.08) + 0.1;

                    if (doctorImg) {
                        gsap.to(doctorImg, {
                            scale: 1,
                            duration: 0.4,
                            delay: contentDelay,
                            ease: "back.out(1.5)"
                        });
                    }

                    textElements.forEach((el, i) => {
                        gsap.to(el, {
                            x: 0,
                            opacity: 1,
                            duration: 0.5,
                            delay: contentDelay + 0.1 + (i * 0.03),
                            ease: "power2.out"
                        });
                    });

                    if (actions) {
                        gsap.to(actions, {
                            rotation: 0,
                            duration: 0.4,
                            delay: contentDelay + 0.4,
                            ease: "back.out(1.5)"
                        });
                    }
                    
                    setIsAnimating(false);
                };

                setTimeout(animateContent, 10);
            }
        });
    }, { dependencies: [index], revertOnUpdate: true });


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
                className={`doctor-row flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-[#007E85]/[0.06] hover:text-customTealBlue transition-colors ${className}`}
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
        <section 
            ref={rowRef}
            className={`flex items-center p-3 text-sm hover:bg-customTealBlue/[0.02] relative ${index % 2 === 0 ? 'bg-white' : 'bg-customTealBlue/[0.04]'} ${isAnimating ? 'pointer-events-none' : ''}`}
        >
            <div className="flex items-center flex-1 min-w-[180px] pr-2">
                {doctor_profile_image ? (
                    <img 
                        src={doctor_profile_image} 
                        alt="" 
                        className="w-8 h-8 rounded-full object-cover mr-2 doctor-img" 
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-xs mr-2 shrink-0 doctor-img">
                        {initials}
                    </div>
                )}
                <p className="text-sm font-semibold text-darkGray truncate doctor-name">
                    {doctor_first_name} {doctor_last_name}
                </p>
            </div>

            <div className="w-[15%] text-gray-600 font-medium truncate specialty">{specialty}</div>

            <div className="w-[10%] text-gray-500 font-medium text-xs whitespace-nowrap licence">{medical_license_number}</div>

            <div className="w-[10%] text-gray-500 font-medium text-xs whitespace-nowrap date-of-birth">{formattedDate}</div>

            <div className="w-[8%] text-gray-600 font-medium gender">{gender}</div>
            
            <div className="flex-1 min-w-[200px] text-gray-500 text-xs truncate pr-4 italic address">
                {street_address}, {city} {country}
            </div>

            <div className="w-[18%] text-gray-600 font-medium truncate text-xs email">{doctor_email}</div>
            <div className="w-[17%] text-gray-600 font-medium truncate text-xs phone">{doctor_phone_number}</div>

            <div className="w-[5%] flex justify-end items-center pr-4 status">
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

            <div className='relative ml-2 actions' ref={dropdownRef}>
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className="hover:bg-gray-200 p-1.5 rounded-full transition-colors"
                >
                    <EllipsisVertical className='w-4 h-4 text-gray-400'/>
                </button>

                {isDropdownOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-100 py-1 z-50'>
                        <p className='px-4 py-2 text-[10px] font-bold text-gray-400 tracking-widest uppercase'>Actions</p>
                        <DropDownItem 
                            icon={User} 
                            text="View profile" 
                            onClick={() => navigate(`/doctors/${id}`)}
                        />
                        <DropDownItem 
                            icon={UserRoundPen} 
                            text={availability_status === 'Available' ? "Set Unavailable" : "Set Available"} 
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

function Doctors() {
    const { doctors, loading, error} = useDoctors(true)
    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const tableHeaderRef = useRef(null);
    const noDataRef = useRef(null);

    useGSAP(() => {

        if (!containerRef.current) return;

        if (headerRef.current) {
            gsap.fromTo(headerRef.current,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "back.out(1.2)" }
            );
        }

        if (tableHeaderRef.current) {
            gsap.fromTo(tableHeaderRef.current,
                { y: -20, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.6, 
                    delay: 0.1,
                    ease: "power2.out" 
                }
            );
        }

        if (doctors.length === 0 && noDataRef.current) {
            gsap.fromTo(noDataRef.current,
                { y: -20, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.6, 
                    delay: 0.3,
                    ease: "power2.out" 
                }
            );
        }
    }, { dependencies: [doctors.length] });
   
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
            <div className="px-8 py-9 font-poppins" ref={containerRef}>
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
                    <div className="w-[40px]"></div>
                </div>

                    <div className="divide-y divide-gray-100">
                        {doctors.length > 0 ? (
                            doctors.map((doctor, idx) => (
                                <DoctorRow key={doctor.id} doctor={doctor} index={idx} />
                            ))
                        ) : (
                            <div ref={noDataRef} className="p-20 text-center text-gray-400 italic">No doctors found.</div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Doctors;