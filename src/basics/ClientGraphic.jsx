import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const BLUE_PALETTE = [
    '#054A91', 
    '#1E90FF', 
    '#4DA8FF', 
    '#99CFFF',
];

const renderColorfulLegendText = (value) => {
    return (
        <span className="text-sm font-bold text-gray-600 ml-2 capitalize tracking-tight">
            {value}
        </span>
    );
};

/**
 * Renders a high-end Donut Chart for sector distribution.
 */
const ClientGraphic = ({ data = [] }) => {
    
    const formattedData = data.map((item, index) => ({
        ...item,
        color: item.color || BLUE_PALETTE[index % BLUE_PALETTE.length]
    }));

    return (
        <div className="w-full max-w-[470px] h-[240px] mx-auto p-2">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Tooltip 
                        contentStyle={{ 
                            borderRadius: '12px', 
                            border: 'none', 
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            fontSize: '12px'
                        }}
                    />
                    
                    <Pie
                        data={formattedData}
                        cx="35%" 
                        cy="50%"
                        innerRadius={55} 
                        outerRadius={85}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {formattedData.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={entry.color} 
                                className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                            />
                        ))}
                    </Pie>

                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        iconSize={12} 
                        iconType="circle"
                        formatter={renderColorfulLegendText}
                        wrapperStyle={{
                            paddingLeft: '20px',
                            lineHeight: '32px' 
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ClientGraphic;