import { useRef } from 'react';
import { useDoctors } from '../../../../hooks/useDoctors'
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import DashboardShimmer from '../../../../utils/loadingSkeletons/dashboardLoadingSkeletons';

function getInitials(firstName, lastName){
    if(!firstName || !lastName) return ""
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}

function DoctorRow({ doctor, index }){
    const rowRef = useRef(null)
    const {
        doctor_first_name,
        doctor_last_name,
        doctor_profile_image,
        specialty,
        doctor_email,
        doctor_phone_number,
        availability_status
    } = doctor

    const initials = getInitials(doctor_first_name, doctor_last_name)

    const alternatingBg = index % 2 === 0 ? 'bg-white' : 'bg-customTealBlue/[0.02]';

    useGSAP(() => {
        if(rowRef.current){
            gsap.set(rowRef.current, { y: -20, opacity: 0})


            gsap.to(rowRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.2 + (index * 0.08),
                ease: "back.out(1.2)"
            })


            const doctorImg = rowRef.current?.querySelector('.doctor-img');
            const doctorName = rowRef.current?.querySelector('.doctor-name');
            const doctorSpecialty = rowRef.current?.querySelector('.specialty');
            const email = rowRef.current.querySelector(".email")
            const phoneNumber = rowRef.current.querySelector(".phone")
            const status = rowRef.current.querySelector(".status")

            if (doctorImg){
                gsap.set(doctorImg, { scale: 0})
            }

            const textElements = [doctorName, email, phoneNumber, status, doctorSpecialty]
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
    },[index])

    return (
        <div 
            ref={rowRef}
            className={`${alternatingBg} flex items-center p-3 text-sm border-b border-gray-100 hover:bg-customTealBlue/[0.03] transition-colors cursor-pointer`}
        >
            <div className="flex items-center w-1/4 min-w-[150px] pr-2">
                {doctor_profile_image ? (
                    <img src={doctor_profile_image} alt="" className="w-8 h-8 rounded-full object-cover mr-3 shadow-sm doctor-img" />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-xs mr-3 shrink-0 doctor-img">
                        {initials}
                    </div>
                )}
                <span className="font-semibold text-gray-800 truncate doctor-name">
                    {doctor_first_name} {doctor_last_name}
                </span>
            </div>

            <div className="w-1/5 text-gray-600 truncate specialty">
                {specialty}
            </div>


            <div className="w-[35%] text-gray-500 truncate email">
                {doctor_email}
            </div>

            <div className="w-[35%] text-gray-500 truncate phone">
                {doctor_phone_number}
            </div>

            <div className="w-[10%] flex justify-end items-center status">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full transition-all">
                    <div className="relative flex h-2 w-2">
                        {availability_status === 'Available' && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-customGreen opacity-75"></span>
                        )}
                        <span 
                            className={`relative inline-flex rounded-full h-2 w-2 ${
                                availability_status === 'Available' ? 'bg-customGreen' : 'bg-lightGray'
                            }`}
                        ></span>
                    </div>
                    

                    <span className={`text-[11px] font-bold tracking-wider ${
                        availability_status === 'Available' ? 'text-customGreen' : 'text-lightGray'
                    }`}>
                        {availability_status || 'Unavailable'}
                    </span>
                </div>
            </div>
        </div>
    );
}

function DoctorsDashboard() {
    const { doctors, loading, error } = useDoctors(true)
    const navigate = useNavigate()
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

    if(loading){
        return DashboardShimmer()
    }

    if (error) return <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-red-600 font-poppins">{error}</div>;

    const limitedDoctors = doctors.slice(0, 5)

    const tableHeaderClass = "text-xs font-bold tracking-wider text-gray-400 p-3 border-b border-gray-100";

    return (
        <div className="bg-white rounded-[10px] overflow-hidden font-poppins"  ref={containerRef}>
            <section className="flex justify-between items-center px-4 py-4" ref={headerRef}>
                <h1 className="text-lightGray font-medium text-[18px]">Doctors</h1>
                <button
                    className='text-customTealBlue font-medium text-sm hover:underline'
                    onClick={() => navigate('/doctors')}
                >
                    View all
                </button>
            </section>
            
            {/* MATCHED HEADERS */}
            <div className="flex items-center bg-gray-50" ref={headerRef}>
                <div className={`${tableHeaderClass} w-1/4`}>Doctor</div>
                <div className={`${tableHeaderClass} w-1/5`}>Specialty</div>
                <div className={`${tableHeaderClass} w-[35%]`}>Contact Email</div>
                <div className={`${tableHeaderClass} w-[35%]`}>Phone Number</div>
                <div className={`${tableHeaderClass} w-[10%]`}>Status</div>
            </div>

            <div className="divide-y divide-gray-50">
                {limitedDoctors.map((doctor, index) => (
                    <DoctorRow key={doctor.id} doctor={doctor} index={index} />
                ))}
            </div>
        </div>
    );
}

export default DoctorsDashboard;