import React, { useState } from 'react';
import { Search } from 'lucide-react';

import SideBar from '../components/SideBar'; 
import Header from '../basics/Header';
import ClientTableUser from '../basics/ClientTableUser';
import ClientGraphic from '../basics/ClientGraphic';
import CardTitle from '../basics/CardTitle';


const segmentationData = [
    { name: 'Technology', value: 450 },
    { name: 'Finance', value: 380 },
    { name: 'Healthcare', value: 250 },
    { name: 'Retail', value: 210 },
];

const ClientPortfolioPage = () => {
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
                    <h1 className="text-4xl font-bold text-gray-900"> Client Portfolio </h1>
                    <p className="text-gray-500 -mt-6 text-lg">
                        Clients from <span className="font-semibold text-blue-600">Inés Peña</span>
                    </p>

                    {/* LEFT COLUMN */}
                    <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
                        <div className="w-full lg:w-6/12 space-y-6">
                            <div className="relative w-full max-w-xl">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search clients ..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            />
                            </div>
                            <div className="relative w-full">
                                <ClientTableUser /> 
                            </div>
                        </div>

                        {/* RIGHT COLUMN - Updated with Premium Accent Line */}
                        <div className="relative overflow-hidden w-full lg:w-6/12 mt-4 lg:mt-0 bg-white rounded-xl shadow-xl p-5 border border-gray-100 transition duration-300 hover:shadow-2xl"> 
                            
                            {/* Elemento decorativo premium: línea de acento superior */}
                            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#00204A] via-[#1E90FF] to-[#FFD700]/50" />
                            
                            <CardTitle title="Client Segmentation" />
                            <ClientGraphic data={segmentationData} />
                        </div>
                        
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClientPortfolioPage;