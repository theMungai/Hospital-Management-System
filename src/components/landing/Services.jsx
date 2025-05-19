import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function ServiceType({image, title }){
  return(
    <div className='p-5 font-dmsans w-[32%] bg-white rounded-[24px]'>
      <img src={`images/services-${image}.jpg`} alt=""  className='w-full h-[250px] object-cover rounded-[10px]'/>
      <h2 className='text-customTealBlue font-bold text-[20px] my-5'>{title}</h2>
      <p className='text-[15px] leading-[1.8rem] w-full text-[#555555] mb-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil id sapiente blanditiis saepe fuga eligendi aut accusantium itaque ex autem, consequuntur fugit, dolorem, est illum expedita assumenda consectetur odit nesciunt.</p>

      <button className='flex items-center gap-x-3 font-bold text-customTealBlue text-[16px]'>
        Learn more
        <FontAwesomeIcon icon={faArrowRight}/>
      </button>
    </div>
  )
}

const Services = () => {
  return (
    <div className='font-dmsans mb-[150px] px-[130px]'>
      <h1 className='text-customTealBlue text-[32px] mb-[20px] font-bold text-center'>Services we provide</h1>
      <p className='leading-[1.7rem] text-[16px] text-[#555555] text-center mx-auto w-[40%] mb-[60px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan. </p>

      <div className="services-container flex justify-between gap-[22px] flex-wrap">
        <ServiceType image="dental" title="Dental treatments"/>

        <ServiceType image="bones" title="Bone treatments"/>

        <ServiceType image="diagnosis" title="Diagnosis"/>

        <ServiceType image="cardiology" title="Cardiology"/>

        <ServiceType image="surgery" title="Surgery"/>

        <ServiceType image="eye-care" title="Eye care"/>
      </div>
    </div>
  )
}

export default Services
