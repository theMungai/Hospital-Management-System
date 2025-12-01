import React, {useState, useEffect} from 'react';
import {MagnifyingGlassIcon, BellIcon, CogIcon} from '@heroicons/react/24/outline';
import adminAvatar from '../../../../public/images/Admin-avatar.jpg'

const API_BASE_URL = 'http://localhost:8000'
const userId = localStorage.getItem("user_id");

function TopBar() {
    const [user, setUser] = useState({
        "first_name": "",
        "last_name": "",
        "role": ""
    })

    const [profileImage, setProfileImage] = useState(
        localStorage.getItem("profile_image") || null
    )

    function getInitials() {
        if (!user.first_name || !user.last_name) return "";

        return (
            user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase()
        )
    }

    useEffect(() => {
        if (userId) {
            fetch(`${API_BASE_URL}/users/${userId}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(data => {
                    setUser(data);
                })
                .catch(error => {
                    console.error("Fetch Error:", error);
                    setUser({
                        "first_name": "Error",
                        "last_name": "User",
                        "role": "Unknown"
                    });
                });
        }
    }, [userId]);


    function handleImageUpload(e) {
        const file = e.target.files[0]

        if (!file) return;

        const reader = new FileReader()
        reader.onload = () => {
            const base64 = reader.result

            setProfileImage(base64)
            localStorage.setItem("profile_image", base64)
        }

        reader.readAsDataURL(file)
    }

    return (
        <div className='w-full bg-white flex justify-between items-center px-8 py-9 font-poppins'>
            <div className="flex items-center justify-between bg-[#007E85]/[0.06] py-2.5 px-3 rounded-full">
                <input placeholder="What are you looking for?"
                       className="bg-transparent w-[350px] font-dmsans text-gray-700 font-100 mx-6 placeholder:font-dmsans placeholder:font-[100] placeholder:text-[#838383]/75 outline-0 "/>
                <div className="bg-customTealBlue p-1 rounded-full cursor-pointer">
                    <MagnifyingGlassIcon className="w-5 h-5 text-white"/>
                </div>
            </div>

            <div className="profile_notificatons flex justify-between items-center gap-x-8">
                <div className="w-36 flex items-center justify-between bg-[#007E85]/[0.06] px-4 rounded-full">
                    <div
                        className="basis-1/2 py-1.5 flex justify-center cursor-pointer  border-r border-customTealBlue">
                        <BellIcon className="w-7 h-7  text-customTealBlue"/>
                    </div>
                    <div className="basis-1/2 py-1.5 flex justify-center cursor-pointer">
                        <CogIcon className="w-7 h-7 text-customTealBlue"/>
                    </div>
                </div>

                <div className="profile flex items-center gap-x-4 px-4 justify-between border-2">
                    <label
                        className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer overflow-hidden flex items-center justify-center relative">
                        {profileImage ? (
                            <img src={profileImage} alt="" className="w-full h-full object-cover"/>
                        ) : (
                            <span
                                className="text-white bg-customTealBlue w-full h-full flex items-center justify-center font-semibold">{getInitials()}</span>
                        )}

                        {/* Hidden upload */}
                        {/*<input*/}
                        {/*    type="file"*/}
                        {/*    className="hidden"*/}
                        {/*    accept="image/*"*/}
                        {/*    onChange={handleImageUpload}*/}
                        {/*/>*/}
                    </label>

                    <div>
                        <h3 className="text-gray-600 font-semibold">{user.first_name} {user.last_name}</h3>
                        <p className="text-gray-400 font-thin font-dmsans">{user.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBar;