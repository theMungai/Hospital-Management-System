import React from 'react';
import Layout from "../Layout.jsx";
import Welcome from "./Welcome.jsx";
import Metrics from "./Metrics.jsx";
import PatientsAnalytics from "./PatientsAnalytics.jsx";
import AppointmentsDashboard from "./AppointmentsDashboard.jsx";
import RecentPatients from "./RecentPatients.jsx";
import TopPractitioners from "./TopPractitioners.jsx";
import DashboardNotifications from "./DashboardNotifications.jsx";
import Doctors from "./Doctors.jsx";


const AdminDashboard = () => {
    return (
        <Layout>
            <div className="px-8 py-9 font-poppins overflow-y-auto">
                <h2 className="text-customTealBlue font-bold mb-7 text-lg">Dashboard</h2>

                <Welcome />
                <Metrics />

                <div className="mt-6 flex xs:flex-col sm:flex-col md:flex-col flex-row gap-6">
                    <div className="w-2/3 xs:w-full sm:w-full md:w-full space-y-6">
                        <PatientsAnalytics />
                        <AppointmentsDashboard />
                        <RecentPatients />
                        <Doctors />
                    </div>

                    <div className="w-1/3 xs:w-full sm:w-full md:w-full space-y-6">
                        <TopPractitioners />
                        <DashboardNotifications />

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;