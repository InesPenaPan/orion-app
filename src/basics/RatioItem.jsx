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

export default RatioItem;


