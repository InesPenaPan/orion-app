import React, { useState, useEffect } from 'react';
import { getStatusClasses, formatCurrency, formatDate } from './OpportunitiesTable';

/**
 * OpportunitiesTableClient Component
 * * This component fetches and renders opportunities filtered by a specific Client ID.
 * Data mapping is adjusted to handle direct JSON arrays from the ms-crm microservice.
 */
const OpportunitiesTableClient = ({ clientId }) => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!clientId) return; 

            try {
                setLoading(true);
                /**
                 * API Gateway Request:
                 * We wrap the GET request inside a POST body for the Orion Gateway to process.
                 */
                const response = await fetch(`/api/ms-crm/opportunities/client/${clientId}`, {
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

                if (!response.ok) throw new Error(`Error ${response.status}: Failed to fetch client data`);

                const rawData = await response.json();
                
                /**
                 * DATA FIX: 
                 * Your JSON is a direct Array [{}, {}]. 
                 * We ensure the state is set correctly regardless of wrapper objects.
                 */
                setOpportunities(Array.isArray(rawData) ? rawData : []);
                
            } catch (err) {
                console.error("CRM Fetch Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [clientId]); 

    if (loading) return <div className="p-10 text-center text-gray-500 italic text-sm">Synchronizing client pipeline...</div>;
    if (error) return <div className="p-10 text-center text-red-500 font-bold text-sm">Connectivity Error: {error}</div>;

    return (
        <div className="overflow-x-auto bg-white rounded-b-xl">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50/50 sticky top-0 z-10"> 
                    <tr>
                        <th className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Opportunity</th>
                        <th className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
                        <th className="px-6 py-3 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                        <th className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Created</th>
                        <th className="px-6 py-3 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Stage</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {opportunities.length > 0 ? (
                        opportunities.map((item) => (
                            <tr key={item.opportunityId} className="hover:bg-blue-50/30 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#00204A]">
                                    {item.title}
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-500 max-w-xs truncate">
                                    {item.description || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono font-bold text-gray-700">
                                    {formatCurrency(item.amountValue)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-[11px] text-gray-400 italic">
                                    {formatDate(item.createdAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-tighter ${getStatusClasses(item.stage)}`}>
                                        {item.stage}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="px-6 py-12 text-center text-gray-400 text-sm italic">
                                No active opportunities identified for this client.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OpportunitiesTableClient;