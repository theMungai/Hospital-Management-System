import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {

    const navItems = [
        {to: "/", label: "Home"},
        {to: "/services", label: "Service"},
        {to: "/contact-us", label: "Contact Us"},
        {/*to: "/help",*/ label: "Help"},
        {/* to: "/blogs",*/ label: "Blogs"},
    ]

    const navItem = navItems.map((item) => {
        return <li key={item.to} className='mr-8' >
          <Link to={item.to} className='text-black text-[18px] transition-colors duration-200
            hover:text-customTealBlue focus:text-customTealBlue focus:outline-none
            relative after:content-[""] after:absolute after:left-0 after:bottom-[-5px]
            after:h-[3px] after:rounded-[7px] after:w-0 after:bg-customTealBlue
            hover:after:w-full focus:after:w-full
            aria-[current="page"]:after:w-full aria-[current="page"]:text-customTealBlue
            after:transition-[width] after:duration-300 after:ease-out'>{item.label}
          </Link>
        
      </li>
        
    })

  return (
    <nav className="flex items-center justify-between font-lexend py-5 px-20">
        <a href="#" className="text-customTealBlue text-[24px] font-bold logo flex items-center">
        <img src="/images/logo.png" alt="Logo" className='w-[60px]'/>
            Health<span className="text-customGreen">care</span>
        </a>
        

        <ul className='flex items-center justify-between gap-x-6'>
            {navItem}
        </ul>

        <div className="sign-up-login flex items-center gap-x-7">
            <Link to="/sign-up">
                <button className='bg-transparent text-customTealBlue text-[18px] font-lexend font-semibold cursor-pointer'>
                    Sign Up
                </button>
            </Link>

            <Link to="/log-in">
                <button className='bg-customTealBlue py-3 px-10 rounded-[8px] text-white text-[18px] font-lexend font-semibold cursor-pointer'>Log In</button>
            </Link>
        </div>
      
    </nav>
  );
}

export default NavBar;