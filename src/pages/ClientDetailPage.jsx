import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import SideBar from '../components/SideBar'; 
import Header from '../basics/Header';
import FinanceCard from '../components/FinanceCard';
import OpportunitiesCard from '../components/OpportunitiesCard';
import SectorCard from '../components/SectorCard';
import NewsCard from '../components/NewsCard';

const ClientDetailPage = () => {

    const location = useLocation(); 
    const { 
        clientId,
        clientFullName, 
        clientTicker, 
        clientSector
    } = location.state || {};

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
            <div 
                className={`flex flex-col flex-grow min-h-screen ${contentMarginClass} transition-all duration-300`}
            >
                <Header />

                <main className="flex-grow p-8 space-y-8"> 

                    {/* CLIENT NAME & TICKER */}
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold text-gray-900">
                            {clientFullName}
                        </h1>
                    </div>

                    {/* FINANCE INFO */}
                    <div className="max-w-7xl mx-auto w-full"> 
                        <FinanceCard ticker={clientTicker} />
                    </div>

                    {/* ROW 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <OpportunitiesCard type="client" clientId={clientId} />
                        <SectorCard ticker={clientSector} />
                    </div>

                    {/* NEWS */}
                    <div className="max-w-7xl mx-auto w-full"> 
                        <NewsCard company={clientFullName} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClientDetailPage;