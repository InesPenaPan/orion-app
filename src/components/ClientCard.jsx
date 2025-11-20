import ClientGraphic from '../basics/ClientGraphic';
import ClientTable from '../basics/ClientTable';

const ClientCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-900">
        My Clients
      </h2>
      <ClientGraphic /> 
      <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
        <ClientTable /> 
      </div>

    </div>
    
  );
};

export default ClientCard;