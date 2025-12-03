const Bar = ({ height, label }) => (
    <div className="flex flex-col items-center justify-end h-28"> 
        <div 
            className="w-6 bg-blue-600 rounded-t-sm transition-all duration-500" 
            style={{ height: `${height}%` }} 
        ></div>
    </div>
);

const BarGraphic = () => {
    // Mock data 
    const dataPoints = [
        { height: 80, label: 'Q1' },
        { height: 50, label: 'Q2' },
        { height: 40, label: 'Q3' },
        { height: 95, label: 'Q4' },
    ];

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Temporal Series</h3>
            <div className="flex justify-around items-end h-32 border-b border-gray-200 pt-2">
                {dataPoints.map((point, index) => (
                    <Bar key={index} height={point.height} label={point.label} />
                ))}
            </div>
        </div>
    );
};

export default BarGraphic;