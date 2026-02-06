const TrendItem = ({ title, trendData, isPositive = true }) => {
    const titleColor = "text-slate-900"; 

    const SimpleLineChart = ({ data }) => {
        const WIDTH = 120; 
        const HEIGHT = 40;
        
        const lineColor = "#0D47A1"; 
        
        const gradientId = `trendGradient-${Math.random().toString(36).substring(7)}`; 

        if (!data || data.length < 2) {
            return (
                <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill="none">
                    <text x={WIDTH / 2} y={HEIGHT / 2} fontSize="10" textAnchor="middle" fill={lineColor} className="font-bold">No Data</text>
                </svg>
            );
        }

        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const range = maxValue - minValue;
        
        const scaleY = (value) => {
            if (range === 0) return HEIGHT / 2;
            return (HEIGHT - 4) - ((value - minValue) / range) * (HEIGHT - 8) + 4;
        };

        const scaleX = (index) => {
            return (index / (data.length - 1)) * WIDTH;
        };

        const pathData = data.map((value, index) => {
            const x = scaleX(index);
            const y = scaleY(value);
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
        
        // --- 3. RENDERIZADO DEL SVG ---
        return (
            <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: lineColor, stopOpacity: 0.3}} />
                        <stop offset="100%" style={{stopColor: lineColor, stopOpacity: 1}} />
                    </linearGradient>
                </defs>
                
                <path 
                    d={pathData}
                    stroke={`url(#${gradientId})`}
                    strokeWidth="3" 
                    fill="none"
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="drop-shadow-sm"
                />
            </svg>
        );
    };

    return (
        <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <span className={`text-sm font-black tracking-tight ${titleColor}`}>
                {title}
            </span>

            <div className="w-32 h-10 flex items-center justify-end">
                <SimpleLineChart data={trendData} />
            </div>
        </div>
    );
};

export default TrendItem;