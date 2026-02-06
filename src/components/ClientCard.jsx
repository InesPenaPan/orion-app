import ClientGraphic from '../basics/ClientGraphic';
import ClientTableUser from '../basics/ClientTableUser';
import CardTitle from '../basics/CardTitle';

const mySectors = [
    { name: 'Technology', value: 450 },
    { name: 'Financial Services', value: 300 },
    { name: 'Consumer Discretionary', value: 150 },
];

const ClientCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
      <CardTitle title="Clients" />
      <ClientGraphic data={mySectors} />
      <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
        <ClientTableUser /> 
      </div>
    </div> 
  );
};

export default ClientCard;