import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'

import image from '../../../../../public/images/professional-1.jpg'

function TopPractitioners() {
    const [user, setUser] = useState({ first_name: "", last_name: "", profile_image: ""})
    const [doctor, setDoctor] = useState({specialty: ""})

    const navigate = useNavigate()

    const getInitials = () => {
        if (!user.first_name || !user.last_name) return "";
        return user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase();
    };

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
                <div className="flex justify-between mb-12">
                    <section className="flex gap-x-9 items-center">
                        <img src={image} className="w-16 h-16 rounded-full"/>

                        <div>
                            <h3 className="text-darkGray font-bold text-[20px] mb-4">Melinda Claire</h3>
                            <div className="bg-customGreen/[0.8] rounded-[8px] px-4 py-2 text-white ">
                                <p>Dentist</p>
                            </div>
                        </div>
                    </section>

                    <div>
                        <p className="text-customTealBlue font-light"><span className="font-extrabold">107</span> appointments</p>
                    </div>

                </div>

            </section>
        </div>
    );
}

export default TopPractitioners;