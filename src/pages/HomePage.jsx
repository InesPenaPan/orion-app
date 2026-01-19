import React, { useState } from 'react';

import SideBar from '../components/SideBar'; 
import Header from '../basics/Header';
import OverviewCard from '../components/OverviewCard'; 
import OpportunitiesCard from '../components/OpportunitiesCard';
import ClientCard from '../components/ClientCard';

const HomePage = () => {
    // Centralized state to control the collapse status of the sidebar.
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
 
    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const contentMarginClass = isSidebarCollapsed ? 'ml-16' : 'ml-64';

    return (
        // Main container wraps the entire screen
        <div className="flex min-h-screen bg-gray-100">
            
            {/* SIDEBAR CONTAINER*/}
            <div className="fixed top-0 left-0 z-50">
                <SideBar 
                    isCollapsed={isSidebarCollapsed} 
                    toggleCollapse={toggleSidebar} 
                />
            </div>
            
            {/* MAIN CONTENT AREA*/}
            <div 
                // Apply the dynamic margin (ml-16 or ml-64) to push the content away from the fixed sidebar.
                className={`flex flex-col flex-grow min-h-screen ${contentMarginClass} transition-all duration-300`}
            >
                <Header />

                <main className="flex-grow p-8 space-y-8"> 
                    
                    <h1 className="text-4xl font-bold text-gray-900"> Dashboard Overview </h1>
                    
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