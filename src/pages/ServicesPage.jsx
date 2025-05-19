import React from 'react'
import Layout from '../components/Layout'
import ServiceHero from '../components/ServiceHero'
import FindDoctor from '../components/common/FindDoctor'
import Services from '../components/landing/Services'
import FAQ from '../components/FAQ'
import CustomerFeedBacks from '../components/CustomerFeedBack'
import SubscribeNewsLetter from '../components/common/SubscribeNewsLetter'

const ServicesPage = () => {
  return (
    <div className="bg-customWhite h-auto">
      <Layout>
        <ServiceHero />
        <div className="px-[130px]">
          <FindDoctor />
        </div>
        <Services />
        <CustomerFeedBacks />
        <FAQ />
        <SubscribeNewsLetter />
      </Layout>
    </div>
  )
}

export default ServicesPage
