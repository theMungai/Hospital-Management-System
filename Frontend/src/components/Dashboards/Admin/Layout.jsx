import React from 'react';
import TopBar from "./TopBar.jsx";
import SideMenu from "./SideMenu.jsx";

function Layout({ children }) {
    return (
        <>
            <div className="flex w-full h-screen gap-x-1 ">
                <SideMenu />
                <div className="basis-[84%]">
                    <TopBar />
                    {children}
                </div>
            </div>
        </>
    );
}

export default Layout;