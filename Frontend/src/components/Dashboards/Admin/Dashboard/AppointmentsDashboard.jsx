import { useAppointments } from '../../../../hooks/useAppointments';
import { useNavigate } from 'react-router-dom';


function getInitials (firstName, lastName){
    if (!firstName || !lastName) return "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};


function AppointmentRow({ appointment, index }) {

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
            className={`bg-white flex items-center p-3 text-base border-b border-gray-100 hover:bg-customTealBlue/[0.03] transition-colors cursor-pointer`}
        >
            
            <div className="flex items-center w-1/4 min-w-[150px] pr-2">
                {doctor_profile_image ? (
                    <img
                        src={doctor_profile_image}
                        alt={`${doctor_first_name}`}
                        className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-xs mr-2">
                        {initials}
                    </div>
                )}
                <div>
                    <p className="font-semibold text-base text-darkGray mb-1">{doctor_first_name} {doctor_last_name}</p>
                    <p className="text-sm text-gray-500 italic">{specialty}</p>
                </div>
            </div>

            <div className="w-2/5 min-w-[200px] text-gray-700 truncate pr-2">
                {reason_for_visit}
            </div>

            <div className="w-[15%] text-gray-600 font-medium whitespace-nowrap pr-2">
                {formattedDate}
            </div>

            <div className="w-1/5 text-left">
                <span className={`inline-block px-3 py-1 text-base font-semibold rounded-lg ${statusBadgeClass}`}>
                    {appointment_status}
                </span>
            </div>
        </div>
    );
}


function AppointmentsDashboard() {
    const { appointments, loading, error } = useAppointments(true)
    const navigate = useNavigate();

    if (loading) {
        return <div className="p-4 text-center text-gray-500">Loading appointments...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-600">{error}</div>;
    }

    const limitedAppointments = appointments.slice(0, 5);
    
    if (limitedAppointments.length === 0) {
        return (
             <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-gray-500">
                No upcoming appointments found.
            </div>
        );
    }
    
    const tableHeaderClass = "text-xs font-semibold text-gray-500 p-3 border-b border-gray-200";

    return (
        <div className="bg-white rounded-[6px]  border-[0.1px] border-[#4F4F4F]/[0.1] overflow-hidden">
            
            <section className="flex justify-between items-center px-4 py-3">
                <h1 className="text-darkGray font-bold text-[20px]">Appointments</h1>
                <button
                    className='text-customTealBlue font-medium text-sm hover:underline'
                    onClick={() => navigate('/appointments')}
                >
                    View all
                </button>
            </section>
            
            <div className="flex items-center bg-gray-50">
                <div className={`${tableHeaderClass} w-1/4 min-w-[150px]`}>Assigned Doctor</div>
                <div className={`${tableHeaderClass} w-2/5 min-w-[200px]`}>Reason</div>
                <div className={`${tableHeaderClass} w-[15%]`}>Date</div>
                <div className={`${tableHeaderClass} w-1/5`}>Status</div>
            </div>

            <div className="divide-y divide-gray-100">
                {limitedAppointments.map((appointment, index) => (
                    <AppointmentRow
                        key={appointment.id}
                        appointment={appointment}
                        index={index}
                    />
                ))}
            </div>
            
        </div>
    );
}

export default AppointmentsDashboard;