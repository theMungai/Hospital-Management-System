import React from 'react';
import Layout from "../Layout.jsx";
import Welcome from "./Welcome.jsx";
import Metrics from "./Metrics.jsx";
import PatientsAnalytics from "./PatientsAnalytics.jsx";

const AdminDashboard = () => {
  return (
      <Layout>
          <div className="px-8 py-9 font-poppins">
              <h2 className="text-customTealBlue font-bold mb-7 text-lg">Dashboard</h2>

              <Welcome />
              <Metrics />
              <PatientsAnalytics />
          </div>
      </Layout>
  );
};

export default AdminDashboard;