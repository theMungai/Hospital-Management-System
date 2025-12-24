import { useRef } from 'react';
import { useAppointments } from '../../../../hooks/useAppointments';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


function getInitials (firstName, lastName){
    if (!firstName || !lastName) return "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};


function AppointmentRow({ appointment, index }) {
    const rowRef = useRef(null)

    const {
        doctor_first_name,
        doctor_last_name,
        doctor_profile_image,
        specialty,
        reason_for_visit,
        appointment_date,
        appointment_status,
    } = appointment;
    
    const initials = getInitials(doctor_first_name, doctor_last_name);

    useGSAP(() => {
        if(rowRef.current){
            gsap.set(rowRef.current, {y: -20, opacity: 0})

            gsap.to(rowRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.2 + (index * 0.08),
                ease: "back.out(1.2)"
            })


            const doctorImg = rowRef.current.querySelector(".doctor-img")
            const doctorName = rowRef.current.querySelector(".doctor-name")
            const specialty = rowRef.current.querySelector(".specialty")
            const appointmentReason = rowRef.current.querySelector(".reason")
            const appoinmentDate = rowRef.current.querySelector(".date")
            const status = rowRef.current.querySelector(".status")

            if (doctorImg){
                gsap.set(doctorImg, { scale: 0})
            }

            const textElements = [doctorName, appointmentReason, appoinmentDate, status, specialty]
            gsap.set(textElements, { x: -20, opacity: 0 })

            const rowDelay = 0.2 + (index * 0.08)

            gsap.to(doctorImg, {
                scale: 1,
                duration: 0.4,
                delay: rowDelay,
                ease: "back.out(1.5)"
            })

            textElements.forEach((element, i) => {
                if(element){
                    gsap.to(element, {
                        x: 0,
                        opacity: 1,
                        duration: 0.5,
                        delay: rowDelay + 0.2 + (i * 0.05),
                        ease: "power2.out"
                    })
                }
            })
        }
    }, [index])

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
            className={`bg-white flex items-center p-3 text-sm border-b border-gray-100 hover:bg-customTealBlue/[0.03] transition-colors cursor-pointer`}
        >
            
            <div className="flex items-center w-1/4 min-w-[150px] pr-2">
                {doctor_profile_image ? (
                    <img
                        src={doctor_profile_image}
                        alt={`${doctor_first_name}`}
                        className="w-8 h-8 rounded-full object-cover mr-2 doctor-img"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-xs mr-2 doctor-img">
                        {initials}
                    </div>
                )}
                <div>
                    <p className="font-normal text-base text-darkGray mb-1 doctor-name">{doctor_first_name} {doctor_last_name}</p>
                    <p className="text-sm text-gray-500 italic specialty">{specialty}</p>
                </div>
            </div>

            <div className="w-2/5 min-w-[200px] text-gray-700 truncate pr-2 reason">
                {reason_for_visit}
            </div>

            <div className="w-[15%] text-gray-600 font-medium whitespace-nowrap pr-2 date">
                {formattedDate}
            </div>

            <div className="w-1/5 text-left">
                <span className={`inline-block px-2.5 py-0.5 text-sm font-semibold rounded-lg status ${statusBadgeClass}`}>
                    {appointment_status}
                </span>
            </div>
        </div>
    );
}


function AppointmentsDashboard() {
    const { appointments, loading, error } = useAppointments(true)
    const navigate = useNavigate();
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
    }, { dependencies: [appointments.length] });

    if (loading) {
        return (
            <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-darkGray">
                Loading appointments... 
            </div>
        );
    }

    if (error) return <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-red-600 font-poppins">{error}</div>;


    const limitedAppointments = appointments.slice(0, 5);
    
    if (limitedAppointments.length === 0) {
        return (
             <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-gray-500">
                No upcoming appointments found.
            </div>
        );
    }
    
    const tableHeaderClass = "text-xs font-bold tracking-wider text-gray-400 p-3 border-b border-gray-100";

    return (
        <div className="bg-white rounded-[10px] overflow-hidden font-poppins" ref={containerRef}>
            
            <section className="flex justify-between items-center px-4 py-3" ref={headerRef}>
                <h1 className="text-lightGray font-medium text-[18px]">Appointments</h1>
                <button
                    className='text-customTealBlue font-medium text-sm hover:underline'
                    onClick={() => navigate('/appointments')}
                >
                    View all
                </button>
            </section>
            
            <div className="flex items-center bg-gray-50" ref={tableHeaderRef}>
                <div className={`${tableHeaderClass} w-1/4 min-w-[150px]`}>Assigned Doctor</div>
                <div className={`${tableHeaderClass} w-2/5 min-w-[200px]`}>Reason</div>
                <div className={`${tableHeaderClass} w-[15%]`}>Date</div>
                <div className={`${tableHeaderClass} w-1/5`}>Status</div>
            </div>

            <div className="divide-y divide-gray-100">
                {limitedAppointments.length > 0 ? (
                    limitedAppointments.map((appointment, index) => (
                    <AppointmentRow
                        key={appointment.id}
                        appointment={appointment}
                        index={index}
                    />
                ))
                ): (
                    <div ref={noDataRef} className="p-20 text-center text-gray-400 italic">No appointments found.</div>
                )}
            </div>
            
        </div>
    );
}

export default AppointmentsDashboard;