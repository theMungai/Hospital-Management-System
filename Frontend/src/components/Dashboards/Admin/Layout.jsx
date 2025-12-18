import React from 'react';
import TopBar from "./TopBar.jsx";
import SideMenu from "./SideMenu.jsx";


function Layout({ children }) {
    return (
        <div className="flex w-full h-screen overflow-hidden">
            <SideMenu /> 
            <div className="flex-1 h-full overflow-y-auto">
                <TopBar />
                {children}
            </div>
        </div>
    );
}

export default Layout;