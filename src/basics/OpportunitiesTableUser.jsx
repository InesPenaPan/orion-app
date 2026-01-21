import React, { useState, useEffect } from 'react';
import { getStatusClasses, formatCurrency, formatDate } from './OpportunitiesTable';

/**
 * * This component is a specialized derivative of 'OpportunitiesTable.jsx'.
 * It focuses on a single user's data (User ID: 1) and removes redundant 
 * columns like 'Responsible' since all records belong to the current user.
 */
const OpportunitiesTableUser = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/ms-crm/opportunities/user/1', {
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
                console.log("API Response:", rawData);
                
                setOpportunities(rawData.opportunities || []);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="p-10 text-center text-gray-500 italic">Obteniendo pipeline personal...</div>;
    if (error) return <div className="p-10 text-center text-red-500 font-bold underline">Error: {error}</div>;

    return (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10"> 
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Opportunity</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Stage</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {opportunities.length > 0 ? (
                        opportunities.map((item) => (
                            <tr key={item.opportunityId} className="hover:bg-blue-50/40 transition duration-150 group">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-900">
                                    {item.title}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                    {item.description || 'No description'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {item.client?.companyName || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-800">
                                    {formatCurrency(item.amountValue)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 italic">
                                    {formatDate(item.createdAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusClasses(item.stage)}`}>
                                        {item.stage}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-10 text-center text-gray-400">
                                No hay oportunidades registradas para este usuario.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OpportunitiesTableUser;