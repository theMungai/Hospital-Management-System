import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Correct import for v2

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { to: "/", label: "Home" },
        { to: "/services", label: "Service" },
        { to: "/contact-us", label: "Contact Us" },
        { label: "Help" },
        { label: "Blogs" },
    ];

    const navItem = navItems.map((item) => (
        <li key={item.to} className="lg:mr-6 xl:mr-3 2xl:mr-6 xs:mb-6 sm:mb-8 md:mb-8 lg:mb-8">
            <Link
                to={item.to}
                className="text-black xs:text-[0.95rem] sm:text-[0.95rem] md:text-[0.95rem] text-[1.125rem] transition-colors duration-200
                hover:text-customTealBlue focus:text-customTealBlue focus:outline-none
                relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px]
                after:h-[3px] after:rounded-[7px] after:w-0 after:bg-customTealBlue
                hover:after:w-full focus:after:w-full
                aria-[current='page']:after:w-full aria-[current='page']:text-customTealBlue
                after:transition-[width] after:duration-300 after:ease-out"
            >
                {item.label}
            </Link>
        </li>
    ));

    return (
        <nav
            className="w-full flex items-center justify-between font-lexend fixed top-0 z-50 bg-customWhite border-b border-b-gray-300
             px-[120px] py-5
             3xl:px-[100px]
             2xl:px-[80px]
             xl:px-5
             lg:px-5
             md:px-3 md:py-4
             sm:px-3 sm:py-3
             xs:px-3 xs:py-3">

        <Link to="/">
                <button className="text-customTealBlue text-[24px] font-bold logo flex items-center ">
                    <img src="/images/logo.png" alt="Logo" className="w-[60px]" />
                    <span className="xs:hidden sm:hidden xl:text-[20px] ">
                    Health<span className="text-customGreen">care</span>
                </span>
                </button>
            </Link>



            <div className="xs:block sm:block md:block lg:block hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-customTealBlue">
                    {menuOpen ? (
                        <XMarkIcon className="w-6 h-6" />
                    ) : (
                        <Bars3Icon className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Sidebar Menu (for small screens) */}
            <div className={`fixed top-0 left-0 z-50 w-1/4 xs:w-1/2 sm:w-1/2 md:w-1/2 h-full bg-white shadow-lg transition-transform duration-700 ease-in-out transform ${
                    menuOpen ? '-translate-x-0' : '-translate-x-[120%]' 
                }`}>

                {/* Nav Items */}
                <ul className="flex flex-col items-start p-5 mt-[50px] ">
                    {navItem}
                </ul>

                {/* Auth buttons for side menu */}
                <div className="flex flex-col space-y-4 w-[95%] mx-auto my-8">
                    <Link to="/sign-up" onClick={() => setMenuOpen(false)}>
                        <button className="w-full bg-transparent text-customTealBlue text-base font-semibold py-2 px-4 border border-customTealBlue rounded-lg">
                            Sign Up
                        </button>
                    </Link>
                    <Link to="/log-in" onClick={() => setMenuOpen(false)}>
                        <button className="w-full bg-customTealBlue text-white text-base font-semibold py-2 px-4 rounded-lg">
                            Log In
                        </button>
                    </Link>
                </div>
            </div>

            {/* Menu Items for larger screens */}
            <ul className="xs:hidden sm:hidden md:hidden lg:hidden flex items-center justify-between gap-x-6 ">
                {navItem}
            </ul>

            {/* Auth buttons for larger screens */}
            <div className="xs:hidden sm:hidden md:hidden lg:hidden flex  items-center xl:mr-3 mr-6">
                <Link to="/sign-up">
                    <button className="bg-transparent text-customTealBlue text-[18px] mr-7  font-lexend font-semibold cursor-pointer lg:text-[0.95rem] xl:text-[0.95rem] ">
                        Sign Up
                    </button>
                </Link>

                <Link to="/log-in">
                    <button className="bg-customTealBlue py-3 px-8 rounded-[8px] text-white text-[18px] font-lexend font-semibold cursor-pointer              lg:text-[0.95rem] xl:text-[0.95rem] xl:px-5">
                        Log In
                    </button>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
