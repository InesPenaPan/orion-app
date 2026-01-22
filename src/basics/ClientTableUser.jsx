import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {SECTOR_MAP, formatSector } from './ClientTable';

const ClientTableUser = () => {
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
                const response = await fetch('/api/ms-crm/opportunities/clients/user/1', {
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

                if (!response.ok) throw new Error(`Error ${response.status}: Fallo al conectar con el Gateway`);
                
                const rawData = await response.json();

                /**
                 * DATA TRANSFORMATION:
                 * The backend returns a nested structure.
                 * We use .flat() to convert [[ClientObject]] into [ClientObject] 
                 * so the .map() function can access properties directly.
                 */
                const flattenedData = Array.isArray(rawData) ? rawData.flat() : [];
                setClients(flattenedData);

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
                    clientFullName: name 
                }
            }
        );
    };

    if (loading) return <div className="p-10 text-center text-gray-500 italic">Obteniendo clientes desde el CRM...</div>;
    if (error) return <div className="p-10 text-center text-red-500 font-bold underline">Error: {error}</div>;

    return (
        <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg"> 
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10"> 
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticker</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sector</th>
                    </tr>
                </thead>
                    
                <tbody className="bg-white divide-y divide-gray-200">
                    {clients.map((item, index) => (
                        <tr 
                            key={item.clientId || index}
                            onClick={() => handleRowClick(item)}
                            className="hover:bg-blue-50 cursor-pointer transition duration-150"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.companyName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                {item.ticker || 'N/A'} 
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                    {formatSector(item.sector)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientTableUser;