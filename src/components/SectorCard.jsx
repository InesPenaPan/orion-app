import React, { useState, useEffect } from 'react';
import { Zap, Building2, BookOpen } from 'lucide-react';
import RatioItem from '../basics/RatioItem';
import CardTitle from '../basics/CardTitle';
import TrendChart from '../basics/TrendChart';

/**
 * This component acts as a high-level dashboard for sectoral analysis. It aggregates 
 * real-time market snapshots and dynamic industry insights into a single view.
 */
const SectorCard = ({ ticker }) => {
    const [marketData, setMarketData] = useState(null);
    const [industryInsights, setIndustryInsights] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllSectorData = async () => {
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

                const [marketRes, trendsRes] = await Promise.all([
                    fetch(`/api/ms-sector-analysis/market/${ticker}`, gatewayConfig),
                    fetch(`/api/ms-sector-analysis/trends/${ticker}`, gatewayConfig)
                ]);

                if (marketRes.ok) {
                    const mData = await marketRes.json();
                    setMarketData(mData);
                }

                if (trendsRes.ok) {
                    const tData = await trendsRes.json();
                    setIndustryInsights(tData);
                }

            } catch (error) {
                console.error("Connectivity Error [Sector Analysis]:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllSectorData();
    }, [ticker]);

    const ratiosData = marketData ? [
        { 
            title: 'Close Price', 
            value: `$${marketData.last_close_price.current_value.toFixed(2)}`, 
            isPositive: marketData.last_close_price.current_value >= marketData.last_close_price.previous_value 
        },
        { 
            title: 'Market Cap', 
            value: (marketData.market_cap.current_value / 1e9).toFixed(2) + 'B', 
            isPositive: marketData.market_cap.current_value >= marketData.market_cap.previous_value 
        },
        { 
            title: 'Daily Volume', 
            value: (marketData.volume.current_value / 1e6).toFixed(2) + 'M', 
            isPositive: marketData.volume.current_value >= marketData.volume.previous_value 
        }
    ] : [];

    const getInsightIcon = (type) => {
        if (type.includes('Company')) return <Building2 size={18} className="text-slate-400" />;
        if (type.includes('Novel') || type.includes('Author')) return <BookOpen size={18} className="text-slate-400" />;
        return <Zap size={18} className="text-slate-400" />;
    };

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
            
            <CardTitle 
                title="Sector Analysis" 
                ticker={ticker} 
            />

            {/* Snapshots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {ratiosData.map((ratio, index) => (
                    <RatioItem 
                        key={index}
                        title={ratio.title}
                        value={ratio.value}
                        isPositive={ratio.isPositive}
                    />
                ))}
            </div>

            {/* Dynamic Industry Insights */}
            <div className="pt-2">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center mb-6">
                    {industryInsights?.industry_name || 'Industry'} Trends
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                    {industryInsights?.suggestions?.map((item, index) => (
                        <div 
                            key={index}
                            className="group flex items-center justify-between p-3 rounded-lg border border-gray-50 bg-gray-50/30 hover:bg-white hover:border-[#1E90FF]/20 hover:shadow-sm transition-all duration-300"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="transition-colors">
                                    {getInsightIcon(item.type)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#00204A]">{item.title}</p>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{item.type}</p>
                                </div>
                            </div>

                            {/* Contenedor flexible para el Sparkline */}
                            <div className="flex items-center">
                                <TrendChart keyword={item.title} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SectorCard;