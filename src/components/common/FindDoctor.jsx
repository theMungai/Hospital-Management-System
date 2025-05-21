import React from 'react';

const FindDoctor = () => {
  return (
      <div className="find-a-doctor-container w-full relative p-10 xs:p-3 sm:p-4 md:p-5 lg:p-6 mb-[150px] xs:mb-20 sm:mb-[100px] md:mb-[120px] bg-white rounded-[16px]">
        <h1 className="text-[32px] text-black font-dmsans font-bold mb-8 xs:text-[26px] sm:text-[26px] md:text-[28px] lg:text-[30px]">
          Find A Doctor
        </h1>

        <form className="grid gap-6 grid-cols-[1fr_1fr_0.5fr_0.5fr] xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 text-center">
        <input
                type="text"
                placeholder="Name"
                required
                className="w-full p-4 outline-none border border-customTealBlue rounded-[8px] placeholder:text-[16px] text-[#555555] font-light"
            />

            <input
                type="text"
                placeholder="Speciality"
                required
                className="w-full p-4 outline-none border border-customTealBlue rounded-[8px] placeholder:text-[16px] text-[#555555] font-light"
            />


          <label className="items-center gap-x-6 xs:flex-col sm:flex-row sm:items-center flex justify-center">
            <span className="text-[20px] font-medium text-gray-700">Available</span>
            <div className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-16 h-6 bg-white border border-gray-400 rounded-full peer-checked:border-customTealBlue transition duration-300" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full transition-transform duration-300 peer-checked:translate-x-10 peer-checked:bg-customTealBlue" />
            </div>
          </label>

          <div className="flex justify-center">
            <button className="bg-customTealBlue text-white font-dmsans text-[1.25rem] rounded-[8px] py-[20px] px-[80px]">
              Search
            </button>
          </div>
        </form>
      </div>
  );
};

export default FindDoctor;
