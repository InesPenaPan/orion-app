import React, { useState } from 'react';

import SideBar from '../components/SideBar'; 
import Header from '../basics/Header';
import OverviewCard from '../components/OverviewCard'; 
import OpportunitiesCard from '../components/OpportunitiesCard';
import ClientCard from '../components/ClientCard';

/**
 * This is the main entry point of the application after login.
 * It coordinates the primary layout, including the sidebar state and main content grid.
 */
const HomePage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
 
    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const contentMarginClass = isSidebarCollapsed ? 'ml-16' : 'ml-64';

    return (
        <div className="flex min-h-screen bg-gray-100">
            
            {/* SIDEBAR CONTAINER*/}
            <div className="fixed top-0 left-0 z-50">
                <SideBar 
                    isCollapsed={isSidebarCollapsed} 
                    toggleCollapse={toggleSidebar} 
                />
            </div>
            
            {/* MAIN CONTENT AREA*/}
            <div className={`flex flex-col flex-grow min-h-screen ${contentMarginClass} transition-all duration-300`}>
                
                <Header />

                <main className="flex-grow p-8 space-y-8"> 
                    
                    <h1 className="text-4xl font-bold text-gray-900"> My Operations </h1>
                    
                    {/* ROW 1 */}
                    <div className="w-full">
                         <OverviewCard />
                    </div>
                    
                    {/* ROW 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <OpportunitiesCard />
                        <ClientCard />
                    </div>
         
                </main>
            </div>
        </div>
    );
};

export default HomePage;