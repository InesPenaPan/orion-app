import { DollarSign, BarChart, Clock } from 'lucide-react'; 

const MetricItem = ({ title, value, colorClass = "text-gray-800" }) => (
    <div className="flex-1 text-center p-2">
        {/* Title/Label */}
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        
        <div className="flex items-center justify-center space-x-2">
            {/* Value */}
            <span className={`text-4xl font-bold ${colorClass}`}>
                {value}
            </span>
        </div>
    </div>
);

const OverviewCard = () => {
    // Mock data based on the image provided
    const metrics = [
        { title: 'Total sales', value: '$ 650k', colorClass: "text-blue-600" },
        { title: 'New sales', value: '$ 231k', colorClass: "text-green-600" },
        { title: 'Pending', value: '$ 470k', colorClass: "text-yellow-600" },
    ];

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
            
            {/* Card Title */}
            <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Overview
                </h2>
            </div>
            
            {/* Metrics Grid/Flex Container */}
            <div className="flex flex-col sm:flex-row justify-between divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                {metrics.map((metric, index) => (
                    <MetricItem 
                        key={index}
                        title={metric.title}
                        value={metric.value}
                        colorClass={metric.colorClass}
                    />
                ))}
            </div>
        </div>
    );
};

export default OverviewCard;