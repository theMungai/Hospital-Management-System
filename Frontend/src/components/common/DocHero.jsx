import React from 'react';

const DocHero = () => {
    return (
        <div className="relative w-full min-w-[350px] max-w-[600px] xs:w-[350px] md:w-[600px] aspect-square rounded-blob bg-gradient-to-br from-customTealBlue to-customGreen overflow-hidden">
            <div className="w-full h-full relative rounded-imageBlob overflow-hidden">
                <img src="/images/home-hero.png" alt="Doctor Hero" className="absolute inset-0 w-full h-full object-cover" />
            </div>
        </div>
    );
};

export default DocHero;
