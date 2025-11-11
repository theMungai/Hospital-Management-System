import React from 'react';
import { Link } from 'react-router-dom'
import toggleSidebar from '../../../../public/icons/toggle_sidebar.png'

function SideMenu() {

    const navItems = [
        {to: "", icon : "", label : ""},
        {to: "", icon : "", label : ""},
        {to: "", icon : "", label : ""},
        {to: "", icon : "", label : ""},
    ]
    return (
        <div className="basis-[16%] relative bg-white px-4 py-9">
            <div className="flex items-center justify-between">
                <div className="logo bg-[url('/images/logo.png')] bg-cover bg-center h-12 w-12 cursor-pointer"></div>
                <button className="outline-0 bg-[#D9D9D9]/30 rounded-[10px] p-2">
                    <img src={toggleSidebar} alt="toggle sidebar" className="w-4 h-4" />
                </button>
            </div>

        </div>
    );
}

export default SideMenu;