import ClientGraphic from '../basics/ClientGraphic';
import ClientTableUser from '../basics/ClientTableUser';
import CardTitle from '../basics/CardTitle';

const ClientCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
      <CardTitle title="My Clients" />
      <ClientGraphic /> 
      <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
        <ClientTableUser /> 
      </div>

    </div>
    
  );
};

export default ClientCard;