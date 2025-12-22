import React, { useState, useEffect } from 'react';

function getInitials (firstName, lastName){
    if (!firstName || !lastName) return "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};


function PractitionerItem({ practitioner, isLast, index }) { 
    const {
        first_name,
        last_name,
        profile_image,
        specialty,
        appointment_count
    } = practitioner;

    const initials = getInitials(first_name, last_name);


    const alternatingBgClass = index % 2 === 0 
        ? 'bg-white' 
        : 'bg-customTealBlue/[0.02]'; 

    return (
        <div className={`p-4 hover:bg-customTealBlue/[0.04] cursor-pointer ${alternatingBgClass} ${isLast ? 'rounded-md' : ''}`}>
            <div className="flex justify-between items-start">

                <section className="flex gap-3 items-start flex-grow">

                    {profile_image ? (
                        <img
                            src={profile_image}
                            alt={`${first_name} ${last_name}`}
                            className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                        />
                    ) : (
                        <div className="w-14 h-14 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {initials}
                        </div>
                    )}

                    <div className="py-0.5">
                        <h3 className="text-darkGray font-extrabold text-lg mb-0.5 leading-snug">
                            {first_name} {last_name}
                        </h3>
                        <div className="inline-block bg-customGreen/[0.1] text-customGreen/[0.9] text-xs font-medium px-2 py-0.5 rounded-full">
                            {specialty}
                        </div>
                    </div>
                </section>

                <div className="flex flex-col items-end pt-1">
                    <span className="text-2xl font-black text-customTealBlue leading-none">
                        {appointment_count}
                    </span>
                    <p className="text-xs text-gray-500 font-semibold mt-1 whitespace-nowrap">
                        Appointments
                    </p>
                </div>
            </div>
        </div>
    );
}



function TopPractitioners() {
    const [topPractitioners, setTopPractitioners] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchTopPractitioners = async () => {
            let response;
            try {
                response = await fetch('/doctors/top-practitioners');
                
                const contentType = response.headers.get("content-type");
                let data = null;
                
                if (contentType && contentType.includes("application/json")) {
                    data = await response.json();
                } else {
                    const responseText = await response.text();
                    const errorMessage = `Expected JSON but received non-JSON data (e.g., HTML). Server response starts with: "${responseText.substring(0, 50)}..."`;
                    
                    if (!response.ok) {
                        throw new Error(errorMessage);
                    }
                }

                if (!response.ok) {
                    const detail = data?.detail || `HTTP Error: ${response.status} ${response.statusText}`;
                    throw new Error(detail);
                }

                setTopPractitioners(data);

            } catch (err) {
        
                let finalErrorMessage = "Network error or unhandled exception.";
                
                if (err.message.includes("Failed to fetch")) {
                    finalErrorMessage = "Network error: Server is unreachable or CORS issues.";
                } else {
                    finalErrorMessage = err.message;
                }
                
                console.error("Error fetching top practitioners:", finalErrorMessage);
                setError(finalErrorMessage);
                

                setTopPractitioners([]); 
                

            } finally {
                setLoading(false);
            }
        };

        fetchTopPractitioners();
    }, []);

    
    if (loading) {
        return (
            <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-darkGray">
                Loading top practitioners... 
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-red-600">
                <p className="font-bold mb-2">Error fetching data</p>
                <p className="text-sm break-words">{error}</p>
            </div>
        );
    }

    if (!topPractitioners || topPractitioners.length === 0) {
        return (
             <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-gray-500">
                No practitioners found yet.
            </div>
        );
    }
 


    return (
        <div className="bg-white rounded-[10px] overflow-hidden font-poppins">
            <section className="flex justify-between items-center mb-8 px-4 py-4">
                <h1 className="text-darkGray font-bold text-[20px]">Top Practitioners</h1>
            </section>

            <section>
                {topPractitioners.map((practitioner, index) => (
                    <PractitionerItem
                        key={practitioner.id}
                        practitioner={practitioner}
                        isLast={index === topPractitioners.length - 1}
                    />
                ))}
            </section>
        </div>
    );
}

export default TopPractitioners;