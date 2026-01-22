import OpportunitiesTableUser from '../basics/OpportunitiesTableUser';
import OpportunitiesTableClient from '../basics/OpportunitiesTableClient';

/**
 * This component acts as a generic UI Container (Wrapper).
 * It provides a consistent frame (title, shadow, scroll) for a table.
 */

const OpportunitiesCard = ({ type = 'user', clientId = null }) => {

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl ">
            
            <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Opportunities Pipeline
                </h2>
            </div>
            
            <div className="max-h-120 overflow-auto">
                {type === 'user' ? (
                    <OpportunitiesTableUser />
                ) : (
                    <OpportunitiesTableClient clientId={clientId} />
                )}
            </div>
        </div>
    );
};

export default OpportunitiesCard;

