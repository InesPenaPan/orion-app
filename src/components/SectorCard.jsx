import React, { useState, useEffect } from 'react';
import RatioItem from '../basics/RatioItem';
import TrendItem from '../basics/TrendItem';

const SectorCard = ({ ticker }) => {
    const [marketData, setMarketData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSectorData = async () => {
            if (!ticker) return;
            setLoading(true);
            
            try {
                const gatewayConfig = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        targetMethod: "GET",
                        queryParams: {},
                        body: {}
                    })
                };

                const response = await fetch(`/api/ms-sector-analysis/market/${ticker}`, gatewayConfig);
                
                if (response.ok) {
                    const data = await response.json();
                    setMarketData(data);
                }
            } catch (error) {
                console.error("Error fetching sector metrics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSectorData();
    }, [ticker]);

    const ratiosData = [
        { title: 'Metric #1', value: '0.56', isPositive: false },
        { title: 'Metric #2', value: '0.30', isPositive: false },
        { title: 'Metric #3', value: '0.88', isPositive: true }
    ];

    const trendsData = [
        { title: 'Revenue', trendData: [10, 20, 15, 30, 25], isPositive: true },
        { title: 'Expenses', trendData: [5, 8, 12, 10, 15], isPositive: false },
        { title: 'Net Profit', trendData: [2, 4, 3, 6, 5], isPositive: true },
    ];

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
            
            {/* Card Title */}
            <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Sector Analysis
                </h2>
                <span className="px-4 py-1 rounded-lg bg-slate-100 text-slate-600 text-sm font-mono font-bold border border-slate-200 shadow-sm">
                            {ticker}
                </span>
            </div>

            {/* Ratios*/}
            <div className="grid grid-cols-3 gap-4">
                {ratiosData.map((ratio, index) => (
                    <RatioItem 
                        key={index}
                        title={ratio.title}
                        value={ratio.value}
                        isPositive={ratio.isPositive}
                    />
                ))}
            </div>

            {/* Trends*/}
            <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-4">
                Key Trends
            </h3>
            
            <div className="space-y-3">
                {trendsData.map((trend, index) => (
                    <TrendItem 
                        key={`trend-${index}`}
                        title={trend.title}
                        trendData={trend.trendData}
                        isPositive={trend.isPositive}
                    />
                ))}
            </div>


        </div>
    );
};

export default SectorCard;