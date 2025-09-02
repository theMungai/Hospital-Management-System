import React from 'react'
import Inputs from "./common/Inputs.jsx";

const Contact = () => {
  return (
    <div className="bg-customWhite">
      <div className="hero relative  mb-[150px] xs:mb-20 sm:mb-[100px] md:mb-[120px] py-10 bg-[url('/images/service-hero.jpg')] bg-cover bg-center min-h-screen grid ">
        <div className="absolute top-0 inset-0 bg-black/50 z-0"></div>
      </div>

      <div className="container font-dmsans px-[210px] xs:p-2 sm:p-6 md:p-10 lg:p-[50px]">
        <h3 className='text-[#282938] text-center font-bold mb-7 xs:mb-3 sm:mb-4 text-[20px]'>Get In Touch</h3>
        <h1 className='text-[#333333] text-[60px] xs:text-[32px] sm:text-[36px] md:text-[50px] font-extrabold text-center mb-8 xs:mb-3 sm:mb-4 '>Contact Us</h1>
        <p className='mb-20 xs:mb-12 sm:mb-14 md:mb-16 font-normal text-[#555555] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>

        <form>
            <div className='flex justify-between items-center mb-8 xs:flex-col sm:flex-col'>
                <Inputs placeholder="Enter your last name" label="First name" text="text" basis="[48%]"/>
                <Inputs placeholder="Enter your first name" label="Last name" text="text" basis="[48%]"/>
            </div>

            <div className='flex justify-between items-center mb-8 xs:flex-col sm:flex-col'>
                <Inputs placeholder="Enter your your email" label="Email" text="email" basis="[48%]"/>
                <Inputs placeholder="Enter your phone number" label="Phone number" text="number" basis="[48%]"/>
            </div>

            <label>
                <span className='mb-2.5 text-[#282938] font-normal text-[19px] block '>Choose a topic</span>
                <select  name="choose-a-topic"  id="choose-a-topic"  required  className='mb-8 p-4 text-[1rem] text-[#282938] border border-customTealBlue outline-none rounded-[6px] w-full bg-customWhite'>
                    <option value="" disabled selected>Select a topic</option>
                    <option value="appointments">Appointments & Scheduling</option>
                    <option value="billing">Billing & Insurance Inquiries</option>
                    <option value="medical-records">Medical Records Request</option>
                    <option value="medical-records">COVID-19 Information & Testing</option>
                    <option value="medical-records">Lab Results or Reports</option>
                    <option value="feedback">Feedback & Complaints</option>
                    <option value="prescriptions">Prescription Refills</option>
                    <option value="doctor-info">Doctor or Department Information</option>
                    <option value="emergency">Emergency Assistance</option>
                    <option value="careers">Career Opportunities</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="general">General Inquiries</option>
                </select>   
            </label>

            <label>
                <span className='mb-2.5 text-[#282938] font-normal text-[19px] block '>Message</span>
                <textarea name="message" id="message" required placeholder='Type your nessage' className='min-h-[200px] xs:min-h-[120px] sm:min-h-[150px] mb-8 p-4 text-[1rem] text-[#282938] border border-customTealBlue outline-none rounded-[6px] w-full bg-customWhite ' ></textarea>
            </label>
            <label className='flex items-center gap-x-4 mb-8'>
                <input  type="checkbox"  name="accept-terms"  id="accept-terms"  className="w-5 h-5 rounded-[4px] border border-customTealBlue  checked:bg-customTealBlue accent-customTealBlue checked:border-customTealBlue focus:outline-none"/>
                <span>I accept the terms</span>
            </label>
            <button className='py-5 xs:py-3 sm:py-4 mb-mb-[150px] xs:mb-20 sm:mb-[100px] md:mb-[120px]  px-[150px] xs:px-28 sm:px-32 md:px-36 bg-customTealBlue rounded-[8px] font-[500] font-dmsans text-[19px] text-white relative transform -translate-x-1/2 left-1/2'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
