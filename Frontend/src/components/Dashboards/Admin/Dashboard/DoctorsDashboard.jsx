import { useDoctors } from '../../../../hooks/useDoctors'
import { useNavigate } from 'react-router-dom';

function getInitials(firstName, lastName){
    if(!firstName || !lastName) return ""
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}

function DoctorRow({ doctor, index }){
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

    return (
        <div 
            className={`${alternatingBg} flex items-center p-3 text-sm border-b border-gray-100 hover:bg-customTealBlue/[0.03] transition-colors cursor-pointer`}
        >
            <div className="flex items-center w-1/4 min-w-[150px] pr-2">
                {doctor_profile_image ? (
                    <img src={doctor_profile_image} alt="" className="w-8 h-8 rounded-full object-cover mr-3 shadow-sm" />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-xs mr-3 shrink-0">
                        {initials}
                    </div>
                )}
                <span className="font-semibold text-gray-800 truncate">
                    {doctor_first_name} {doctor_last_name}
                </span>
            </div>

            <div className="w-1/5 text-gray-600 truncate">
                {specialty}
            </div>


            <div className="w-[35%] text-gray-500 truncate">
                {doctor_email}
            </div>

            <div className="w-[35%] text-gray-500 truncate">
                {doctor_phone_number}
            </div>

            <div className="w-[10%] flex justify-end items-center">
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

    if (loading) {
        return (
            <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-darkGray">
                Loading top doctors... 
            </div>
        );
    }

    if (error) return <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-red-600 font-poppins">{error}</div>;

    const limitedDoctors = doctors.slice(0, 5)

    const tableHeaderClass = "text-xs font-bold tracking-wider text-gray-400 p-3 border-b border-gray-100";

    return (
        <div className="bg-white rounded-[10px] overflow-hidden font-poppins">
            <section className="flex justify-between items-center px-4 py-4">
                <h1 className="text-lightGray font-medium text-[18px]">Doctors</h1>
                <button
                    className='text-customTealBlue font-medium text-sm hover:underline'
                    onClick={() => navigate('/doctors')}
                >
                    View all
                </button>
            </section>
            
            {/* MATCHED HEADERS */}
            <div className="flex items-center bg-gray-50">
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