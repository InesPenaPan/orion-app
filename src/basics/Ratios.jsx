import { TrendingUp, TrendingDown } from 'lucide-react';

const RatioItem = ({ title, value, isPositive = true }) => {
    const trendColor = isPositive ? "text-green-600" : "text-red-600";
    const Icon = isPositive ? TrendingUp : TrendingDown;

    return (
        <div className="p-2">
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            
            <div className="flex items-center space-x-2">
                <span className={`text-4xl font-bold text-gray-800`}>
                    {value}
                </span>
                <Icon className={`w-6 h-6 ${trendColor}`} />
            </div>
        </div>
    );
};

const Ratios = () => {
    // Mock data 
    const ratiosData = [
        { title: 'Metric #1', value: '0.56', isPositive: false }, 
        { title: 'Metric #2', value: '0.34', isPositive: true }, 
        { title: 'Metric #4', value: '0.81', isPositive: true },  
        { title: 'Metric #5', value: '0.29', isPositive: true },  
    ];

    return (
        <div>
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
    );
};

export default Ratios;