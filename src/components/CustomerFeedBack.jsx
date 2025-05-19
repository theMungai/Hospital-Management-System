import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalfStroke } from '@fortawesome/free-regular-svg-icons'

function FeedBack({image}){
    return (
        <div className = "px-[35px] py-[30px] rounded-[5px] border border-[#DEDEDE] font-montserrat w-[30%] bg-white ">
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
    <div className = "font-montserrat px-[130px] mb-[100px]">
        <h1 className = "text-customTealBlue text-[36px] font-extrabold text-center mb-2.5">what our customers say</h1>
        <p className ="text-[#555555] text-[16px] text-center mb-[60px] mx-auto w-[60%]">Our patients consistently praise the care, compassion, and professionalism they receive at our hospital. From the moment they walk in, they feel heard, supported, and treated with the utmost respect. Whether it’s a routine visit or a life-saving procedure, we strive to deliver exceptional healthcare experiences every single time.</p>

        <div className="flex justify-between items-center" >
            <FeedBack image={1}/>
            <FeedBack image={2}/>
            <FeedBack image={3}/>
        </div>
        
    </div>
  )
}

export default CustomerFeedBacks
