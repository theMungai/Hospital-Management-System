import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Member({image, name, profession}){
    return (
        <div className='text-center font-dmsans p-8 border border-[#cdcdcd] rounded-[20px] bg-white'>
            <img src={`images/team-member-${image}.png`} alt="Team Member" className='w-[140px] h-[140px] rounded-full mb-10 mx-auto ' />
            <h2 className='text-customTealBlue text-[22px] font-bold mb-2.5 '>{name}</h2>
            <h3 className='text-[#333333] uppercase text-[16px] font-bold mb-4'>{profession}</h3>
            <p className='text-[#555555] leading-[1.8rem] text-[14px] font-normal mb-8'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum ducimus officia mollitia voluptatum odit nisi inventore, eveniet quae quam p</p>

            <div className="social-media-links flex items-center w-[55%] mx-auto justify-between">
                <FontAwesomeIcon icon={faFacebook} className='text-[#00A3FF] text-[22px]  p-0.5 rounded-[5px]'/>
                <FontAwesomeIcon icon={faTwitter} className='text-[#6CCAFF] text-[22px]  p-0.5 rounded-[5px]' />
                <FontAwesomeIcon icon={faInstagram} className=' text-[22px] bg-gradient-to-b from-[#B88400] to-[#FFB80080] text-white p-0.5 rounded-[5px]'/>
                <FontAwesomeIcon icon={faLinkedin} className='text-[#0085FF] text-[22px]  p-0.5 rounded-[5px]' />
            </div>

        </div>
    )
}

const TeamMembers = () => {
  return (
    <div className="members-container mb-[150px]">
        <h1 className='text-customTealBlue text-[32px] mb-[20px] font-bold text-center'>Meet our team members</h1>
        <p className='leading-[1.7rem] text-[16px] text-[#555555] text-center mx-auto w-[40%] xs:w-full sm:w-full mb-[60px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan. </p>
        <div className='grid grid-cols-3  gap-5 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2'>
            <Member image={1} name="John Carter" profession="ceo & co-founder"/>
            <Member image={2} name="Sophie Moore" profession="dental specialist"/>
            <Member image={3} name="Matt Cannon" profession="orthopedic"/>
            <Member image={4} name="Andy Smith" profession="brain surgeon"/>
            <Member image={5} name="Lily Woods" profession="heart specialist"/>
            <Member image={6} name="Patrick Meyer" profession="eye specialist"/>
        </div>
    </div>
    
  )
}

export default TeamMembers
