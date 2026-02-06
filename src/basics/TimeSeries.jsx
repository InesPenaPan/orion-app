/**
 * This component renders a high-fidelity, interactive "Trend Line" chart using pure SVG.
 * It is specifically designed for financial data visualization, emphasizing quarterly
 * revenue growth relative to a zero-point baseline.
 */
const TimeSeries = ({ data, labels }) => {
    if (!data || data.length === 0) {
        return <div className="h-full flex items-center justify-center text-gray-400 italic text-xs">No data available</div>;
    }

    const width = 500;
    const height = 350;
    const paddingX = 20;
    const paddingY = 20;
    const centerY = height / 2;

    const formatLabel = (dateStr) => {
        const date = new Date(dateStr);
        return `Q${Math.floor(date.getMonth() / 3) + 1} '${date.getFullYear().toString().slice(-2)}`;
    };

    const points = data.map((val, i) => {
        const x = (i * (width - paddingX * 2)) / (data.length - 1) + paddingX;
        const y = centerY - (val * (centerY - paddingY) * 2); 
        return { x, y, val };
    });

    const linePath = points.reduce((acc, point, i, str) => {
        if (i === 0) return `M ${point.x},${point.y}`;
        const prev = str[i - 1];
        const cpsX = prev.x + (point.x - prev.x) / 2;
        return `${acc} C ${cpsX},${prev.y} ${cpsX},${point.y} ${point.x},${point.y}`;
    }, "");

    const areaPath = `${linePath} L ${points[points.length - 1].x},${centerY} L ${points[0].x},${centerY} Z`;

    return (
        <div className="w-full h-full flex flex-col items-center bg-white p-4 rounded-xl">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1E90FF" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#1E90FF" stopOpacity="0" />
                    </linearGradient>
                </defs>

                <g className="text-[18px] fill-[#00204A] font-bold opacity-40">
                    <text x="0" y={centerY - (centerY - paddingY)}>+50%</text>
                    <text x="0" y={centerY + 4}>0%</text>
                    <text x="0" y={centerY + (centerY - paddingY)}>-50%</text>
                </g>

                <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#f3f4f6" strokeWidth="1" />
                <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#f3f4f6" strokeWidth="1" />
                <line x1={paddingX} y1={centerY} x2={width - paddingX} y2={centerY} stroke="#00204A" strokeWidth="1" opacity="0.2" />

                <path d={areaPath} fill="url(#areaGradient)" />

                <path
                    d={linePath}
                    fill="none"
                    stroke="#00204A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-sm"
                />

                {points.map((p, i) => (
                    <g key={i} className="group cursor-pointer">
                        <circle cx={p.x} cy={p.y} r="10" fill="#FFD700" className="opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r="4.5"
                            fill="#FFD700"
                            stroke="rgba(255, 252, 77, 0.94)"
                            strokeWidth="1.5"
                            className="transition-transform duration-300 group-hover:scale-125 shadow-sm"
                        />
                        
                        <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <rect x={p.x - 30} y={p.y - 45} width="60" height="30" rx="4" fill="#00204A" shadow-xl />
                            <text x={p.x} y={p.y - 24} textAnchor="middle" className="text-[20px] font-bold fill-[#FFD700]">
                                {(p.val * 100).toFixed(1)}%
                            </text>
                        </g>
                    </g>
                ))}
            </svg>

            <div className="flex justify-between w-full px-[40px] mt-4">
                {labels.map((l, i) => (
                    <span key={i} className="text-[12px] font-black text-[#00204A] opacity-60 uppercase tracking-tighter">
                        {formatLabel(l)}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TimeSeries;