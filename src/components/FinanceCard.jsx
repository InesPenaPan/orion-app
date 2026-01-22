import React, { useState, useEffect } from 'react';

import RatioItem from '../basics/RatioItem';
import BarGraphic from '../basics/BarGraphic';
import NewsItem from '../basics/NewsItem';

const FinanceCard = ({ ticker }) => {
    const [financialData, setFinancialData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFinanceData = async () => {
            if (!ticker) return;
            
            try {
                const response = await fetch(`/api/ms-finance/finance/${ticker}`, {
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

                if (response.ok) {
                    const data = await response.json();
                    setFinancialData(data);
                }
            } catch (error) {
                console.error("Error fetching finance data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFinanceData();
    }, [ticker]);

    // Mock news
    const newsData = [
        {
            headline: 'Headline #1: El mercado de bonos reacciona a los nuevos tipos de la Fed',
            summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            date: '2025-12-01',
            source: 'Wall Street Journal'
        },
        {
            headline: 'Headline #4: Las acciones de tecnología superan las expectativas del trimestre',
            summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
            date: '2025-11-28',
            source: 'Reuters'
        },
        {
            headline: 'Cambios en la directiva que afectan la estrategia a largo plazo',
            summary: 'El nuevo CEO ha anunciado una reestructuración de la deuda y un enfoque en mercados emergentes para los próximos dos años.',
            date: '2025-11-25',
            source: 'Bloomberg'
        },
    ];

    /**
     * Mapping financial metrics from JSON response to UI structure
     */
    const ratiosData = financialData ? [
        { 
            title: 'Market Cap', 
            value: (financialData.market_cap.current_value / 1e12).toFixed(2) + 'T', 
            isPositive: financialData.market_cap.current_value >= financialData.market_cap.previous_value 
        },
        { 
            title: 'Current Ratio', 
            value: financialData.current_ratio.current_value.toFixed(3), 
            isPositive: financialData.current_ratio.current_value >= financialData.current_ratio.previous_value 
        },
        { 
            title: 'Quick Ratio', 
            value: financialData.quick_ratio.current_value.toFixed(3), 
            isPositive: financialData.quick_ratio.current_value >= financialData.quick_ratio.previous_value 
        },
        { 
            title: 'Debt to Equity', 
            value: financialData.debt_to_equity.current_value.toFixed(3), 
            isPositive: financialData.debt_to_equity.current_value <= financialData.debt_to_equity.previous_value 
        },
    ] : [];

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
            
            {/* Card Title */}
            <div className="flex flex-col items-start space-y-2 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Finance Module
                </h2>
                {ticker ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-200 text-gray-700 text-sm font-mono font-bold border border-gray-300 shadow-sm">
                        {ticker}
                    </span>
                ) : (
                    <span className="text-sm text-gray-400 italic">No ticker available</span>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-9 gap-6">

                {/* Ratios */}
                <div className="md:col-span-3">
                    <div className="grid grid-cols-2 gap-4">
                        {ratiosData.map((ratio, index) => (
                            <RatioItem 
                                key={index}
                                title={ratio.title}
                                value={ratio.value}
                                isPositive={ratio.isPositive}
                            />
                        ))}
                    </div>
                </div>

                {/* Time series */}
                <div className="md:col-span-3 border-l border-gray-200 pl-6">
                    <BarGraphic />
                </div>

                {/* News List */}
                <div className="md:col-span-3 border-l border-gray-200 pl-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Stock news</h3>
                    <div className="space-y-4 max-h-36 overflow-y-auto pr-2"> 
                        {newsData.map((item, index) => (
                            <NewsItem 
                                key={index}
                                headline={item.headline}
                                summary={item.summary}
                                date={item.date}
                                source={item.source}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinanceCard;