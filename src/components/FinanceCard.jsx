import React, { useState, useEffect } from 'react';
import RatioItem from '../basics/RatioItem';
import TimeSeries from '../basics/TimeSeries';
import NewsItem from '../basics/NewsItem';
import CardTitle from '../basics/CardTitle';

/**
 * Displays financial health metrics, revenue growth trends, and real-time news 
 * for a specific stock ticker by orchestrating multiple microservice calls.
 */
const FinanceCard = ({ ticker }) => {
    const [financialData, setFinancialData] = useState(null);
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            if (!ticker) return;
            setLoading(true);
            try {
                /**
                 * The RequestTranslationFilter requires a POST request with an "envelope" body
                 * to translate the call into a GET request for the internal microservices.
                 */
                const gatewayConfig = (method) => ({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        targetMethod: method,
                        queryParams: {},
                        body: {}
                    })
                });

                /**
                 * Execute parallel fetches to optimize performance
                 */
                const [financeRes, newsRes] = await Promise.all([
                    fetch(`/api/ms-finance/finance/${ticker}`, gatewayConfig("GET")),
                    fetch(`/api/ms-finance/news/${ticker}`, gatewayConfig("GET"))
                ]);

                if (financeRes.ok) setFinancialData(await financeRes.json());
                if (newsRes.ok) {
                    const nData = await newsRes.json();
                    setNewsData(nData.latest_headlines || []);
                }
            } catch (error) {
                console.error("Error connecting to ms-finance:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [ticker]);

    /**
     * Financial Ratios Mapping
     */
    const ratiosData = financialData ? [
        { title: 'Market Cap', value: (financialData.market_cap.current_value / 1e12).toFixed(2) + 'T', isPositive: financialData.market_cap.current_value >= financialData.market_cap.previous_value },
        { title: 'Current Ratio', value: financialData.current_ratio.current_value.toFixed(3), isPositive: financialData.current_ratio.current_value >= financialData.current_ratio.previous_value },
        { title: 'Quick Ratio', value: financialData.quick_ratio.current_value.toFixed(3), isPositive: financialData.quick_ratio.current_value >= financialData.quick_ratio.previous_value },
        { title: 'Debt to Equity', value: financialData.debt_to_equity.current_value.toFixed(3), isPositive: financialData.debt_to_equity.current_value <= financialData.debt_to_equity.previous_value },
    ] : [];

    return (
        <div className="w-full bg-white rounded-xl shadow-xl overflow-hidden py-6 px-8 border border-gray-100 transition duration-300 hover:shadow-2xl">
            
            <CardTitle 
                title="Finance Module" 
                ticker={ticker} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 items-start">

                {/* Section 1: Metrics (20%) */}
                <div className="lg:col-span-2">
                    <div className="flex flex-col space-y-4">
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

                {/* Section 2: Expanded Chart (40%) */}
                <div className="lg:col-span-4 border-x border-gray-100 px-8 h-full min-h-[250px] flex flex-col justify-center">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase mb-6 tracking-[0.3em] text-center">
                        Revenue Growth Trend (%)
                    </h3>
                    <div className="h-56 w-full">
                        <TimeSeries
                            data={financialData?.quarterly_revenue_growth} 
                            labels={financialData?.report_dates}
                        />
                    </div>
                </div>

                {/* Section 3: News (40%) */}
                <div className="lg:col-span-4 pr-2">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center mb-6">
                        Market Insights
                        <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                    </h3>
                    
                    <div className="space-y-1 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar"> 
                        {newsData.length > 0 ? (
                            newsData.map((item, index) => (
                                <NewsItem 
                                    key={index}
                                    headline={item.title}
                                    summary={item.summary}
                                    date={new Date(item.publish_date).toLocaleDateString()}
                                    source={item.publisher}
                                    link={item.link} 
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                                <p className="text-sm italic">Searching news...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinanceCard;