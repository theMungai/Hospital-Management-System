import React from 'react'

function FooterColumn({ title, links }) {
  return (
    <div className="footer-column">
      <h3 className='text-[20px] font-bold mb-10'>{title}</h3>
      <ul>
        {links.map((link, index) => (
          <li key={index} className='my-[18px]'>
            <a href="#" className='text-[18px]'>{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Footer = () => {
  const productLinks = ['Features', 'Pricing', 'Case studies', 'Reviews', 'Updates'];
  const companyLinks = ['About', 'Contact us', 'Careers', 'Culture', 'Blog'];
  const supportLinks = ['Getting started', 'Help center', 'Server status', 'Report a bug', 'Chat support'];
  const socialLinks = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'Youtube'];

  return (
    <footer className='relative bottom-0 w-full bg-customTealBlue xs:mt-5 sm:mt-6 md:mt-[30px] mt-[60px] xs:p-[20px] sm:p-[20px] md:p-[30px] lg:p-[60px] p-[100px] flex gap-x-[200px] xs:gap-[40px] sm:gap-[60px] md:gap-[100px]'>
      <div className="copyrights">
        <a href='' className="company-logo flex items-center mb-4 ">
        <img src="/images/logo.png" alt="Logo" className='w-[100px] xs:w-[50px] sm:w-[60px] md:w-[80px]'/>
          <h1 className='text-white text-[26px] font-bold font-lexend xs:text-[18px] sm:text-[20px] md:text-[24px]'>Healthcare</h1>
        </a>
        <p className='text-white font-dmsans'>Copyright &#169; 2022</p>
        <p className='text-white font-dmsans'>All Rights Reserved</p>
      </div>

      <div className="footer-links font-dmsans text-white gap-x-[80px] xs:gap-x-[20px] sm:gap-x-[30px] md:gap-x-[50px]xl:gap-x-[80px] grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        <FooterColumn title="Product" links={productLinks} />
        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn title="Support" links={supportLinks} />
        <FooterColumn title="Follow us" links={socialLinks} />
      </div>
    </footer>
  )
}

export default Footer
