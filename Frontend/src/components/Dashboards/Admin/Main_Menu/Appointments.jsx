import { useAppointments } from "../../../../hooks/useAppointments.js";
import Layout from "../Layout.jsx";

function getInitials (firstName, lastName){
    if (!firstName || !lastName) return "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};

function AppointmentRow({ appointment, index }) {

    const {
        first_name,
        last_name,
        profile_image,
        specialty,
        reason_for_visit,
        appointment_date,
        appointment_status,
        duration_minutes,
        appointment_type
    } = appointment;
    
    const initials = getInitials(first_name, last_name);

    const alternatingBgClass = index % 2 === 0 
        ? 'bg-white' 
        : 'bg-customTealBlue/[0.04]'; 
    
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
            className={`flex items-center p-3 text-sm border-b border-gray-100 hover:bg-customTealBlue/[0.08] cursor-pointer ${alternatingBgClass}`}
        >
            <div className="flex items-center flex-1 min-w-[150px] pr-2"> 
                {profile_image ? (
                    <img
                        src={profile_image}
                        alt={`${first_name}`}
                        className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-xs mr-2">
                        {initials}
                    </div>
                )}
                <div>
                    <p className="font-semibold text-base text-darkGray mb-1">{first_name} {last_name}</p>
                    <p className="text-sm text-gray-500 italic">{specialty}</p>
                </div>
            </div>
            <div className="flex-1 min-w-[200px] text-gray-700 truncate pr-2">
                {reason_for_visit}
            </div>

            <div className="w-[10%] text-gray-600 font-medium whitespace-nowrap pr-2">
                {formattedDate}
            </div>

            <div className="w-[15%] text-gray-600 font-medium whitespace-nowrap pr-2">
                {duration_minutes} min
            </div>

            <div className="w-[15%] text-gray-600 font-medium whitespace-nowrap pr-2">
                {appointment_type}
            </div>

            <div className="w-[15%]">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${statusBadgeClass}`}>
                    {appointment_status}
                </span>
            </div>
        </div>
    );
}


function Appointments() {
    const { appointments, loading, error } = useAppointments()

    if (loading) {
        return <div className="p-4 text-center text-gray-500">Loading appointments...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-600">{error}</div>;
    }


    const tableHeaderClass = "text-xs font-semibold text-gray-500 p-3 border-b border-gray-200";

    return (
        <Layout>
            <div className="px-8 py-9 overflow-y-auto  rounded-[6px] font-poppins overflow-hidden">
            
            <section className="">
                <h2 className="text-customTealBlue font-bold mb-7 text-lg">Appointments</h2>
                
            </section>
            
            <div className="flex items-center bg-gray-50">
                <div className={`${tableHeaderClass} flex-1 min-w-[150px]`}>Assigned Doctor</div>
                <div className={`${tableHeaderClass} flex-1 min-w-[200px]`}>Reason</div>
                <div className={`${tableHeaderClass} w-[10%]`}>Date</div>
                <div className={`${tableHeaderClass} w-[15%]`}>Duration</div>
                <div className={`${tableHeaderClass} w-[15%]`}>Type</div>
                <div className={`${tableHeaderClass} w-[15%] `}>Status</div>
            </div>

            <div className="divide-y divide-gray-100">
                {appointments.map((appointment) => (
                    <AppointmentRow
                        key={appointment.id}
                        appointment={appointment}
                    />
                ))}
            </div>
            
        </div>
        </Layout>
    );
}

export default Appointments;