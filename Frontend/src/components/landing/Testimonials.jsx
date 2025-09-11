import React from 'react'

function TestimonialBluePrint({image, heading, name, profession}){
    return(
        <div className='font-dmsans p-6 border border-[#e9e9e9] rounded-[20px] text-left bg-white'>
            <img src={`images/testimony-${image}.png`} alt="Testimonial"  className='w-[70px] h-[70px] rounded-full mb-8' />
            <h2 className='text-[#333333] text-[19px] font-bold mb-3'>{heading}</h2>
            <p className='text-[16px] text-[#555555] font-normal leading-[1.8rem] mb-8'>Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc mauris scelerisque sed egestas.</p>

            <p className='text-customTealBlue text-[16px] font-bold mb-2'>{name}</p>
            <p className='text-[16px] font-normal text-[#555555]'>{profession}</p>
        </div>
    )
}

const Testimonials = () => {
  return (
    <div className='mb-[40px]'>
        <h1 className='text-customTealBlue text-[32px] mb-[20px] font-bold text-center'>Testimonial</h1>
        <p className='leading-[1.7rem] text-[16px] text-[#555555] text-center mx-auto w-[40%] xs:w-full sm:w-full mb-[50px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan. </p>

        <div className="grid grid-cols-3 gap-5 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
            <TestimonialBluePrint image={1} heading='“An amazing service”' name="John Carter" profession="CEO at Google"/>

            <TestimonialBluePrint image={2} heading='“One of a kind service”' name="Sophie Moore" profession="MD at Facebook"/>

            <TestimonialBluePrint image={3} heading='“The best service”' name="Andy Smith" profession="CEO Dot Austere"/>
        </div>
    </div>
  )
}

export default Testimonials
