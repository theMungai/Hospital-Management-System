import React from 'react';
import { MagnifyingGlassIcon, BellIcon, CogIcon } from '@heroicons/react/24/outline';
import adminAvatar from '../../../../public/images/Admin-avatar.jpg'


function TopBar() {
    return (
        <div className='w-full bg-white flex justify-between items-center px-8 py-9 font-poppins'>
            <div className="flex items-center justify-between bg-[#007E85]/[0.06] py-2.5 px-3 rounded-full">
                <input placeholder="What are you looking for?" className="bg-transparent w-[350px] font-dmsans text-gray-700 font-100 mx-6 placeholder:font-dmsans placeholder:font-[100] placeholder:text-[#838383]/75 outline-0 "/>
                <div className="bg-customTealBlue p-1 rounded-full cursor-pointer">
                    <MagnifyingGlassIcon className="w-5 h-5 text-white" />
                </div>
            </div>

            <div className="profile_notificatons flex justify-between items-center gap-x-8">
                <div className="w-36 flex items-center justify-between bg-[#007E85]/[0.06] px-4 rounded-full">
                    <div className="basis-1/2 py-1.5 flex justify-center cursor-pointer  border-r border-customTealBlue">
                        <BellIcon className="w-7 h-7  text-customTealBlue"/>
                    </div>
                    <div className="basis-1/2 py-1.5 flex justify-center cursor-pointer">
                        <CogIcon className="w-7 h-7 text-customTealBlue"/>
                    </div>
                </div>

                <div className="profile flex items-center gap-x-4 justify-between">
                    <div className="w-10 h-10 bg-gray-300 rounded-full">
                        <img src={`${adminAvatar}`} alt="" className="rounded-full"/>
                    </div>

                    <div>
                        <h3 className="text-gray-600 font-semibold">Simon Mungai</h3>
                        <p className="text-gray-400 font-thin font-dmsans">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBar;