import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import FindDoctor from '../common/FindDoctor';
import DocHero from "../common/DocHero.jsx";

function Professionals({image}){
  return(
    <img src={`images/professional-${image}.jpg`} 
    alt="User" 
    className="transition-all duration-500 ease-in-out cursor-pointer hover:scale-150 w-8 h-8 rounded-full border-2 border-white -mx-[6px] object-cover"/>
  )
}

function ResultsInNumbers({count, title, valueType}){
  return(
    <div className='text-center'>
      <h1 className='text-[40px] font-bold font-dmsans mb-4 text-customTealBlue'>{count}<span className='text-[#007E8580]'>{valueType}</span></h1>
      <p className='font-dmsans font-bold text-[20px] text-[#333333]'>{title}</p>
    </div>
  )
}

const Hero = () => {
  return (
    <div className='py-8 px-[130px] mt-10'>
      <div className='container flex items-center justify-between mb-20'>
        <div className='hero-text-container font-lato basis-[48%]'>
            <h1 className='text-[#333] text-[35px] mb-7'>Providing Quality <span className='text-customTealBlue'>Healthcare</span> For A <span className='text-customGreen'>Brighter</span> And <span className='text-customGreen'>Healthy</span> Future</h1>

            <p className='text-[#333] text-[18px] mb-[105px]'>At our hospital, we are dedicated to providing exceptional medical care to our patients and their families. Our experienced team of medical professionals, cutting-edge technology, and compassionate approach make us a leader in the healthcare industry</p>

            <div className="hero-buttons flex gap-x-11">
                <button className='bg-customTealBlue text-white font-lexend text-[1.2rem] rounded-[8px] py-[13px] px-[40px]'>Appointments</button>
                <button>
                    <div className='flex items-center gap-x-6'>
                        <FontAwesomeIcon icon={faCirclePlay} className='text-customTealBlue text-[50px]'/>
                        <span className='text-[20px] text-black'>Watch Video</span>
                    </div>
                </button>
            </div>
        </div>

        <div className='relative hero-image-container basis-[48%]'>
          <DocHero />

          <div className="absolute top-20 left-[60%] w-[200px] z-20 bg-white rounded-[12px] border-4 border-customWhite px-7 py-3 text-customTealBlue font-bold shadow-md text-[23px]">
            24/7 <span className='text-black font-normal'>Service</span>
          </div>

          {/* Our Professionals Section */}
          <div className="w-[200px] absolute bottom-0 left-0z-20">
            <div className="bg-white rounded-[12px] px-5 py-2 shadow-md border-4 border-customWhite">
                <span className="text-gray-700 text-[11px] font-medium text-lg">Our Professionals</span>

                <div className="flex items-center"> 
                  <Professionals image={1}/>
                  <Professionals image={2}/>
                  <Professionals image={3}/>
                  <Professionals image={4}/>
                  <Professionals image={5}/>
                  <Professionals image={6}/>
                  <Professionals image={7}/> 

                  <div className="w-8 h-8 rounded-full bg-customTealBlue border-2 border-white flex items-center justify-center -mx-[8px]"> 
                      <span className="text-white text-sm">30+</span>  
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <FindDoctor/>

      <div className="results-numbers-container">
        <h1 className='text-center text-[32px] mb-[70px] font-dmsans font-bold text-customTealBlue'>Our results in numbers</h1>
        <div className='results-numbers flex items-center justify-around mb-[150px]'>
          <ResultsInNumbers count={99} valueType="%" title="Customer satisfaction"/>
          <ResultsInNumbers count={15} valueType="k" title="Online Patients"/>
          <ResultsInNumbers count={12} valueType="k" title="Patients Recovered"/>
          <ResultsInNumbers count={240} valueType="%" title="Company growth"/>
        </div>
      </div>

      <div className="why-us flex items-center justify-between mb-[150px]">
        <div className="choose-us-text basis-[48%]">
          <h1 className='text-[32px] font-bold font-dmsans text-customTealBlue mb-5'>You have lots of reasons to choose us</h1>
          <p className='font-normal text-[16px] leading-[1.8rem] text-[#555555] mb-12'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium molestiae, quasi quidem quaerat voluptatum porro expedita iusto impedit sapiente facere excepturi unde deleniti dolore accusantium quod nisi velit, aperiam voluptates.</p>

          <div className="choose-us-actions flex items-center gap-x-6">
            <button className='outline-none bg-customTealBlue py-5 px-8 font-dmsans text-[16px] text-white rounded-[40px]'>Get started</button>

            <button className='outline-none bg-transparent py-5 px-8 font-dmsans text-[16px] bg-white text-customTealBlue rounded-[40px]'>Talk to sales</button>
          </div>
        </div>

        <div className="choose-us-image basis-[48%] ">
          <img src="/images/services-choose-us.jpg" alt="Why Choose Us" className='w-full rounded-[10px]' />
        </div>
      </div>
    </div>
  )
}

export default Hero
