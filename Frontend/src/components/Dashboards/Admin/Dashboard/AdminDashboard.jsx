import React from 'react';
import Layout from "../Layout.jsx";
import Welcome from "./Welcome.jsx";

const AdminDashboard = () => {
  return (
      <Layout>
          <div className="px-8 py-9 font-poppins">
              <h2 className="text-customTealBlue font-bold mb-7 text-lg">Dashboard</h2>

              <Welcome />
          </div>
      </Layout>
  );
};

export default AdminDashboard;