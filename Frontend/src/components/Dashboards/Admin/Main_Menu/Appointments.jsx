import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { 
    EllipsisVertical, 
    UserRoundPen,
    UserRoundPlus, 
    Ban, 
    BellRing,
    ChevronRight,
    RefreshCw,
    CheckCircle2,
    Clock,
} from "lucide-react";

import { useAppointments } from "../../../../hooks/useAppointments.js";
import Layout from "../Layout.jsx";

function getInitials(firstName, lastName) {
    if (!firstName || !lastName) return "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};

function AppointmentRow({ appointment, index }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const rowRef = useRef(null);

    const {
        id,
        doctor_first_name,
        doctor_last_name,
        doctor_profile_image,
        specialty,
        patient_first_name,
        patient_last_name,
        patient_profile_image,
        reason_for_visit,
        appointment_date,
        appointment_status,
        duration_minutes,
        appointment_type
    } = appointment;

    const doctorInitials = getInitials(doctor_first_name, doctor_last_name);
    const patientInitials = getInitials(patient_first_name, patient_last_name);

    // GSAP animation for row entry
    useGSAP(() => {
        if (rowRef.current) {
            // Reset initial state
            gsap.set(rowRef.current, { y: -20, opacity: 0 });
            
            // Animate row with staggered delay based on index
            gsap.to(rowRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.2 + (index * 0.08), // 200ms + staggered 80ms per row
                ease: "back.out(1.2)",
            });

            // Animate content within the row with further staggering
            const doctorImg = rowRef.current.querySelector('.doctor-img');
            const doctorName = rowRef.current.querySelector('.doctor-name');
            const doctorSpecialty = rowRef.current.querySelector('.doctor-specialty');
            const patientImg = rowRef.current.querySelector('.patient-img');
            const patientName = rowRef.current.querySelector('.patient-name');
            const reason = rowRef.current.querySelector('.reason');
            const date = rowRef.current.querySelector('.date');
            const duration = rowRef.current.querySelector('.duration');
            const type = rowRef.current.querySelector('.type');
            const status = rowRef.current.querySelector('.status');
            const actions = rowRef.current.querySelector('.actions');

            // Set initial states
            gsap.set([doctorImg, patientImg], { scale: 0 });
            gsap.set([doctorName, doctorSpecialty, patientName, reason, date, duration, type, status, actions], { 
                x: -20, 
                opacity: 0 
            });

            // Staggered animations
            const rowDelay = 0.2 + (index * 0.08);
            
            gsap.to(doctorImg, {
                scale: 1,
                duration: 0.4,
                delay: rowDelay + 0.1,
                ease: "back.out(1.5)"
            });

            gsap.to(patientImg, {
                scale: 1,
                duration: 0.4,
                delay: rowDelay + 0.15,
                ease: "back.out(1.5)"
            });

            // Animate text elements with staggered delays
            const textElements = [doctorName, doctorSpecialty, patientName, reason, date, duration, type, status, actions];
            textElements.forEach((el, i) => {
                if (el) {
                    gsap.to(el, {
                        x: 0,
                        opacity: 1,
                        duration: 0.5,
                        delay: rowDelay + 0.2 + (i * 0.05), // 200ms + 50ms per element
                        ease: "power2.out"
                    });
                }
            });

            // Special animation for actions button
            if (actions) {
                gsap.to(actions, {
                    rotation: 0,
                    duration: 0.4,
                    delay: rowDelay + 0.6,
                    ease: "back.out(1.5)"
                });
            }
        }
    }, [index]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
                setIsStatusMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    function toggleStatusDropDown(){
        setIsStatusMenuOpen(prev => !prev)
    }

    const DropdownItem = ({ icon: Icon, text, onClick, hasSubmenu, className = '' }) => (
        <button
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
            }}
            
            className={`flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-[#007E85]/[0.06] hover:text-customTealBlue transition-colors ${className}`}
        >
            <div className="flex items-center">
                <Icon className="w-4 h-4 mr-3" />
                {text}
            </div>
            {hasSubmenu && <ChevronRight 
                onClick={toggleStatusDropDown}
                className={`w-4 h-4 text-gray-500 ml-1 transition-transform ${isStatusMenuOpen ? 'rotate-90' : 'rotate-0'}`}
            />}
        </button>
    );

    const statusClassMap = {
        Scheduled: 'bg-[#FFA500]/[0.10] text-[#FFA500]/[0.56] border border-[#FFA500]/[0.56]',
        Completed: 'bg-[#6EAB36]/[0.10] text-[#6EAB36]/[0.56] border border-[#6EAB36]/[0.56]',
        Pending: 'bg-[#0099FF]/[0.10] text-[#0099FF]/[0.56] border border-[#0099FF]/[0.56]',
        Canceled: 'bg-[#FF3C00]/[0.10] text-[#FF3C00]/[0.56] border border-[#FF3C00]/[0.56]',
    };

    const statusBadgeClass = statusClassMap[appointment_status] || 'bg-gray-100 text-gray-800';
    const formattedDate = new Date(appointment_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <div 
            ref={rowRef}
            className={`flex items-center p-3 text-sm hover:bg-customTealBlue/[0.02] relative ${index % 2 === 0 ? 'bg-white' : 'bg-customTealBlue/[0.04]'}`}
        >
            <div className="flex items-center flex-1 min-w-[150px] pr-2">
                {doctor_profile_image ? (
                    <img 
                        src={doctor_profile_image} 
                        alt="" 
                        className="w-8 h-8 rounded-full object-cover mr-2 doctor-img"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-xs mr-2 doctor-img">
                        {doctorInitials}
                    </div>
                )}
                <div className="overflow-hidden">
                    <p className="text-base font-semibold text-darkGray doctor-name">
                        Dr. {doctor_first_name} {doctor_last_name}
                    </p>
                    <p className="text-sm text-lightGray italic doctor-specialty">
                        {specialty || 'No Specialty'}
                    </p>
                </div>
            </div>

            <div className="flex items-center flex-1 min-w-[150px] pr-2">
                {patient_profile_image ? (
                    <img 
                        src={patient_profile_image} 
                        alt="" 
                        className="w-8 h-8 rounded-full object-cover mr-2 patient-img"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-xs mr-2 patient-img">
                        {patientInitials}
                    </div>
                )}
                <p className="text-sm text-gray-600 font-medium patient-name">
                    {patient_first_name || 'No'} {patient_last_name || 'Patient'}
                </p>
            </div>

            <div className="flex-1 min-w-[200px] text-gray-700 truncate pr-2 reason">
                {reason_for_visit}
            </div>

            <div className="w-[10%] text-gray-600 font-medium whitespace-nowrap date">
                {formattedDate}
            </div>
            <div className="w-[15%] text-gray-600 font-medium duration">
                {duration_minutes} min
            </div>
            <div className="w-[15%] text-gray-600 font-medium type">
                {appointment_type}
            </div>

            <div className="w-[15%]">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${statusBadgeClass} status`}>
                    {appointment_status}
                </span>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`relative hover:bg-gray-200 p-2 rounded-full transition-colors actions ${isDropdownOpen ? 'bg-gray-200' : ''}`}
                >
                    <EllipsisVertical className="w-5 h-5 text-gray-600" />
                </button>
                

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white shadow-2xl rounded-xl border border-gray-100 py-2">
                        <p className="px-4 py-2 text-[10px] font-bold text-gray-400 tracking-widest">Manage appointment</p>
                        
                        <DropdownItem icon={UserRoundPlus} text="Reassign Doctor" onClick={() => console.log("Reassign", id)} />
                        <DropdownItem icon={UserRoundPen} text="Edit details" onClick={() => console.log("Edit", id)} />
                        

                        <div className="relative">
                            <DropdownItem 
                                icon={RefreshCw} 
                                text="Update Status" 
                                hasSubmenu={true}
                                onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
                            />

                            {isStatusMenuOpen && (
                                <div className="absolute right-full top-0 mr-1 min-w-64 bg-white text-gray-600  shadow-xl rounded-xl border border-gray-100 py-2">
                                    <button onClick={() => console.log("Complete", id)} className="flex items-center w-full px-4 py-2 text-sm hover:bg-lightGray/[0.1]">
                                        <CheckCircle2 className="w-4 h-4 mr-3 " /> Mark Completed
                                    </button>
                                    <button onClick={() => console.log("Pending", id)} className="flex items-center w-full px-4 py-2 text-sm hover:bg-lightGray/[0.1] ">
                                        <Clock className="w-4 h-4 mr-3 " /> Mark Pending
                                    </button>
                                    <button onClick={() => console.log("Cancel", id)} className="flex items-center w-full px-4 py-2 text-sm hover:bg-lightGray/[0.1] ">
                                        <Ban className="w-4 h-4 mr-3 " /> Cancel Appointment
                                    </button>
                                </div>
                            )}
                        </div>

                        <DropdownItem icon={BellRing} text="Send Reminder" onClick={() => console.log("Notify", id)} />
                    </div>
                )}
            </div>
        </div>
    );
}

function Appointments() {
    const { appointments, loading, error } = useAppointments();
    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const tableHeaderRef = useRef(null);
    const noDataRef = useRef(null);

    // GSAP animation for the entire page
    useGSAP(() => {
        if (containerRef.current) {
            // Animate header section
            gsap.fromTo(headerRef.current,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "back.out(1.2)" }
            );

            // Animate table headers with delay
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

            // If no data, animate the message
            if (appointments.length === 0 && noDataRef.current) {
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
        }
    }, [appointments.length]);

    if (loading) return <div className="p-10 text-center text-gray-500 font-poppins">Loading appointments...</div>;
    if (error) return <div className="p-10 text-center text-red-600 font-poppins">{error}</div>;

    const tableHeaderClass = "text-xs font-bold text-gray-400 p-3 border-b border-gray-100 tracking-wider";

    return (
        <Layout>
            <div className="px-8 py-9 font-poppins" ref={containerRef}>
                <div ref={headerRef} className="flex items-center justify-between mb-8">
                    <h2 className="text-customTealBlue font-bold text-xl">Appointments</h2>
                    <button className="bg-customTealBlue text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#006a70] transition-colors">
                        + New Appointment
                    </button>
                </div>
                
                <div className="bg-white">
                    <div ref={tableHeaderRef} className="flex items-center bg-gray-50/50">
                        <div className={`${tableHeaderClass} flex-1 min-w-[150px]`}>Assigned Doctor</div>
                        <div className={`${tableHeaderClass} flex-1 min-w-[150px]`}>Patient</div>
                        <div className={`${tableHeaderClass} flex-1 min-w-[200px]`}>Reason for Visit</div>
                        <div className={`${tableHeaderClass} w-[10%]`}>Date</div>
                        <div className={`${tableHeaderClass} w-[15%]`}>Duration</div>
                        <div className={`${tableHeaderClass} w-[15%]`}>Type</div>
                        <div className={`${tableHeaderClass} w-[15%]`}>Status</div>
                        <div className="w-10 bg-gray-50/50 border-b border-gray-100"></div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {appointments.length > 0 ? (
                            appointments.map((appointment, idx) => (
                                <AppointmentRow key={appointment.id} appointment={appointment} index={idx} />
                            ))
                        ) : (
                            <div ref={noDataRef} className="p-20 text-center text-gray-400 italic">
                                No appointments found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Appointments;