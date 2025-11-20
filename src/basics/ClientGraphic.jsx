import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const mockSegmentationData = [
    { name: 'Healthcare', value: 400, color: '#00bcd4' },
    { name: 'Finance', value: 300, color: '#3f51b5' },   
    { name: 'Retail', value: 300, color: '#673ab7' },     
];

const COLORS = ['#00bcd4', '#3f51b5', '#673ab7'];

// Custom rendering de la leyenda
const renderColorfulLegendText = (value, entry) => {
    return (
        <span style={{ color: '#555', fontWeight: 500, marginLeft: '5px' }}>
            {value}
        </span>
    );
};

const ClientGraphic = () => {
    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
            <PieChart>
            <Pie
                data={mockSegmentationData}
                cx="45%" 
                cy="50%" 
                innerRadius={60} 
                outerRadius={90} 
                fill="#8884d8"
                paddingAngle={5} 
                dataKey="value"
            >
            {mockSegmentationData.map((entry, index) => (
                <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                />
            ))}
            </Pie>
          
            <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                wrapperStyle={{ right: 0, margin: '0 50px 0 0' }} 
                payload={
                    mockSegmentationData.map((item) => ({
                        id: item.name,
                        value: item.name,
                        type: 'circle',
                        color: item.color,
                    }))
                }
                formatter={renderColorfulLegendText}
                iconSize={10}
                iconType="circle"
                />
            </PieChart>
        </ResponsiveContainer>
    </div>
  );
};

export default ClientGraphic;

