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
    <div className="relative bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
      
      {/* Elemento decorativo premium: línea de acento superior */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#00204A] via-[#1E90FF] to-[#FFD700]/50" />

      <CardTitle title="Client Portfolio" />
      
      <ClientGraphic data={mySectors} />
      
      <div className="max-h-60 overflow-y-auto border border-gray-100 rounded-lg custom-scrollbar">
        <ClientTableUser /> 
      </div>
    </div> 
  );
};

export default ClientCard;