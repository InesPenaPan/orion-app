import OpportunitiesTableUser from '../basics/OpportunitiesTableUser';

/**
 * This component acts as a generic UI Container (Wrapper).
 * It provides a consistent frame (title, shadow, scroll) for a table.
 */

const OpportunitiesCard = () => {

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl ">
            
            <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Opportunities Pipeline
                </h2>
            </div>
            
            <div className="max-h-96 overflow-auto">
                <OpportunitiesTableUser />
            </div>

            <div className="mt-6 border-t border-gray-100 pt-4 text-right">
                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition duration-150">
                    View All Opportunities &rarr;
                </button>
            </div>
        </div>
    );
};

export default OpportunitiesCard;

