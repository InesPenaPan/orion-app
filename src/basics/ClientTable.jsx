import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Mapping object to translate technical sector codes into readable names.
 * You can expand this as needed.
 */
export const SECTOR_MAP = {
    'XLF': 'Financial Services',
    'XLY': 'Consumer Discretionary',
    'XLK': 'Technology',
    'XLV': 'Healthcare',
    'XLE': 'Energy',
    'XLI': 'Industrials'
};

/**
 * Helper function to transform the sector code.
 * If the code isn't in our map, it returns the original code or 'N/A'.
 */
export const formatSector = (sectorCode) => {
    return SECTOR_MAP[sectorCode] || sectorCode || 'N/A';
};

const ClientTable = () => {
    const [clients, setClients] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                /**
                 * API CALL VIA VITE PROXY
                 * We use '/api' prefix so Vite intercepts the request and forwards it 
                 * to the 'orion-gateway' container within the Docker network.
                 */
                const response = await fetch('/api/ms-crm/clients', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        targetMethod: "GET",
                        queryParams: {},
                        body: {}
                    })
                });

                if (!response.ok) throw new Error(`Error ${response.status}: Failed to fetch global client list`);
                
                const rawData = await response.json();

                setClients(Array.isArray(rawData) ? rawData : []);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    /**
     * Navigates to the client detail page.
     * Generates a URL-friendly slug from the company name and passes data via router state.
     */
    const handleRowClick = (client) => {
        const name = client.companyName || '';
        const clientUrlName = encodeURIComponent(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
        
        navigate(
            `/client/${clientUrlName}`,
            { 
                state: { 
                    clientId: client.clientId,
                    clientFullName: client.companyName, 
                    clientTicker: client.ticker,       
                    clientSector: client.sector
                }
            }
        );
    };

    if (loading) return <div className="p-10 text-center text-gray-500 italic">Obteniendo clientes desde el CRM...</div>;
    if (error) return <div className="p-10 text-center text-red-500 font-bold underline">Error: {error}</div>;

    return (
        <div className="overflow-x-auto shadow-md border border-gray-200 rounded-xl"> 
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10"> 
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ticker</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sector</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tax ID</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Website</th>
                    </tr>
                </thead>
                    
                <tbody className="bg-white divide-y divide-gray-200">
                    {clients.map((item) => (
                        <tr 
                            key={item.clientId}
                            onClick={() => handleRowClick(item)}
                            className="hover:bg-blue-50 cursor-pointer transition duration-150 ease-in-out"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                {item.companyName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono bg-gray-50/50">
                                {item.ticker || 'Private'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                                    {formatSector(item.sector)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {item.taxId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                                <a href={`https://${item.website}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                    {item.website}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientTable;