import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import toggleSidebarBtn from '../../../../public/icons/toggle_sidebar.png'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { LayoutDashboard, Stethoscope, UserRound, CalendarClock, FolderTree, ChartSpline, CreditCard, FileTextIcon, ShieldCheck, Bell, LucideUserRoundCog, LogOut, ChevronDownIcon, ChevronUpIcon, CircleQuestionMark} from "lucide-react";

function SideMenu({ onDashboardSelect }) {
    const [isDashboardOpen, setIsDashboardOpen] = useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [activeItem, setActiveItem] = useState('Admin Dashboard');

    const menuContainerRef = useRef(null);
    const logoRef = useRef(null);
    const toggleBtnRef = useRef(null);
    const mainMenuRef = useRef(null);
    const otherMenuRef = useRef(null);
    const settingsMenuRef = useRef(null);

    useGSAP(() => {
        if (isSidebarCollapsed) return;

        const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.6 } });

        if (logoRef.current) {
            tl.fromTo(logoRef.current, 
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1 },
                0.1
            );
        }

        if (toggleBtnRef.current) {
            tl.fromTo(toggleBtnRef.current,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1 },
                0.2
            );
        }

        if (mainMenuRef.current) {
            const mainMenuItems = mainMenuRef.current.querySelectorAll('.menu-item');
            const dashboardSubItems = mainMenuRef.current.querySelectorAll('.submenu-item');
            
            tl.fromTo(mainMenuItems,
                { x: -20, opacity: 0 },
                { 
                    x: 0, 
                    opacity: 1, 
                    stagger: 0.1,
                    duration: 0.5 
                },
                0.3
            );

            if (isDashboardOpen) {
                tl.fromTo(dashboardSubItems,
                    { x: -20, opacity: 0 },
                    { 
                        x: 0, 
                        opacity: 1, 
                        stagger: 0.08,
                        duration: 0.4 
                    },
                    0.8
                );
            }
        }

        if (otherMenuRef.current) {
            const otherMenuItems = otherMenuRef.current.querySelectorAll('.menu-item');
            tl.fromTo(otherMenuItems,
                { x: -20, opacity: 0 },
                { 
                    x: 0, 
                    opacity: 1, 
                    stagger: 0.1,
                    duration: 0.5 
                },
                0.5
            );
        }

        if (settingsMenuRef.current) {
            const settingsItems = settingsMenuRef.current.querySelectorAll('.menu-item');
            tl.fromTo(settingsItems,
                { x: -20, opacity: 0 },
                { 
                    x: 0, 
                    opacity: 1, 
                    stagger: 0.1,
                    duration: 0.5 
                },
                0.7
            );
        }

    }, [isDashboardOpen, isSidebarCollapsed]);

    const menuIcons = {
        Dashboards: <LayoutDashboard className="w-5 h-5" />,
        Doctors: <Stethoscope className="w-5 h-5" />,
        Patients: <UserRound className="w-5 h-5" />,
        Appointments: <CalendarClock className="w-5 h-5" />,
        Departments: <FolderTree className="w-5 h-5" />,
        Analytics: <ChartSpline className="w-5 h-5" />,
        'Medical Records': <FileTextIcon className="w-5 h-5" />,
        Payments: <CreditCard className="w-5 h-5" />,
        'Quality & Safety': <ShieldCheck className="w-5 h-5" />,
        Notifications: <Bell className="w-5 h-5" />,
        'Help Center': <CircleQuestionMark className="w-5 h-5"/>,
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
        { label: "Payments", to: "/payments", icon: menuIcons.Payments },
        { label: "Quality & Safety", to: "/quality-and-safety", icon: menuIcons['Quality & Safety'] },
        { label: "Notifications", to: "/notifications", icon: menuIcons.Notifications },
    ];

    const settingsItems = [
        { label: "Account", to: "/account-settings", icon: menuIcons.Account },
        { label: "Help Center", to: "/help-center", icon: menuIcons['Help Center']},
        { label: "Logout", to: "/logout", icon: menuIcons.Logout },
    ];

    const handleDashboardClick = (dashboardKey) => {
        setActiveItem(dashboardKey);
        onDashboardSelect(dashboardKey);
    };

    function toggleSidebar(){
        setIsSidebarCollapsed(prev => !prev);
        if (!isSidebarCollapsed) {
            setIsDashboardOpen(false);
        }
    }

    const MenuItem = ({ item, isSubItem = false, className = '' }) => {
        const isActive = activeItem === item.label;
        const baseClasses = "flex items-center p-3 rounded cursor-pointer transition-colors duration-200";
        const activeClasses = isSubItem ? "bg-[#007E85]/10 text-[#007E85]" : "bg-customTealBlue text-white";
        const defaultClasses = isSubItem ? "text-darkGray " : "text-darkGray hover:customTealBlue";

        if (item.type === "dashboard") {
            return (
                <div
                    className={`${baseClasses} menu-item ${isDashboardOpen && !isSidebarCollapsed ? 'bg-customTealBlue text-white' : 'hover:bg-[#007E85]/10 text-customTealBlue'} ${className}`}
                    onClick={() => {
                        if (isSidebarCollapsed) {
                            setIsSidebarCollapsed(false);
                            setIsDashboardOpen(true);
                        } else {
                            setIsDashboardOpen(!isDashboardOpen);
                        }
                    }}
                    title={isSidebarCollapsed ? item.label : undefined}
                >
                    {menuIcons.Dashboards}
                    {!isSidebarCollapsed && <span className="ml-4 font-semibold">{item.label}</span>}
                    {!isSidebarCollapsed && <span className="ml-auto text-sm">{isDashboardOpen ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}</span>}
                </div>
            );
        }

        if (item.key) {
            return (
                <div
                    className={`${baseClasses} ml-0 border-l-2 border-transparent pl-4 submenu-item ${isActive ? activeClasses : defaultClasses} ${className}`}
                    onClick={() => handleDashboardClick(item.key)}
                    title={item.label}
                >
                    <span className="font-medium text-sm">{item.label}</span>
                </div>
            )
        }

        return (
            <div
                className={`${baseClasses} menu-item ${isActive ? activeClasses : defaultClasses} ${className}`}
                onClick={() => setActiveItem(item.label)}
                title={isSidebarCollapsed ? item.label : undefined}
            >
                {item.icon}
                {!isSidebarCollapsed && <span className="ml-4 font-semibold">{item.label}</span>}
            </div>
        );
    }

    const sidebarClasses = `relative bg-white z-50 px-4 py-9 overflow-y-auto h-full font-poppins shadow-lg flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'w-[75px] basis-[75px] flex-shrink-0' : 'basis-[15%] min-w-[250px]'}`;

    return (
        <div className={sidebarClasses} ref={menuContainerRef}>
            <div className={`flex items-center mb-8 ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                {!isSidebarCollapsed && (
                    <div className="flex items-center" ref={logoRef}>
                        <div className="cursor-pointer h-10 w-20 bg-center bg-cover"
                             style={{ backgroundImage: "url('/images/logo.png')" }}>
                        </div>
                    </div>
                )}

                <button
                    ref={toggleBtnRef}
                    className="outline-0 bg-[#D9D9D9]/30 rounded-[10px] p-2"
                    onClick={toggleSidebar}
                >
                    <img src={toggleSidebarBtn} alt="toggle sidebar" className="w-4 h-4" />
                </button>
            </div>

            <nav className="flex-grow" ref={mainMenuRef}>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Main Menu</h3>
                <div className="space-y-1 mb-8" >
                    {mainMenuItems.map((item, index) => (
                        <div key={index}>
                            <ul>
                                <li className="rounded text-darkGray hover:bg-[#007E85]/10 hover:text-customTealBlue active:bg-customTealBlue focus:text-white">
                                    <Link to={item.to}>
                                        <MenuItem item={item} />
                                    </Link>
                                </li>
                            </ul>
                            <ul>
                                {item.type === "dashboard" && isDashboardOpen && (
                                    <li className="space-y-1 mt-1 pl-4">
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

                <div className="space-y-1 mb-8" ref={otherMenuRef}>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Other Menu</h3>
                    <ul>
                        {otherMenuItems.map((item, index) => (
                            <li 
                                key={`other-${index}`}
                                className="rounded text-darkGray hover:bg-[#007E85]/10 hover:text-customTealBlue focus:bg-customTealBlue focus:text-white"
                            >
                                <Link to={item.to}>
                                    <MenuItem item={item} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto" ref={settingsMenuRef}>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Settings</h3>
                    <div className="space-y-1">
                        <ul>
                            {settingsItems.map((item, index) => (
                                <li 
                                    key={`settings-${index}`}
                                    className="rounded text-darkGray hover:bg-[#007E85]/10 hover:text-customTealBlue focus:bg-customTealBlue focus:text-white"
                                >
                                    <Link to={item.to}>
                                        <MenuItem item={item} />
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