import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function getInitials (firstName, lastName){
    if (!firstName || !lastName) return "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};


function PractitionerItem({ practitioner, isLast }) {
    const {
        first_name,
        last_name,
        profile_image,
        specialty,
        appointment_count
    } = practitioner;

    const initials = getInitials(first_name, last_name);

    return (
        <div className={`flex justify-between items-center ${isLast ? '' : 'mb-12'}`}>
            <section className="flex gap-x-9 items-center">
                {profile_image ? (
                    <img
                        src={profile_image}
                        alt={`${first_name} ${last_name}`}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-customTealBlue flex items-center justify-center text-white font-bold text-xl">
                        {initials}
                    </div>
                )}

                <div>
                    <h3 className="text-darkGray font-bold text-[20px] mb-4">
                        {first_name} {last_name}
                    </h3>
                    <div className="bg-customGreen/[0.8] rounded-[8px] px-4 py-2 text-white ">
                        <p>{specialty}</p>
                    </div>
                </div>
            </section>

            <div>
                <p className="text-customTealBlue font-light">
                    <span className="font-extrabold">{appointment_count}</span> appointments
                </p>
            </div>
        </div>
    );
}



function TopPractitioners() {
    const [topPractitioners, setTopPractitioners] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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
        <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1]">
            <section className="flex justify-between items-center mb-8">
                <h1 className="text-darkGray font-bold text-[24px]">Top Practitioners</h1>
                <button
                    className="text-lightGray/[0.74] text-[18px]"
                    onClick={() => navigate("/doctors-leaderboard")}
                >
                    View all
                </button>
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