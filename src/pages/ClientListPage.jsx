import React, { useState } from 'react';
import { Search } from 'lucide-react';

import SideBar from '../components/SideBar'; 
import Header from '../basics/Header';
import ClientTable from '../basics/ClientTable';

const ClientListPage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
 
    /**
     * Toggles the sidebar state between expanded and collapsed.
     */
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
                    <h1 className="text-4xl font-bold text-gray-900"> All Clients </h1>

                    {/* Seacrh Bar */}
                    <div className="relative w-ful">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search clients ..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                    </div>

                    <div className="relative w-ful">
                        <ClientTable />
                    </div>
                  
                </main>
            </div>
        </div>
    );
};

export default ClientListPage;