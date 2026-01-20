import React, { useState, useEffect } from 'react';

/**
 * Helper function to determine Tailwind CSS classes based on the opportunity stage.
 */
const getStatusClasses = (status) => {
    switch (status) {
        case 'Won':
        case 'Closed':
            return 'bg-green-100 text-green-700';
        case 'Lost':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-yellow-100 text-yellow-700';
    }
};

/**
 * Formats numeric values into Euro currency string.
 */
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', { 
        style: 'currency', 
        currency: 'EUR',
        minimumFractionDigits: 0 
    }).format(amount);
};

/**
 * Converts ISO date strings into a readable format (DD/MM/YYYY).
 */
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const OpportunitiesTable = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                /**
                 * API CALL VIA VITE PROXY
                 * We use '/api' prefix so Vite intercepts the request and forwards it 
                 * to the 'orion-gateway' container within the Docker network.
                 */
                const response = await fetch('/api/ms-crm/opportunities', {
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
                setOpportunities(rawData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="p-10 text-center text-gray-500 italic">Obteniendo pipeline desde el CRM...</div>;
    if (error) return <div className="p-10 text-center text-red-500 font-bold underline">Error: {error}</div>;

    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10"> 
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opportunity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsible</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Stage</th>
                    </tr>
                </thead>
                {/* Table Body Section - Mapping over fetched data */}
                <tbody className="bg-white divide-y divide-gray-200">
                    {opportunities.map((item) => (
                        <tr key={item.opportunityId} className="hover:bg-gray-50 transition duration-150">
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.user?.fullName || 'Unassigned'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 italic">
                                {formatDate(item.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(item.stage)}`}>
                                    {item.stage}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OpportunitiesTable;