import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function FAQBluePrint() {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive((prev) => !prev);
  }

  return (
    <div className='font-montserrat mb-6 bg-white p-6 xs:p-3 sm:p-6 xs:mb-1 sm:mb-3 rounded-[10px]'>
      <div className='flex gap-x-5 cursor-pointer' onClick={handleClick}>
        <FontAwesomeIcon
          icon={isActive ? faChevronDown : faChevronRight}
          className='text-[#23A6F0] transition-transform duration-600 ease-in-out'
        />
        <p className='question text-[15px] text-[#252B42] font-extrabold'>
          What is the process for booking an appointment with a doctor at the hospital?
        </p>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isActive ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <p className='answer text-[#737373] text-[13px] leading-[1.8rem]'>
          You can book an appointment by calling our reception desk during working hours or using the online booking system available on our website.
        </p>
      </div>
    </div>
  );
}


const FAQ = () => {
  return (
    <div className='font-montserrat xs:p-2 sm:p-6 md:p-10 lg:p-[50px]'>
      <h1 className='mb-2.5 text-[36px] xs:text-[26px] sm:text-[26px] md:text-[28px] lg:text-[30px]text-[#252B42] text-center font-extrabold font-montserrat'>FAQ</h1>
      <p className='mb-[80px] text-center font-normal leading-5 text-[#737373] text-[14px]'>Find quick answers to common questions. Need more help? Just contact us.</p>

      <div className='grid grid-cols-3 gap-5 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2'>
        <FAQBluePrint />
        <FAQBluePrint />
        <FAQBluePrint />
        <FAQBluePrint />
        <FAQBluePrint />
        <FAQBluePrint />
        <FAQBluePrint />
        <FAQBluePrint />
        <FAQBluePrint />
      </div>
    </div>
  )
}

export default FAQ
