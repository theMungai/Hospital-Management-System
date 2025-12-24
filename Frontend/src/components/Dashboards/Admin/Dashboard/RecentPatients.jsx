import { useRef } from 'react';
import { usePatients } from "../../../../hooks/usePatients";
import { useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import DashboardShimmer from '../../../../utils/loadingSkeletons/dashboardLoadingSkeletons';


function getInitials (firstName, lastName){
    if (!firstName || !lastName) return "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};

function PatientRow({ patient, index }) {
    const rowRef = useRef(null)

    const {
        patient_first_name,
        patient_last_name,
        patient_profile_image,
        patient_date_joined,
        gender,
        Disease,
        patient_email
    } = patient;

    const initials = getInitials(patient_first_name, patient_last_name);

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


            const patientImg = rowRef.current.querySelector(".patient-img")
            const patientName = rowRef.current.querySelector(".patient-name")
            const dateJoined = rowRef.current.querySelector(".date-joined")
            const gender = rowRef.current.querySelector(".gender")
            const diagnose = rowRef.current.querySelector(".diagnose")
            const email = rowRef.current.querySelector(".email")

            if (patientImg){
                gsap.set(patientImg, { scale: 0})
            }

            const textElements = [patientName, dateJoined, gender, diagnose, email]
            gsap.set(textElements, { x: -20, opacity: 0 })

            const rowDelay = 0.2 + (index * 0.08)

            gsap.to(patientImg, {
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
     
        
    const formattedDate = patient_date_joined 
        ? new Date(patient_date_joined).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'N/A';

    return (
        <div 
            ref={rowRef}
            className={`bg-white flex items-center p-3 text-sm border-b border-gray-100 hover:bg-customTealBlue/[0.03] transition-colors cursor-pointer`}
        >
            <div className="flex items-center w-1/4 min-w-[150px] pr-2">
                {patient_profile_image ? (
                    <img
                        src={patient_profile_image}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover mr-3 shadow-sm patient-img"
                    />
                ) : (
                    <div className="patient-img w-8 h-8 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-xs mr-3 shrink-0">
                        {initials}
                    </div>
                )}
                <span className="font-medium text-gray-800 truncate patient-name">
                    {patient_first_name} {patient_last_name}
                </span>
            </div>

            <div className="w-[15%] min-w-[120px] text-gray-600 pr-2 date-joined">
                {formattedDate}
            </div>

            <div className="w-[10%] text-gray-600 pr-2 gender">
                {gender}
            </div>

            <div className="w-[20%] text-gray-600 truncate pr-2 diagnose" title={Disease}>
                {Disease}
            </div>

            <div className="w-[30%] text-gray-500 truncate email">
                {patient_email}
            </div>
        </div>
    );
}
function RecentPatients() {
    const { patients, loading, error} = usePatients(true)
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

        if (patients.length === 0 && noDataRef.current) {
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
    }, { dependencies: [patients.length] });


    if (loading) {
        return DashboardShimmer()
    }

    if (error) return <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-red-600 font-poppins">{error}</div>;



    const limitedPatients = patients.slice(0, 5)


    if (limitedPatients.length === 0){
        return (
             <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-gray-500">
                No upcoming patients found.
            </div>
        );
    }



    const tableHeaderClass = "text-xs font-bold tracking-wider text-gray-400 p-3 border-b border-gray-100";

    return (
        <div className="bg-white rounded-[6px] overflow-hidden" ref={containerRef}>
            
            <section className="flex justify-between items-center px-4 py-3" ref={headerRef}>
                <h1 className="text-lightGray font-medium text-[18px]">Recent Patients</h1>
                <button
                    className='text-customTealBlue font-medium text-sm hover:underline'
                    onClick={() => navigate('/patients')}
                >
                    View all
                </button>
            </section>
            
            <div className="flex items-center bg-gray-50" ref={tableHeaderRef}>
                <div className={`${tableHeaderClass} w-[25%] min-w-[150px]`}>Patient Name</div>
                <div className={`${tableHeaderClass} w-[15%] min-w-[120px]`}>Date Joined</div>
                <div className={`${tableHeaderClass} w-[10%]`}>Gender</div>
                <div className={`${tableHeaderClass} w-[20%]`}>Diagnosis</div>
                <div className={`${tableHeaderClass} w-[30%]`}>Email</div>
            </div>

            <div className="divide-y divide-gray-100">
                {limitedPatients.map((patient, index) => (
                    <PatientRow
                        key={patient.id}
                        patient={patient}
                        index={index}
                    />
                ))}
            </div>
            
        </div>
    );
}

export default RecentPatients;