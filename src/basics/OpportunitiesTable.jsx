// MOCK DATA 
const mockOpportunities = [
    { name: 'License Renewal Q4', clientName: 'Tech Innovators Corp.', stage: 'Negotiation', expectedAmount: 50000, responsible: 'Juan Pérez', status: 'Abierta', probability: 80 },
    { name: 'Solar Expansion Project', clientName: 'Global Energy Solutions', stage: 'Proposal Sent', expectedAmount: 350000, responsible: 'María López', status: 'Abierta', probability: 75 },
    { name: 'Mobile POS Implementation', clientName: 'Retail Dynamics LLC', stage: 'Won', expectedAmount: 25000, responsible: 'Juan Pérez', status: 'Ganada', probability: 100 },
    { name: 'New ERP/CRM Integration', clientName: 'Health Systems Inc.', stage: 'Qualification', expectedAmount: 120000, responsible: 'Pedro Ruiz', status: 'Abierta', probability: 30 },
    { name: 'Maintenance Services', clientName: 'Automotive Future', stage: 'Closed', expectedAmount: 8000, responsible: 'María López', status: 'Perdida', probability: 0 },
    { name: 'Infrastructure Upgrade', clientName: 'Tech Innovators Corp.', stage: 'Negotiation', expectedAmount: 150000, responsible: 'Juan Pérez', status: 'Abierta', probability: 60 },
    { name: 'Cybersecurity Consulting', clientName: 'Global Energy Solutions', stage: 'Qualification', expectedAmount: 70000, responsible: 'María López', status: 'Abierta', probability: 45 },
    { name: 'New Hardware Acquisition', clientName: 'Retail Dynamics LLC', stage: 'Proposal Sent', expectedAmount: 45000, responsible: 'Pedro Ruiz', status: 'Abierta', probability: 70 },
    { name: 'Cloud Migration (AWS)', clientName: 'Health Systems Inc.', stage: 'Won', expectedAmount: 210000, responsible: 'Juan Pérez', status: 'Ganada', probability: 100 },
    { name: 'Annual Support Contract', clientName: 'Automotive Future', stage: 'Negotiation', expectedAmount: 30000, responsible: 'María López', status: 'Abierta', probability: 90 },
];

const getStatusClasses = (status) => {
    switch (status) {
        case 'Ganada':
            return 'bg-green-100 text-green-700';
        case 'Perdida':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-yellow-100 text-yellow-700';
    }
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', { 
        style: 'currency', 
        currency: 'EUR',
        minimumFractionDigits: 0 
    }).format(amount);
};

const OpportunitiesTable = ({ data = mockOpportunities }) => {

    return (
        <table className="min-w-full divide-y divide-gray-200">
                
            <thead className="bg-gray-50 sticky top-0 z-10"> 
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">
                        Opportunity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                        Client Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                        Stage
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                        Expected Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                        Responsible
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                </tr>
            </thead>
                
            <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {item.clientName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.stage}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-800">
                            {formatCurrency(item.expectedAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.responsible}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(item.status)}`}>
                                {item.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default OpportunitiesTable;