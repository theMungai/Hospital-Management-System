import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import toggleSidebar from '../../../../public/icons/toggle_sidebar.png'

import { LayoutDashboard, Stethoscope, UserRound, CalendarClock, FolderTree, ChartSpline, MedalIcon, CreditCard, FileTextIcon, ShieldCheck, Bell, LucideUserRoundCog, LogOut, ChevronDownIcon, ChevronUpIcon} from "lucide-react";

function SideMenu({ onDashboardSelect }) {
    const [isDashboardOpen, setIsDashboardOpen] = useState(true);
    const [activeItem, setActiveItem] = useState('Admin Dashboard');

    const location = useLocation()

    const menuIcons = {
        Dashboards: <LayoutDashboard className="w-5 h-5" />,
        Doctors: <Stethoscope className="w-5 h-5" />,
        Patients: <UserRound className="w-5 h-5" />,
        Appointments: <CalendarClock className="w-5 h-5" />,
        Departments: <FolderTree className="w-5 h-5" />,
        Analytics: <ChartSpline className="w-5 h-5" />,
        'Doctors Leaderboard': <MedalIcon className="w-5 h-5" />,
        'Medical Records': <FileTextIcon className="w-5 h-5" />,
        Payments: <CreditCard className="w-5 h-5" />,
        'Quality & Safety': <ShieldCheck className="w-5 h-5" />,
        Notifications: <Bell className="w-5 h-5" />,
        Account: <LucideUserRoundCog className="w-5 h-5" />,
        Logout: <LogOut className="w-5 h-5" />,
    }

    const dashboards = [
        { to: "/admin", key: "Admin Dashboard", label: "Admin Dashboard" },
        { to: "/doctor",key: "Doctor Dashboard", label: "Doctor Dashboard" },
        { to: "/patient",key: "Patient Dashboard", label: "Patient Dashboard" },
    ];

    const mainMenuItems = [
        { label: "Dashboards", type: "dashboard" },
        { label: "Doctors", to: "/doctors", icon: menuIcons.Doctors },
        { label: "Patients", to: "/patients", icon: menuIcons.Patients },
        { label: "Appointments", to: "/appointments", icon: menuIcons.Appointments },
    ];

    const otherMenuItems = [
        { label: "Departments", to: "/departments", icon: menuIcons.Departments },
        { label: "Analytics", to: "/analytics", icon: menuIcons.Analytics },
        { label: "Doctors Leaderboard", to: "/leaderboard", icon: menuIcons['Doctors Leaderboard'] },
        { label: "Medical Records", to: "/records", icon: menuIcons['Medical Records'] },
        { label: "Payments", to: "/payments", icon: menuIcons.Payments },
        { label: "Quality & Safety", to: "/quality-safety", icon: menuIcons['Quality & Safety'] },
        { label: "Notifications", to: "/notifications", icon: menuIcons.Notifications },
    ];

    const settingsItems = [
        { label: "Account", to: "/account", icon: menuIcons.Account },
        { label: "Logout", to: "/logout", icon: menuIcons.Logout },
    ];

    const handleDashboardClick = (dashboardKey) => {
        setActiveItem(dashboardKey);
        onDashboardSelect(dashboardKey);
    };

    const MenuItem = ({ item, isSubItem = false }) => {
        const isActive = activeItem === item.label;
        const baseClasses = "flex items-center p-3 rounded cursor-pointer transition-colors duration-200";
        const activeClasses = isSubItem ? "bg-[#007E85]/10 text-[#007E85]" : "bg-teal-500 text-white";
        const defaultClasses = isSubItem ? "text-gray-700 " : "text-gray-700 hover:customTealBlue";

        if (item.type === "dashboard") {

            return (
                <div className={`${baseClasses} ${isDashboardOpen ? 'bg-customTealBlue text-white' : 'hover:bg-[#007E85]/10 text-customTealBlue'}`}
                     onClick={() => setIsDashboardOpen(!isDashboardOpen)}>
                    {menuIcons.Dashboards}
                    <span className="ml-4 font-semibold">{item.label}</span>
                    <span className="ml-auto text-sm">{isDashboardOpen ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}</span>
                </div>
            );
        }

        if (item.key) {
            return (
                <div
                    className={`${baseClasses} ml-8 ${isActive ? activeClasses : defaultClasses}`}
                    onClick={() => handleDashboardClick(item.key)}
                >
                    <span className="font-medium text-sm">{item.label}</span>
                </div>
            )
        }

        return (
            <Link to={item.to}
                  className={`${baseClasses} ${isActive ? activeClasses : defaultClasses}`}
                  onClick={() => setActiveItem(item.label)}
            >
                {item.icon}
                <span className="ml-4 font-semibold hover:text-customTealBlue">{item.label}</span>
            </Link>
        );
    }

    return (
        <div className="basis-[16%] relative bg-white px-4 py-9 overflow-y-auto h-full font-poppins">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <div className="h-20 w-20 bg-center bg-cover cursor-pointer"
                         style={{ backgroundImage: "url('/images/logo.png')" }}>
                    </div>
                </div>

                <button className="outline-0 bg-[#D9D9D9]/30 rounded-[10px] p-2">
                    <img src={toggleSidebar} alt="toggle sidebar" className="w-4 h-4" />
                </button>
            </div>

            <nav>

                <h3 className="text-sm font-semibold text-gray-400 mb-3">Main Menu</h3>
                <div className="space-y-1 mb-8">
                    {mainMenuItems.map((item, index, to) => (
                        <div key={index}>
                            <ul>
                                <li className="rounded text-darkGray hover:bg-[#007E85]/10  hover:text-customTealBlue focus:bg-customTealBlue focus:text-white">
                                    <Link to={item.to}>
                                        <MenuItem item={item} />
                                    </Link>
                                </li>
                            </ul>
                            <ul>
                                {item.type === "dashboard" && isDashboardOpen && (
                                    <li className="space-y-1 mt-1 pl-4 h">
                                        {dashboards.map((dashboard) => (
                                            <Link key={dashboard.key} to={dashboard.to}>
                                                <MenuItem
                                                    item={dashboard}
                                                    isSubItem={true}
                                                />
                                            </Link>
                                        ))}
                                    </li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>




                <h3 className="text-sm font-semibold text-gray-400 mb-3">Other Menu</h3>
                <div className="space-y-1 mb-8  ">
                    <ul>
                        {otherMenuItems.map((item, index, to) => (
                            <li className="rounded text-darkGray hover:bg-[#007E85]/10 hover:text-customTealBlue focus:bg-customTealBlue focus:text-white">
                                <Link to={item.to}>
                                    <MenuItem  key={index} item={item} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Settings</h3>
                    <div className="space-y-1">
                        <ul>
                            {settingsItems.map((item, index, to) => (
                                <li className="rounded text-darkGray hover:bg-[#007E85]/10 hover:text-customTealBlue focus:bg-customTealBlue focus:text-white">
                                    <Link to={item.to}>
                                        <MenuItem key={index} item={item} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default SideMenu;