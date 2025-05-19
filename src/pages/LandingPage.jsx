import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/landing/Hero'
import Services from '../components/landing/Services'
import TeamMembers from '../components/landing/TeamMembers'
import Testimonials from '../components/landing/Testimonials'
import CompanyTrust from '../components/landing/CompanyTrust'
import SubscribeNewsLetter from '../components/common/SubscribeNewsLetter'

const LandingPage = () => {
  return (
    <div className="bg-customWhite">
      <Layout>
        <Hero/>
        <Services/>
        <TeamMembers/>
        <Testimonials/>
        <CompanyTrust/>
        <SubscribeNewsLetter/>
      </Layout>
      
    </div>
  )
}

export default LandingPage
