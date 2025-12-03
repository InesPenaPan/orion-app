import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar'; 
import Header from '../basics/Header';
import FinanceCard from '../components/FinanceCard';
import OpportunitiesCard from '../components/OpportunitiesCard';
import SectorCard from '../components/SectorCard';
import NewsCard from '../components/NewsCard';

const ClientDetailPage = () => {

    const location = useLocation(); 
    const clientFullName = location.state?.clientFullName;
    
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
                <Sidebar 
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

                    {/* CLIENT NAME */}
                    <h1 className="text-4xl font-bold text-gray-900">
                        {clientFullName}
                    </h1>

                    {/* FINANCE INFO */}
                    <div className="max-w-7xl mx-auto w-full"> 
                        <FinanceCard />
                    </div>

                    {/* ROW 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <OpportunitiesCard />
                        <SectorCard />
                    </div>

                    {/* NEWS */}
                    <div className="max-w-7xl mx-auto w-full"> 
                        <NewsCard />
                    </div>

                </main>
            </div>
        </div>
    );
};

export default ClientDetailPage;