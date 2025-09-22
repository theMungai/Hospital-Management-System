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
    <div className="bg-customWhite xs:w-full xs:mx-auto  ">
      <Layout>
        <ServiceHero />
          <div className="w-full max-w-[1280px] mx-auto">
              <div className=" xs:p-2 sm:p-6 md:p-10 lg:p-[50px]">
                  <FindDoctor />
              </div>
              <div className="xs:p-2 sm:p-6 md:p-10 lg:p-[50px]">
                  <Services />
              </div>
              <CustomerFeedBacks />
              <FAQ />
              <SubscribeNewsLetter />
          </div>



      </Layout>
    </div>
  )
}

export default ServicesPage
