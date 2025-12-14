import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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
    } = appointment;
    
    const initials = getInitials(first_name, last_name);

    const alternatingBgClass = index % 2 === 0 
        ? 'bg-white' 
        : 'bg-customTealBlue/[0.04]'; 
    
    const statusClassMap = {
        Scheduled: 'bg-yellow-100 text-yellow-800',
        Completed: 'bg-green-100 text-green-800',
        Pending: 'bg-blue-100 text-blue-800',
        Canceled: 'bg-red-100 text-red-800',
    };
    
    const statusBadgeClass = statusClassMap[status] || 'bg-gray-100 text-gray-800';

    const formattedDate = new Date(appointment_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    return (

        <div 
            className={`flex items-center p-3 text-sm border-b border-gray-100 hover:bg-customTealBlue/[0.08] cursor-pointer ${alternatingBgClass}`}
        >
            
            <div className="flex items-center w-1/4 min-w-[150px] pr-2">
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

            <div className="w-2/5 min-w-[200px] text-gray-700 truncate pr-2">
                {reason_for_visit}
            </div>

            <div className="w-[15%] text-gray-600 font-medium whitespace-nowrap pr-2">
                {formattedDate}
            </div>

            <div className="w-1/5 text-right">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusBadgeClass}`}>
                    {appointment_status}
                </span>
            </div>
        </div>
    );
}


function Appointments() {
    const [appointments, setAppointments] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAppointments() {
            try {
                const response = await fetch('/appointments');
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data?.detail || 'Failed to fetch appointments');
                }

                setAppointments(data);
            } catch (err) {
                console.error("Error fetching appointments:", err.message);
                setError("Failed to load appointments data.");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);


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
                <div className={`${tableHeaderClass} w-1/5 text-right`}>Status</div>
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

export default Appointments;