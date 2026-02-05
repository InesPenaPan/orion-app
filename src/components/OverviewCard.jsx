import React, { useState, useEffect } from 'react';

import CardTitle from '../basics/CardTitle';

/**
 * Formats a numeric value into a 'k' string format with one decimal.
 */
const formatK = (value) => {
    const num = value ? value / 1000 : 0;
    return `$ ${num.toFixed(1)}k`;
}

/**
 * Reusable sub-component to display individual metric stats
 */
const MetricItem = ({ title, value, colorClass = "text-gray-800" }) => (
    <div className="flex-1 text-center p-2">
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <div className="flex items-center justify-center space-x-2">
            <span className={`text-4xl font-bold ${colorClass}`}>
                {value}
            </span>
        </div>
    </div>
);

const OverviewCard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                /**
                 * API CALL VIA VITE PROXY
                 * We use '/api' prefix so Vite intercepts the request and forwards it 
                 * to the 'orion-gateway' container within the Docker network.
                 */
                const response = await fetch('api/ms-crm/opportunities/user/1', {
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

                if (!response.ok) throw new Error(`Error: ${response.status}`);

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOverview();
    }, []);

    if (loading) return <div className="p-6 text-center">Cargando estadísticas...</div>;
    if (error) return <div className="p-6 text-center text-red-500">Error al cargar datos</div>;

    /** 
     * * Mapping API response keys to the UI visual structure.
     */
    const metrics = [
        { title: 'Won', value: formatK(data?.won), colorClass: "text-blue-600" },
        { title: 'Lost', value: formatK(data?.lost), colorClass: "text-red-500" },
        { title: 'Pending', value: formatK(data?.pending), colorClass: "text-yellow-600" },
    ];

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
            <CardTitle title="My Operations" />
            
            <div className="flex flex-col sm:flex-row justify-between divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                {metrics.map((metric, index) => (
                    <MetricItem 
                        key={index}
                        title={metric.title}
                        value={metric.value}
                        colorClass={metric.colorClass}
                    />
                ))}
            </div>
        </div>
    );
};

export default OverviewCard;