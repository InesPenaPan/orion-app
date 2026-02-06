import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SECTOR_MAP, formatSector } from './ClientTable';

/**
 * ClientTableUser Component
 * Optimized for high-density data display.
 * Tightened vertical spacing for better information scanability.
 */
const ClientTableUser = () => {
    const [clients, setClients] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/ms-crm/opportunities/clients/user/1', {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        targetMethod: "GET",
                        queryParams: {},
                        body: {}
                    })
                });

                if (!response.ok) throw new Error(`Status ${response.status}: Connection failed`);
                
                const rawData = await response.json();
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

    const handleRowClick = (client) => {
        const name = client.companyName || '';
        const clientUrlName = encodeURIComponent(
            name.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
        );
        
        navigate(`/client/${clientUrlName}`, { 
            state: { clientFullName: name }
        });
    };

    if (loading) return <div className="p-10 text-center text-slate-400 animate-pulse font-medium">Loading Portfolio...</div>;
    if (error) return <div className="p-10 text-center text-red-500 font-bold tracking-tight uppercase text-xs">Error: {error}</div>;

    return (
        <div className="overflow-x-auto shadow-lg border border-slate-200/60 rounded-xl bg-white"> 
            <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/50 sticky top-0 z-10"> 
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticker</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sector</th>
                    </tr>
                </thead>
                    
                <tbody className="bg-white divide-y divide-slate-50">
                    {clients.map((item, index) => (
                        <tr 
                            key={item.clientId || index}
                            onClick={() => handleRowClick(item)}
                            className="hover:bg-blue-50 cursor-pointer transition-all duration-150 ease-in-out"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                {item.companyName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono bg-gray-50/50">
                                {item.ticker || 'N/A'} 
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap">
                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[12px] font-bold bg-slate-100/70 text-slate-500 border border-slate-200/50 uppercase tracking-wider shadow-sm">
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