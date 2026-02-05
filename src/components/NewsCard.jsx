import React, { useState, useEffect } from 'react';
import NewsItem from '../basics/NewsItem';

/**
 * Captures global press mentions and corporate milestones for a specific company.
 */
const NewsCard = ({ company }) => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewsData = async () => {
            if (!company) return;
            setLoading(true);
            try {
                /**
                 * The RequestTranslationFilter requires a POST request with an "envelope" body
                 * to translate the call into a GET request for the internal microservices.
                 */
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
                    setNewsData(data.articles || []);
                }
            } catch (error) {
                console.error("Error connecting to ms-news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsData();
    }, [company]);
    
    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
            
            {/* Header with activity indicator */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Related News
                </h2>
                {loading && (
                    <span className="text-indigo-500 text-xs font-bold animate-pulse tracking-widest uppercase">
                        Fetching...
                    </span>
                )}
            </div>

            {/* News feed with vertical scroll */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {newsData.length > 0 ? (
                    newsData.map((article, index) => (
                        <NewsItem 
                            key={index}
                            headline={article.title}
                            summary={article.description}
                            date={article.published_date}
                            source={article.source}
                            link={article.url}
                        />
                    ))
                ) : !loading && (
                    <div className="py-10 text-center text-gray-400 italic text-sm">
                        No recent press mentions found for this entity.
                    </div>
                )}
            </div>
           
        </div>
    );
};

export default NewsCard;