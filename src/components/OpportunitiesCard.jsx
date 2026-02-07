import OpportunitiesTable from '../basics/OpportunitiesTable';
import CardTitle from '../basics/CardTitle';

/**
 * This component acts as a generic UI Container (Wrapper).
 * It provides a consistent frame (title, shadow, scroll) for a table.
 */

const OpportunitiesCard = ({ type = 'user', clientId = null }) => {

    return (
        <div className="relative bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
            
            {/* Elemento decorativo premium: línea de acento superior */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#00204A] via-[#1E90FF] to-[#FFD700]/50" />

            <CardTitle title="Pipeline" />
            
            <div className="max-h-120 overflow-auto custom-scrollbar">
                {type === 'user' ? (
                    <OpportunitiesTable showResponsible={false} />
                ) : (
                    <OpportunitiesTable showClient={false} clientId={clientId} />
                )}
            </div>
        </div>
    );
};

export default OpportunitiesCard;