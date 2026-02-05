import React, { useState, useEffect } from 'react';

import CardTitle from '../basics/CardTitle';


/**
 * NewsCard: Reputation monitoring module.
 * This component orchestrates calls to the ms-news microservice via the API Gateway.
 */
const NewsCard = ({ company }) => {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        /**
         * Asynchronously fetches corporate news using a protocol translation pattern.
         * The Gateway's RequestTranslationFilter converts this POST into an internal GET request.
         */
        const fetchNewsData = async () => {
            if (!company) return;
            try {
                const response = await fetch(`/api/ms-news/news/${company}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        targetMethod: 'GET',
                        queryParams: {},
                        body: {}
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    // Maps the 'articles' collection provided by the news microservice payload
                    setNewsData(data.articles || []);
                }
            } catch (error) {
                console.error("Critical failure in information dimension fetch:", error);
                setNewsData([]);
            }
        };

        fetchNewsData();
    }, [company]);
    
    return (
        <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
            
            <CardTitle title="Related News" />

            {/* Scrollable news feed container */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {newsData.length > 0 ? (
                    newsData.map((article, index) => (
                        <div 
                            key={index} 
                            className="p-4 rounded-lg border-l-4 bg-slate-50 border-[#00204A] shadow-sm transition-all hover:shadow-md hover:translate-x-1"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E90FF]">
                                    {article.source}
                                </span>
                                <span className="text-[10px] text-gray-400 font-mono">
                                    {article.published_date}
                                </span>
                            </div>
                            
                            <h3 className="text-sm font-bold text-gray-800 mb-2 leading-snug">
                                {article.title}
                            </h3>
                            
                            <a 
                                href={article.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[10px] font-black uppercase tracking-tighter text-[#1E90FF] hover:text-[#00204A] transition-colors inline-flex items-center"
                            >
                                Read Full Insight 
                                <span className="ml-1 text-[#FFD700]">→</span>
                            </a>
                        </div>
                    ))
                ) : (
                    /* Fallback UI for empty states or connectivity issues */
                    <div className="py-20 text-center rounded-lg border-2 border-dashed border-[#FFD700] bg-yellow-50/30">
                        <p className="text-sm italic mb-2 text-[#00204A]">
                            No live feed available for: <span className="font-bold uppercase text-[#1E90FF]">{company}</span>
                        </p>
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#FFD700]">
                            Verify Gateway & Service Discovery Logs
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsCard;