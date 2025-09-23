import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube} from "@fortawesome/free-brands-svg-icons";

function FooterColumn({title, links, icons}) {
    return (
        <div className="footer-column">
            <h3 className="text-lg text-white font-bold mb-10 xs:mb-6 sm:mb-8 md:mb-9">{title}</h3>
            <ul className="space-y-3">
                {links.map((link, index) => (
                    <li key={index} className=" flex items-center gap-x-3">
                        {icons?.[index] && (
                            <span className="w-5 h-5 text-white flex-shrink-0 py-4 items-center">
                                {icons[index]}
                            </span>
                        )}
                        <a href="#" className="text-base text-white hover:underline">
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CompanyProfile() {
    return (
        <div className="col-span-2 xs:col-span-1">
            <div className="flex flex-col space-y-4">
                <a href="#" className="company-logo flex items-center">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="w-16 xs:w-10 sm:w-10 md:w-12 lg:w-14"
                    />
                    <h1 className="text-white font-bold font-lexend ml-2 text-xl xs:text-[16px] sm:text-[16px] md:text-[20px] lg:text-2xl">
                        Healthcare
                    </h1>
                </a>
                <div className="space-y-1">
                    <p className="text-white leading-8">
                        We are a trusted healthcare provider committed to delivering high-quality medical services and
                        compassionate care. Our mission is to support healthier lives through innovation, integrity, and
                        a patient-first approach.
                    </p>

                </div>
            </div>
        </div>
    )
}

const ConnectTab = [
    {
        to: "https://www.instagram.com",
        icon: <FontAwesomeIcon icon={faInstagram} className="text-[22px]"/>,
        label: "Instagram",
    },
    {
        to: "https://www.facebook.com",
        icon: <FontAwesomeIcon icon={faFacebook} className="text-[22px]"/>,
        label: "Facebook",
    },
    {
        to: "https://www.linkedin.com",
        icon: <FontAwesomeIcon icon={faLinkedin} className="text-[22px]"/>,
        label: "LinkedIn",
    },
    {
        to: "https://www.youtube.com",
        icon: <FontAwesomeIcon icon={faYoutube} className="text-[22px]"/>,
        label: "Youtube",
    },
    {
        to: "https://www.twitter.com",
        icon: <FontAwesomeIcon icon={faTwitter} className="text-[22px]"/>,
        label: "Twitter",
    }
];

const socialMedia = ConnectTab.map((item, index) => (
    <li
        key={index}
        className="text-white leading-9 hover:underline cursor-pointer text-[15px] flex gap-x-2 items-center"
    >
        <a
            href={item.to}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 transition"
        >
            {item.icon}
            {item.label}
        </a>
    </li>
));


const Footer = () => {
    const productLinks = ['Features', 'Pricing', 'Case studies', 'Reviews', 'Updates'];
    const companyLinks = ['About', 'Contact us', 'Careers', 'Culture', 'Blog'];
    const supportLinks = ['Getting started', 'Help center', 'Server status', 'Report a bug', 'Chat support'];

    return (
        <footer className="w-full bg-customTealBlue text-white px-6 sm:px-8 md:px-12 lg:px-16 font-dmsans">
            <div className="max-w-7xl mx-auto py-12 sm:py-16 md:py-20">
                <div
                    className="grid grid-cols-6 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-[1299px] mx-auto px-5 mb-6">
                    {/* Logo Column - Always shown and fixed in position */}
                    <CompanyProfile/>

                    {/* Link Columns */}
                    <FooterColumn title="Product" links={productLinks}/>
                    <FooterColumn title="Company" links={companyLinks}/>
                    <FooterColumn title="Support" links={supportLinks}/>
                    {/* Connect */}
                    <div>
                        <h2 className="font-semibold mb-4 text-[20px]">Connect</h2>
                        <ul className="space-y-2">{socialMedia}</ul>
                    </div>
                </div>
            </div>
            <hr/>
            <section className="text-center text-white text-sm leading-8">
                Healthcare © {new Date().getFullYear()}. All rights reserved.
            </section>
        </footer>
    );
};

export default Footer;
