import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
    EllipsisVertical, 
    CalendarRange, 
    UserRoundPen, 
    CheckCircle2, 
    Ban, 
    Clock9, 
    BellRing,
    FileText
} from "lucide-react";

import { useAppointments } from "../../../../hooks/useAppointments.js";
import Layout from "../Layout.jsx";

function getInitials(firstName, lastName) {
    if (!firstName || !lastName) return "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};

function AppointmentRow({ appointment, index }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    

    const dropdownRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const DropdownItem = ({ icon: Icon, text, onClick, className = '' }) => (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className={`flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${className}`}
        >
            <Icon className="w-4 h-4 mr-3 text-gray-500" />
            {text}
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
        <div className={`flex items-center p-3 text-sm border-b border-gray-100 hover:bg-customTealBlue/[0.02] relative ${index % 2 === 0 ? 'bg-white' : 'bg-customTealBlue/[0.04]'}`}>
            {/* Doctor Column */}
            <div className="flex items-center flex-1 min-w-[150px] pr-2">
                {doctor_profile_image ? (
                    <img src={doctor_profile_image} alt="" className="w-8 h-8 rounded-full object-cover mr-2" />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-xs mr-2">{doctorInitials}</div>
                )}
                <div>
                    <p className="text-base font-semibold text-darkGray">Dr. {doctor_first_name} {doctor_last_name}</p>
                    <p className="text-sm text-lightGray italic">{specialty || 'No Specialty'}</p>
                </div>
            </div>

            <div className="flex items-center flex-1 min-w-[150px] pr-2">
                {patient_profile_image ? (
                    <img src={patient_profile_image} alt="" className="w-8 h-8 rounded-full object-cover mr-2" />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-xs mr-2">{patientInitials}</div>
                )}
                <p className="text-sm text-gray-600 font-medium">{patient_first_name} {patient_last_name}</p>
            </div>

            <div className="flex-1 min-w-[200px] text-gray-700 truncate pr-2">{reason_for_visit}</div>
            <div className="w-[10%] text-gray-600 font-medium whitespace-nowrap">{formattedDate}</div>
            <div className="w-[15%] text-gray-600 font-medium">{duration_minutes} min</div>
            <div className="w-[15%] text-gray-600 font-medium">{appointment_type}</div>

            <div className="w-[15%]">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${statusBadgeClass}`}>
                    {appointment_status}
                </span>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`hover:bg-lightGray/[0.2] p-2 rounded-full transition-colors ${isDropdownOpen ? 'bg-gray-200' : ''}`}
                >
                    <EllipsisVertical className="w-5 h-5 text-gray-600" />
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl border border-gray-100 z-50 py-2 transform origin-top-right">
                        <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Manage Appointment</p>
                        
                        <DropdownItem icon={CheckCircle2} text="Check-In Patient" onClick={() => console.log("Check-in", id)} />
                        <DropdownItem icon={CalendarRange} text="Reschedule" onClick={() => console.log("Reschedule", id)} />
                        <DropdownItem icon={UserRoundPen} text="Reassign Doctor" onClick={() => console.log("Reassign", id)} />
                        <DropdownItem icon={BellRing} text="Send Reminder" onClick={() => console.log("Notify", id)} />
                        
                        <div className="my-1 border-t border-gray-100"></div>
                        
                        <DropdownItem icon={FileText} text="View Full Details" onClick={() => console.log("Details", id)} />
                        <DropdownItem icon={Clock9} text="Mark as No-Show" onClick={() => console.log("No-Show", id)} />
                        <DropdownItem 
                            icon={Ban} 
                            text="Cancel Appointment" 
                            onClick={() => console.log("Cancel", id)} 
                            className="text-red-600 hover:bg-red-50 hover:text-red-700" 
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function Appointments() {
    const { appointments, loading, error } = useAppointments();

    if (loading) return <div className="p-4 text-center text-gray-500">Loading appointments...</div>;
    if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

    const tableHeaderClass = "text-xs font-semibold text-gray-500 p-3 border-b border-gray-200";

    return (
        <Layout>
            <div className="px-8 py-9 rounded-[6px] font-poppins">
                <h2 className="text-customTealBlue font-bold mb-7 text-lg">Appointments</h2>
                
                <div className="flex items-center bg-gray-50">
                    <div className={`${tableHeaderClass} flex-1 min-w-[150px]`}>Assigned Doctor</div>
                    <div className={`${tableHeaderClass} flex-1 min-w-[150px]`}>Patient</div>
                    <div className={`${tableHeaderClass} flex-1 min-w-[200px]`}>Reason for Visit</div>
                    <div className={`${tableHeaderClass} w-[10%]`}>Date</div>
                    <div className={`${tableHeaderClass} w-[15%]`}>Duration</div>
                    <div className={`${tableHeaderClass} w-[15%]`}>Type</div>
                    <div className={`${tableHeaderClass} w-[15%]`}>Status</div>
                    <div className={`${tableHeaderClass} w-10`}></div> {/* Actions spacer */}
                </div>

                <div className="divide-y divide-gray-100">
                    {appointments.map((appointment, idx) => (
                        <AppointmentRow key={appointment.id} appointment={appointment} index={idx} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Appointments;