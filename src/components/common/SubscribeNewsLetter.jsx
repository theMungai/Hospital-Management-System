import React from 'react'

const SubscribeNewsLetter = () => {
  return (
    <div className='font-dmsans py-[60px] w-[40%] xs:w-[95%] sm:w-[90%] md:w-[75%] mx-auto text-center'>
      <h1 className='text-[24px] xs:text-[20px] sm:text-[22px] text-[#333333]  font-bold mb-3'>Subscribe to our newsletter</h1>
      <div className="subscribe-email flex items-center justify-around xs:flex-col gap-y-7 ">
        <input type="text" required placeholder='Enter your email' className='border-none outline-none placeholder:text-[14px] font-dmsans font-normal text-[#555555] w-3/4 px-6 py-[18px] rounded-[50px] xs:w-full sm:w-full md:w-full xs:py-4 sm:py-4 ' />
        <button className='bg-customTealBlue text-white rounded-[30px] text-[14px] font-bold py-4 px-5 xs:px-7 sm:px-7 md:px-6'>Subscribe</button>
      </div>
    </div>
  )
}

export default SubscribeNewsLetter
