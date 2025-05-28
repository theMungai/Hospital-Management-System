import React from 'react'

const ServiceHero = () => {
  return (
      <div className="relative py-8 xs:py-4 sm:py-4 md:py-4  mt-[140px] xs:mt-20 sm:mt-20 md:mt-20 lg:mt-20 mb-[150px] xs:mb-20 sm:mb-[100px] md:mb-[120px] bg-[url('/images/service-hero.jpg')] bg-cover bg-center min-h-screen grid ">
          
          <div className="absolute top-0 inset-0 bg-black/60 z-0"></div>

          
          <div className="relative z-10 xs:w-full sm:w-[90%] md:w-[70%] xl:w-[80%] xs:flex-col sm:flex-col md:flex-col mx-auto flex justify-around items-center h-full">
            
            <div className="hero-text text-white max-w-xl lg:basis-[48%] xl:basis-[48%] ">
              <h1 className="mb-9 xs:text-center xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 font-montserrat font-[900] text-[54px] leading-[80px] xs:leading-[60px] sm:leading-[70px] xs:text-[30px] sm:text-[36px] md:text-[40px] lg:text-[45px]">
                Meet the Best Hospital
              </h1>
              <p className="font-montserrat font-[500] text-[18px] leading-[30px] mb-9 xs:text-[16px] xs:leading-[24px] xs:text-center sm:text-center  xs:px-5 sm:px-5">
              Experience world-class medical care with compassion, precision, and the latest technology — where your health is our highest priority. 
              </p>

              <div className="flex gap-4 xs:justify-center sm:justify-center">
              <button className="px-6 py-3 xs:px-4 xs:py-2 text-[0.9rem] bg-customTealBlue font-montserrat font-bold text-white rounded-full transition-colors duration-300 hover:bg-transparent hover:border border-customTealBlue">
                  Get Quote Now
                </button>
                <button className="px-6 py-3 xs:px-4 xs:py-2 text-[0.9rem] bg-transparent border border-customTealBlue text-white font-montserrat font-bold rounded-full hover:bg-customTealBlue hover:text-white transition">
                  Learn More
                </button>
              </div>
            </div>

            
            <div className="book-appointment basis-[28%] bg-white p-10 xs:p-3 sm:p-6 rounded-[10px] shadow-lg mt-10 md:mt-0 xs:w-[90%] sm:w-[95%] lg:basis-[48%] xl:basis-[48%] ">
              <form>
                
                <h2 className="text-xl font-semibold mb-4 text-[#252B42] text-center">Book Appointment</h2>
                <label>
                  Name<span>*</span>
                  <input
                  type="text"
                  placeholder="Full Name*"
                  className="w-full p-3 mb-4 border-none outline-none rounded"
                  required
                />
                </label>

                <label>
                  Email address<span>*</span>
                  <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full p-3 mb-4 border-none outline-none rounded"
                />
                </label>

                <label className = "block mb-2" >
                  Department <span>*</span>
                </label>
                <select name="department" id="department" required className="mb-8 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 bg-white text-[#555555]">
                    <option value="">Please select</option>
                    <option value="">Dentistry</option>
                    <option value="">Orthopedics </option>
                    <option value="">Optical</option>
                    <option value="">Surgery</option>
                    <option value="">Cardiology</option>
                    <option value="">Pharmacy</option>
                    <option value="">Oncology</option>
                    <option value="">Pediatrics</option>
                  </select>

                  <select id="appointmentTime" name="appointmentTime" className="mb-8 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 bg-white text-[#555555]"required>
                    <option value="">-- Choose a Time --</option>
                    <option value="9:00">9:00 AM <span className = "px-5">Available</span></option>
                    <option value="10:30">10:30 AM <span className = "px-5">Available</span></option>
                    <option value="12:00">12:00 PM <span className = "px-5">Available</span></option>
                    <option value="13:30">1:30 PM <span className = "px-5">Available</span></option>
                    <option value="15:00">3:00 PM <span className = "px-5">Available</span></option>
                    <option value="16:30">4:30 PM <span className = "px-5">Available</span></option>
                  </select>
                
                <button
                  type="submit"
                  className="w-full bg-customTealBlue text-white py-3 rounded hover:bg-opacity-90 transition"
                >
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
      </div>
  )
}

export default ServiceHero
