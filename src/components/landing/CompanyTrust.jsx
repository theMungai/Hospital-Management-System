import React, { useEffect, useState } from 'react';

const logos = ['google', 'facebook', 'youtube', 'pinterest', 'twitch', 'webflow'];

function CompanyLogo({ image }) {
  return (
    <img
      src={`images/brand-${image}.png`}
      alt={`${image} logo`}
      className="w-[130px] h-[40px] object-contain mx-7 transform transition-transform duration-300 ease-in-out hover:scale-110"
    />
  );
}

const CompanyTrust = () => {
  const [startIndex, setStartIndex] = useState(0);
  const totalDots = logos.length;
  const visibleCount = 6;

 
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev - 1 + logos.length) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToIndex = (index) => {
    setStartIndex(index);
  };

  
  const getVisibleLogos = () =>
    Array.from({ length: visibleCount }, (_, i) => logos[(startIndex + i) % logos.length]);

  return (
    <div className="py-[80px]">
      <h1 className="font-bold text-[32px] text-customTealBlue text-center font-dmsans mb-11">
        Trusted by 10,000+ companies around the world
      </h1>

      
      <div className="overflow-hidden flex justify-center">
        <div className="flex transition-transform duration-[800ms] ease-in-out">
          {getVisibleLogos().map((logo, index) => (
            <CompanyLogo key={index} image={logo} />
          ))}
        </div>
      </div>

      
      <div className="flex justify-center gap-3 mt-8">
        {[...Array(totalDots)].map((_, index) => {
          const reversedIndex = totalDots - 1 - index;
          const isActive = startIndex === reversedIndex;
          return (
            <button
              key={reversedIndex}
              onClick={() => goToIndex(reversedIndex)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out cursor-pointer hover:scale-150 ${
                isActive ? 'bg-customTealBlue scale-110 shadow-md' : ''
              }`}
              style={{
                backgroundColor: isActive ? undefined : '#007E8585',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CompanyTrust;
