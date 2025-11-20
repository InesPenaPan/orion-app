import { useNavigate } from 'react-router-dom';

const mockClientsData = [
    { clientName: 'Tech Innovators Corp.', stockCode: 'TIC' },
    { clientName: 'Global Energy Solutions', stockCode: 'GES' },
    { clientName: 'Retail Dynamics LLC', stockCode: 'RDL' },
    { clientName: 'Health Systems Inc.', stockCode: 'HSI' },
    { clientName: 'Automotive Future',  stockCode: 'AUF' },
    { clientName: 'Software Giants Co.', stockCode: 'SGC' },
    { clientName: 'Financial Hub Group',  stockCode: 'FHG' },
    { clientName: 'Logistics Fast Track',  stockCode: 'LFT' }, 
];


const ClientTable = ({ data = mockClientsData }) => {
    const navigate = useNavigate();

    // Function to handle row click and navigate to the client's detail page
    const handleRowClick = (clientName) => {
        const clientUrlName = encodeURIComponent(clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
        navigate(
            `/client/${clientUrlName}`,
            { 
                state: { 
                    clientFullName: clientName 
                }
            }
        );
    };

    return (
        <div className="overflow-x-auto"> 
            <table className="min-w-full divide-y divide-gray-200">
                
                <thead className="bg-gray-50 sticky top-0 z-10"> 
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[250px]">
                            Client Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                            Code
                        </th>
                    </tr>
                </thead>
                    
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr 
                        key={index}
                        onClick={() => handleRowClick(item.clientName)}
                        className="hover:bg-gray-50 transition duration-150"
                        >
                            
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.clientName}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {item.stockCode || 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientTable;