import React, { useState, useEffect, useRef } from 'react';
import { CircleQuestionMarkIcon, ChevronDownIcon, Settings, Bell, LogOut, UserRound, UserCog, Search } from 'lucide-react'

const API_BASE_URL = 'http://localhost:8000';
const userId = localStorage.getItem("user_id");

function TopBar() {
    const [user, setUser] = useState({ first_name: "", last_name: "", role: "", email: "" });
    const [profileImage, setProfileImage] = useState(localStorage.getItem("profile_image") || null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const profileRef = useRef(null);

    // Get user initials
    const getInitials = () => {
        if (!user.first_name || !user.last_name) return "";
        return user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase();
    };

    // Fetch user data
    useEffect(() => {
        if (userId) {
            fetch(`${API_BASE_URL}/users/${userId}`)
                .then(res => {
                    if (!res.ok) throw new Error("Network response was not ok");
                    return res.json();
                })
                .then(data => setUser(data))
                .catch(err => {
                    console.error(err);
                    setUser({ first_name: "Error", last_name: "User", role: "Unknown", email: "" });
                });
        }
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle avatar upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            setProfileImage(base64);
            localStorage.setItem("profile_image", base64);
        };
        reader.readAsDataURL(file);
    };

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    const DropdownItem = ({ icon: Icon, text, onClick, className = '' }) => (
        <button
            onClick={onClick}
            className={`flex items-center w-full p-3.5 text-base text-gray-700 hover:bg-[#007E85]/[0.06] hover:text-customTealBlue transition-colors rounded-lg ${className}`}
        >
            <Icon className="w-6 h-6 mr-3" />
            {text}
        </button>
    );

    return (
        <div className='w-full bg-white flex justify-between items-center px-8 py-6 font-poppins'>
            {/* Search */}
            <div className="flex items-center justify-between bg-[#007E85]/[0.06] py-2.5 px-3 rounded-full">
                <input
                    placeholder="What are you looking for?"
                    className="bg-transparent w-[350px] font-dmsans text-gray-700 font-100 mx-6 placeholder:font-dmsans placeholder:font-[100] placeholder:text-[#838383]/75 outline-0"
                />
                <div className="bg-customTealBlue p-1 rounded-full cursor-pointer">
                    <Search className="w-5 h-5 text-white" />
                </div>
            </div>

            {/* Notifications + Profile */}
            <div className="profile_notificatons flex justify-between items-center gap-x-8">
                {/* Notifications */}
                <div className="w-36 flex items-center justify-between bg-[#007E85]/[0.06] px-4 rounded-full">
                    <div className="basis-1/2 py-1.5 flex justify-center cursor-pointer border-r border-customTealBlue">
                        <Bell className="w-7 h-7 text-customTealBlue" />
                    </div>
                    <div className="basis-1/2 py-1.5 flex justify-center cursor-pointer">
                        <Settings className="w-7 h-7 text-customTealBlue" />
                    </div>
                </div>

                {/* Profile */}
                <div
                    ref={profileRef}
                    className="profile flex items-center gap-x-4 px-4 justify-between cursor-pointer relative"
                    onClick={toggleDropdown}
                >
                    <label className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer overflow-hidden flex items-center justify-center relative">
                        {profileImage ? (
                            <img src={profileImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-white bg-customTealBlue w-full h-full flex items-center justify-center font-semibold">
                {getInitials()}
              </span>
                        )}
                        {/*<input*/}
                        {/*    type="file"*/}
                        {/*    className="hidden"*/}
                        {/*    accept="image/*"*/}
                        {/*    onChange={handleImageUpload}*/}
                        {/*/>*/}
                    </label>

                    <div className="flex flex-col">
                        <h3 className="text-gray-600 font-semibold">{user.first_name} {user.last_name}</h3>
                        <p className="text-gray-400 font-thin font-dmsans">{user.role}</p>
                    </div>

                    <ChevronDownIcon
                        onClick={toggleDropdown}
                        className={`w-4 h-4 text-gray-500 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                    />

                    {/* Dropdown */}
                    <div
                        className={`drop-down absolute top-full right-0 mt-3 w-72 bg-white rounded-3xl border border-gray-100 z-50 p-2 transform origin-top-right transition-all duration-500 ease-in-out
              ${isDropdownOpen ? "opacity-100 translate-y-0 max-h-[500px]" : "opacity-0 -translate-y-4 max-h-0 pointer-events-none"}`}
                    >
                        {/* Header */}
                        <section className="flex items-center p-3 border-b border-gray-100 mb-2">
                            <label className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center relative mr-3">
                                {profileImage ? (
                                    <img src={profileImage} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white bg-customTealBlue w-full h-full flex items-center justify-center font-semibold">
                    {getInitials()}
                  </span>
                                )}
                            </label>
                            <div className="flex flex-col">
                                <p className="font-bold text-gray-800">{user.first_name} {user.last_name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </section>

                        {/* Actions */}
                        <DropdownItem
                            icon={UserRound}
                            text="Account Settings"
                            onClick={() => setIsDropdownOpen(false)}
                        />
                        <DropdownItem
                            icon={Bell}
                            text="Notifications"
                            onClick={() => setIsDropdownOpen(false)}
                        />
                        <DropdownItem
                            icon={CircleQuestionMarkIcon}
                            text="Help Center"
                            onClick={() => setIsDropdownOpen(false)}
                        />

                        <div className="my-2 border-t border-gray-100"></div>

                        <DropdownItem
                            icon={LogOut}
                            text="Sign Out"
                            onClick={() => setIsDropdownOpen(false)}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
