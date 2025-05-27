import React from 'react';
import Hero from "./Hero.jsx";
import Services from "./Services.jsx";
import TeamMembers from "./TeamMembers.jsx";
import Testimonials from "./Testimonials.jsx";
import CompanyTrust from "./CompanyTrust.jsx";
import SubscribeNewsLetter from "../common/SubscribeNewsLetter.jsx";

const LandingMain = () => {
  return (
    <div className="px-[130px] xs:p-2 sm:p-6 md:p-10 lg:p-[50px]">
        <Hero />
        <Services />
        <TeamMembers />
        <Testimonials />
        <CompanyTrust />
        <SubscribeNewsLetter />
    </div>
  );
};

export default LandingMain;