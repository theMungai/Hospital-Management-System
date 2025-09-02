import React from 'react'
import Layout from '../components/Layout'
import Contact from '../components/Contact'
import SubscribeNewsLetter from '../components/common/SubscribeNewsLetter'

const ContactUsPage = () => {
  return (
    <div className="bg-customWhite">
      <Layout>
        <Contact/>
        <SubscribeNewsLetter />
      </Layout>
    </div>
  )
}

export default ContactUsPage
