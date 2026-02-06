import OpportunitiesTable from '../basics/OpportunitiesTable';
import CardTitle from '../basics/CardTitle';

/**
 * This component acts as a generic UI Container (Wrapper).
 * It provides a consistent frame (title, shadow, scroll) for a table.
 */

const OpportunitiesCard = ({ type = 'user', clientId = null }) => {

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl ">
            
            <CardTitle title="Pipeline" />
            
            <div className="max-h-120 overflow-auto">
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

