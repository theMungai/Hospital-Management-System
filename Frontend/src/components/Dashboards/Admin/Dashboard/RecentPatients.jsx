import { usePatients } from "../../../../hooks/usePatients";
import { useNavigate } from "react-router-dom";


function getInitials (firstName, lastName){
    if (!firstName || !lastName) return "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};

function PatientRow({ patient, index }) {
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
    
    const alternatingBgClass = index % 2 === 0 
        ? 'bg-customTealBlue/[0.05]' 
        : 'bg-white'; 
        
    const formattedDate = patient_date_joined 
        ? new Date(patient_date_joined).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'N/A';

    return (
        <div 
            className={`flex items-center p-3 text-base border-b border-gray-100 hover:bg-customTealBlue/[0.08] transition-colors cursor-pointer ${alternatingBgClass}`}
        >
            <div className="flex items-center w-1/4 min-w-[150px] pr-2">
                {patient_profile_image ? (
                    <img
                        src={patient_profile_image}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover mr-3 shadow-sm"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-xs mr-3 shrink-0">
                        {initials}
                    </div>
                )}
                <span className="font-medium text-gray-800 truncate">
                    {patient_first_name} {patient_last_name}
                </span>
            </div>

            <div className="w-[15%] min-w-[120px] text-gray-600 pr-2">
                {formattedDate}
            </div>

            <div className="w-[10%] text-gray-600 pr-2">
                {gender}
            </div>

            <div className="w-[20%] text-gray-600 truncate pr-2" title={Disease}>
                {Disease}
            </div>

            <div className="w-[30%] text-gray-500 truncate italic">
                {patient_email}
            </div>
        </div>
    );
}
function RecentPatients() {
    const { patients, loading, error} = usePatients(true)
    const navigate = useNavigate()


    if (loading){
        return <div></div>
    }


    if (error){
        return <div>{error}</div>
    }


    const limitedPatients = patients.slice(0, 5)


    if (limitedPatients.length === 0){
        return (
             <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-gray-500">
                No upcoming patients found.
            </div>
        );
    }



    const tableHeaderClass = "text-base text-gray-500 p-3 border-b border-gray-200";

    return (
        <div className="bg-white rounded-[6px]  border-[0.1px] border-[#4F4F4F]/[0.1] overflow-hidden">
            
            <section className="flex justify-between items-center px-4 py-3">
                <h1 className="text-darkGray font-bold text-[20px]">Recent Patients</h1>
                <button
                    className='text-customTealBlue font-medium text-sm hover:underline'
                    onClick={() => navigate('/patients')}
                >
                    View all
                </button>
            </section>
            
            <div className="flex items-center bg-white">
                <div className={`${tableHeaderClass} w-[25%] min-w-[150px]`}>Patient Name</div>
                <div className={`${tableHeaderClass} w-[15%] min-w-[120px]`}>Date Joined</div>
                <div className={`${tableHeaderClass} w-[10%]`}>Gender</div>
                <div className={`${tableHeaderClass} w-[20%]`}>Disease</div>
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