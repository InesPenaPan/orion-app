import React, { useState, useEffect } from 'react';
import CardTitle from '../basics/CardTitle';

const NewsCard = ({ company }) => {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
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
                    setNewsData(data.articles || []);
                }
            } catch (error) {
                console.error("Critical failure in intelligence dimension fetch:", error);
                setNewsData([]);
            }
        };

        fetchNewsData();
    }, [company]);

    return (
        <div className="relative overflow-hidden bg-[#ffffff] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-7 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)]">
            
            {/* Elemento decorativo premium: línea de acento superior */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#00204A] via-[#1E90FF] to-[#FFD700]/50" /> 

            <div className="flex items-center justify-between mb-8">
                <CardTitle title="Related News" />
            </div>

            <div className="space-y-6 max-h-[520px] overflow-y-auto pr-3 custom-scrollbar scroll-smooth">
                {newsData.length > 0 ? (
                    newsData.map((article, index) => (
                        <div 
                            key={index} 
                            className="group relative p-5 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-sm transition-all duration-300"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <div className="px-2 py-1 rounded bg-[#00204A]/5 border border-[#00204A]/10">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-[#00204A]">
                                        {article.source}
                                    </span>
                                </div>
                                <span className="text-[15px] text-gray-400 font-mono tracking-tighter italic">
                                    {article.published_date}
                                </span>
                            </div>
                            
                            {/* Título como enlace directo */}
                            <a 
                                href={article.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <h3 className="text-[15px] font-semibold text-[#1a1a1a] mb-2 leading-[1.4] hover:text-[#1E90FF] transition-colors duration-300 cursor-pointer">
                                    {article.title}
                                </h3>
                            </a>

                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                {article.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="py-24 text-center rounded-2xl border border-dashed border-gray-200 bg-slate-50/30 backdrop-blur-sm">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm mb-4">
                            <span className="text-xl text-[#FFD700]">!</span>
                        </div>
                        <p className="text-xs font-medium text-[#00204A] mb-1">
                            No active intelligence for <span className="text-[#1E90FF] tracking-widest font-black uppercase">{company}</span>
                        </p>
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                            Diagnostic: Check Node Discovery
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsCard;