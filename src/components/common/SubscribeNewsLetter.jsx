import React from 'react'

const SubscribeNewsLetter = () => {
  return (
    <div className='font-dmsans py-[60px] w-[40%] mx-auto text-center'>
      <h1 className='text-[24px] text-[#333333]  font-bold mb-3'>Subscribe to our newsletter</h1>
      <div className="subscribe-email flex items-center justify-around ">
        <input type="text" placeholder='Enter your email' className='border-none outline-none placeholder:text-[14px] font-dmsans font-normal text-[#555555] w-3/4 px-6 py-[18px] rounded-[50px]' required />
        <button className='bg-customTealBlue text-white rounded-[30px] text-[14px] font-bold py-4 px-5'>Subscribe</button>
      </div>
    </div>
  )
}

export default SubscribeNewsLetter
