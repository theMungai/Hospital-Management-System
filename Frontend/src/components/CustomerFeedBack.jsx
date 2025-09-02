import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalfStroke } from '@fortawesome/free-regular-svg-icons'

function FeedBack({image}){
    return (
        <div className = "px-[35px] py-[30px] xs:p-3 sm:p-6 rounded-[5px] border border-[#DEDEDE] font-montserrat bg-white ">
            <div className ="flex items-center text-[#F3CD03] mb-5">
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStarHalfStroke}/>
            </div>
            <p className = "text-[#737373] text-[13px] leading-6 my-5 ">I was incredibly nervous before my surgery, but the doctors and nurses made me feel completely at ease. Their professionalism, empathy, and constant reassurance turned a stressful situation into one I could handle with confidence. I’m truly grateful for the outstanding care I received.</p>

            <img src={`images/customer-${image}.jpg`} alt="Customer feedback" className = "w-[45px] h-[45px] rounded-full"/>
        </div>
    )
}

const CustomerFeedBacks = () => {
  return (
    <div className = "font-montserrat px-[130px] xs:p-2 sm:p-6 md:p-10 lg:p-[50px] mb-[100px]">
        <h1 className = "text-customTealBlue text-[36px] xs:text-[26px] sm:text-[26px] md:text-[28px] lg:text-[30px] font-extrabold text-center mb-2.5">what our customers say</h1>
        <p className ="text-[#555555] text-[16px] leading-8 text-center mb-[60px] mx-auto w-[60%] xs:w-full sm:w-full">Our patients consistently praise the care, compassion, and professionalism they receive at our hospital. From the moment they walk in, they feel heard, supported, and treated with the utmost respect. Whether it’s a routine visit or a life-saving procedure, we strive to deliver exceptional healthcare experiences every single time.</p>

        <div className="grid grid-cols-3 gap-5 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2" >
            <FeedBack image={1}/>
            <FeedBack image={2}/>
            <FeedBack image={3}/>
        </div>
        
    </div>
  )
}

export default CustomerFeedBacks
