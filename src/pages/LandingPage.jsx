import React from 'react'
import Layout from '../components/Layout'
import LandingMain from "../components/landing/LandingMain.jsx";

const LandingPage = () => {
  return (
    <div className="bg-customWhite xs:w-full xs:mx-auto">
      <Layout>
        <LandingMain />
      </Layout>
      
    </div>
  )
}

export default LandingPage
