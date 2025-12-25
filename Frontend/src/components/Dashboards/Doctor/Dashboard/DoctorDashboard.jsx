import React from 'react';

import Layout from "../../Admin/Layout.jsx";
import RecentPatients from '../../Admin/Dashboard/RecentPatients.jsx';
import AppointmentsDashboard from '../../Admin/Dashboard/AppointmentsDashboard.jsx';
import DoctorMetrics from '../DoctorMetrics.jsx';
import DashboardNotifications from '../../Admin/Dashboard/DashboardNotifications.jsx';
import TopPractitioners from '../../Admin/Dashboard/TopPractitioners.jsx';
import PatientsAnalytics from './PatientsAnalyticsdoctor.jsx';



const DoctorDashboard = () => {
  return (
    <Layout>
        <section className='px-8 py-9 font-poppins overflow-y-auto'>
          <h2 className="text-customTealBlue font-bold mb-7 text-lg">Doctor Dashboard</h2>

          <div className="mt-6 flex xs:flex-col sm:flex-col md:flex-col flex-row gap-6">
            <div className="w-2/3 xs:w-full sm:w-full md:w-full space-y-6">
              <section className='flex  gap-x-6'>
                <DoctorMetrics />
                <PatientsAnalytics />
              </section>
              <AppointmentsDashboard />
              <RecentPatients />
            </div>

            <div className="w-1/3 xs:w-full sm:w-full md:w-full space-y-6">
                <TopPractitioners/>
                <DashboardNotifications />

            </div>
          </div>
        </section>
    </Layout>
  );
};

export default DoctorDashboard;