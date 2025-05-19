import React from 'react'

const FindDoctor = () => {
  return (
    <div className="find-a-doctor-container p-10 mb-[150px] bg-white rounded-[16px] ">
        <h1 className='text-[32px] text-black font-dmsans font-bold mb-8'>Find A Doctor</h1>
        <form className="flex flex-wrap items-center gap-4 justify-between">
          <div className='flex gap-x-10 items-center'>
            <input type="text" placeholder="Name" required className="flex-1 min-w-[150px] w-[360px] p-4 outline-none border border-customTealBlue rounded-[8px] [8px] placeholder:text-[16px] text-[#555555] font-light"/>

            <input type="text" placeholder="Speciality" required className="flex-1 min-w-[150px] w-[360px] p-4 outline-none border border-customTealBlue rounded-[8px] [8px] placeholder:text-[16px] text-[#555555] font-light"/>
          </div>

          <label className="flex items-center gap-x-6">
            <span className="text-[20px] font-medium text-gray-700">Available</span>
            <div className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-16 h-6 bg-white border border-gray-400 rounded-full peer-checked:bg-white peer-checked:border-customTealBlue transition duration-300"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full transition-transform duration-300 peer-checked:translate-x-10 peer-checked:bg-customTealBlue "></div>
            </div>
          </label>

          <button className="bg-customTealBlue text-white font-dmsans text-[1.25rem] rounded-[8px] py-[20px] px-[80px]">
            Search
          </button>
        </form>

      </div>
  )
}

export default FindDoctor
