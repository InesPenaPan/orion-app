import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar'; 
import Header from '../basics/Header';

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
                     <h1 className="text-4xl font-bold text-gray-900">
                        {clientFullName}
                    </h1>
                </main>
            </div>
        </div>
    );
};

export default ClientDetailPage;