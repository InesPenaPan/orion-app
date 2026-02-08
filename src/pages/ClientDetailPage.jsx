import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import SideBar from '../components/SideBar'; 
import Header from '../basics/Header';
import FinanceCard from '../components/FinanceCard';
import OpportunitiesCard from '../components/OpportunitiesCard';
import SectorCard from '../components/SectorCard';
import NewsCard from '../components/NewsCard';
import CardTitle from '../basics/CardTitle';

const ClientDetailPage = () => {
    const location = useLocation(); 
    const { 
        clientId,
        clientFullName, 
        clientTicker, 
        clientSector,
        clientWebsite
    } = location.state || {};

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
 
    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const contentMarginClass = isSidebarCollapsed ? 'ml-16' : 'ml-64';

    // Validación para el ticker
    const hasTicker = clientTicker && clientTicker.trim().toUpperCase() !== 'N/A';

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="fixed top-0 left-0 z-50">
                <SideBar isCollapsed={isSidebarCollapsed} toggleCollapse={toggleSidebar} />
            </div>
            
            <div className={`flex flex-col flex-grow min-h-screen ${contentMarginClass} transition-all duration-300`}>
                <Header />

                <main className="flex-grow p-8 space-y-8"> 
                    {/* CLIENT HEADER */}
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold text-gray-900">{clientFullName}</h1>
                        <p className="text-gray-500 text-lg flex items-center gap-2">
                            For more info:
                            <a 
                                href={clientWebsite?.startsWith('http') ? clientWebsite : `https://${clientWebsite}`} 
                                target="_blank" rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                            >
                                {clientWebsite}
                            </a>
                        </p>
                    </div>

                    {/* FINANCE SECTION CON RECUADRO ROJO PREMIUM SI ES N/A */}
                    <div className="max-w-7xl mx-auto w-full"> 
                        {hasTicker ? (
                            <FinanceCard ticker={clientTicker} />
                        ) : (
                            /* RECUADRO ROJO PREMIUM */
                            <div className="relative overflow-hidden w-full bg-red-50 rounded-xl shadow-md py-10 px-8 border border-red-200 transition duration-300 hover:shadow-lg">
                                
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="p-4 bg-white rounded-full shadow-sm">
                                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-red-900">Finance Module Disabled</h3>
                                        <p className="text-red-700 mt-1 font-medium">
                                            This feature is exclusively designed for publicly traded companies.
                                        </p>
                                        <p className="text-red-600/70 text-sm mt-2 italic max-w-2xl">
                                            As this client is a private entity, real-time stock metrics, financial ratios, and market analysis cannot be generated through the ms-finance microservice.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ROW 2 & NEWS */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <OpportunitiesCard type="client" clientId={clientId} />
                        <SectorCard ticker={clientSector} />
                    </div>

                    <div className="max-w-7xl mx-auto w-full"> 
                        <NewsCard company={clientFullName} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClientDetailPage;