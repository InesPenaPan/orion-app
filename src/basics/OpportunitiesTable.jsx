import React, { useState, useEffect } from 'react';

/**
 * Helper function to determine Premium Soft UI classes.
 * Uses lowercase and subtle borders for a clean aesthetic.
 */
export const getStatusClasses = (status) => {
    const baseClasses = 'px-3 py-0.5 text-xs font-medium border rounded-full uppercase tracking-tight shadow-sm';

    switch (status) {
        case 'Won':
        case 'Closed':
            return `${baseClasses} bg-emerald-50 text-emerald-700 border-emerald-200`;
        case 'Lost':
            return `${baseClasses} bg-rose-50 text-rose-700 border-rose-200`;
        default:
            return `${baseClasses} bg-amber-50 text-amber-700 border-amber-200`;
    }
};

/**
 * Formats numeric values into Euro currency string.
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', { 
        style: 'currency', 
        currency: 'EUR',
        minimumFractionDigits: 0 
    }).format(amount);
};

/**
 * Converts ISO date strings into a readable format (DD/MM/YYYY).
 */
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

/**
 * OpportunitiesTable Component
 * @param {boolean} showResponsible - Toggles the 'Responsible' column.
 * @param {boolean} showClient - Toggles the 'Client' column visibility.
 * @param {string|number} clientId - If provided, fetches opportunities specific to a client.
 */
const OpportunitiesTable = ({ showResponsible = true, showClient = true, clientId = null }) => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Dynamic Endpoint Logic:
     * 1. If clientId is provided, use the client-specific route.
     * 2. Otherwise, check showResponsible to decide between global or user-specific data.
     */
    const endpoint = clientId 
        ? `/api/ms-crm/opportunities/client/${clientId}`
        : showResponsible 
            ? '/api/ms-crm/opportunities' 
            : '/api/ms-crm/opportunities/user/1';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(endpoint, {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        targetMethod: "GET",
                        queryParams: {},
                        body: {}
                    })
                });

                if (!response.ok) throw new Error(`Error ${response.status}: Failed to reach the Gateway`);

                const rawData = await response.json();
                const dataToSet = Array.isArray(rawData) ? rawData : (rawData.opportunities || []);
                setOpportunities(dataToSet);
            } catch (err) {
                console.error("[OpportunitiesTable] Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]); 
    
    if (loading) return <div className="p-10 text-center text-gray-400 italic animate-pulse font-medium">Synchronizing CRM data...</div>;
    if (error) return <div className="p-10 text-center text-red-500 font-bold underline">Error: {error}</div>;

    return (
        /* border-2 and border-gray-200 for a more defined, "gordo" look */
        <div className="overflow-x-auto rounded-xl border-2 border-gray-200 bg-white shadow-md">
            <table className="min-w-full divide-y-2 divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10"> 
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Opportunity</th>
                        <th className="px-6 py-3 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Description</th>
                        
                        {showClient && <th className="px-6 py-3 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Client</th>}
                        
                        <th className="px-6 py-3 text-right text-xs font-normal text-gray-500 uppercase tracking-wider">Amount</th>
                        
                        {showResponsible && <th className="px-6 py-3 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Responsible</th>}
                        
                        <th className="px-6 py-3 text-center text-xs font-normal text-gray-500 uppercase tracking-wider">Stage</th>
                        <th className="px-6 py-3 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Created</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {opportunities.length > 0 ? (
                        opportunities.map((item) => (
                            <tr key={item.opportunityId} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#002D6B]">
                                    {item.title}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate font-medium">
                                    {item.description || 'no description'}
                                </td>
                                
                                {showClient && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                                        {item.client?.companyName || 'N/A'}
                                    </td>
                                )}
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-800">
                                    {formatCurrency(item.amountValue)}
                                </td>
                                
                                {showResponsible && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.user?.fullName || 'unassigned'}
                                    </td>
                                )}
                                
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className={getStatusClasses(item.stage)}>
                                        {item.stage.toLowerCase()}
                                    </span>
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 italic font-light">
                                    {formatDate(item.createdAt)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={10} className="px-6 py-10 text-center text-gray-400">
                                No records found in this pipeline.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OpportunitiesTable;