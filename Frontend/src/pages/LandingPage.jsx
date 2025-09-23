import React from 'react'

import Layout from '../components/Layout'
import LandingMain from "../components/landing/LandingMain.jsx";

const LandingPage = () => {
  return (
    <div className="bg-[#f3f3f3] xs:w-full xs:mx-auto">
      <Layout>
        <LandingMain />
      </Layout>
      
    </div>
  )
}

export default LandingPage
