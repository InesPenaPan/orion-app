import React, { useState, useEffect } from 'react';

const TrendChart = ({ keyword }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrend = async () => {
            if (!keyword) return;
            try {
                const gatewayConfig = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        targetMethod: "GET",
                        queryParams: {
                            "start_date": ["2025-12-01"],
                            "end_date": ["2026-1-31"]
                        },
                        body: {}
                    })
                };

                const response = await fetch(`/api/ms-sector-analysis/time-series/${keyword}`, gatewayConfig);
                if (response.ok) {
                    const json = await response.json();
                    setData(json.results || []);
                }
            } catch (error) {
                console.error(`Error fetching trend for ${keyword}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrend();
    }, [keyword]);

    if (loading) return <div className="h-6 w-20 bg-gray-100 animate-pulse rounded-full" />;
    if (data.length < 2) return <div className="h-6 w-20 border border-dashed border-gray-200 rounded-full" />;

    // --- Lógica de Escalado Visual ---
    const levels = data.map(d => d.interest_level);
    const max = Math.max(...levels);
    const min = Math.min(...levels);
    const range = max - min || 1;

    // Mapeo de puntos: x (0-100), y (escala invertida para SVG 10-90)
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 90 - ((d.interest_level - min) / range) * 80; 
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="flex flex-col items-end min-w-[100px]">
            <svg 
                viewBox="0 0 100 100" 
                className="h-10 w-24 overflow-visible"
                preserveAspectRatio="none"
            >
                {/* Sombra de área bajo la curva */}
                <polyline
                    points={`${points} 100,100 0,100`}
                    className="fill-[#1E90FF]/10 stroke-none"
                />
                {/* Línea de tendencia principal */}
                <polyline
                    points={points}
                    fill="none"
                    stroke="#1E90FF"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span className="text-[8px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                Yearly Trend
            </span>
        </div>
    );
};

export default TrendChart;