import React from 'react';
import {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedinIcon,
    YoutubeIcon,
} from './SocialIcons';

function FooterColumn({ title, links, icons }) {
    return (
        <div className="footer-column">
            <h3 className="text-lg text-white font-bold mb-10">{title}</h3>
            <ul className="space-y-3">
                {links.map((link, index) => (
                    <li key={index} className="flex items-center gap-x-3 ">
                        {icons?.[index] && <span className="w-5 h-5 text-white flex-shrink-0 py-4">{icons[index]}</span>}
                        <a href="#" className="text-base text-white hover:underline">
                            {link}
                        </a>
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
    const socialIcons = [
        <FacebookIcon />,
        <TwitterIcon />,
        <InstagramIcon />,
        <LinkedinIcon />,
        <YoutubeIcon />,
    ];

    return (
        <footer className="w-full bg-customTealBlue mt-16 px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 gap-8 xs:grid-cols-[1.5fr_1fr] sm:grid-cols-[1.5fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr_1fr] lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] xl:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] 2xl:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]  ">
                    {/* Logo Column - Only shown on mobile */}
                    <div className=" sm:hidden">
                        <div className="flex flex-col space-y-4">
                            <a href="#" className="company-logo flex items-center">
                                <img
                                    src="/images/logo.png"
                                    alt="Logo"
                                    className="w-16"
                                />
                                <h1 className="text-white font-bold font-lexend ml-2 text-xl">
                                    Healthcare
                                </h1>
                            </a>
                            <div className="space-y-1">
                                <p className="text-white font-dmsans text-sm">
                                    © {new Date().getFullYear()} Healthcare
                                </p>
                                <p className="text-white font-dmsans text-sm">
                                    All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Link Columns */}
                    <FooterColumn title="Product" links={productLinks} />
                    <FooterColumn title="Company" links={companyLinks} />
                    <FooterColumn title="Support" links={supportLinks} />
                    <FooterColumn title="Follow us" links={socialLinks} icons={socialIcons} />

                    {/* Logo Column - Shown on larger screens */}
                    <div className="hidden sm:block lg:col-span-1 lg:row-span-2">
                        <div className="flex flex-col space-y-4">
                            <a href="#" className="company-logo flex items-center">
                                <img
                                    src="/images/logo.png"
                                    alt="Logo"
                                    className="w-[10px]"
                                />
                                <h1 className="text-white font-bold font-lexend ml-2 text-2xl">
                                    Healthcare
                                </h1>
                            </a>
                            <div className="space-y-1">
                                <p className="text-white font-dmsans text-sm">
                                    © {new Date().getFullYear()} Healthcare
                                </p>
                                <p className="text-white font-dmsans text-sm">
                                    All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;