const NewsCard = () => {

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
            
            {/* Card Title */}
            <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Related News
                </h2>
            </div>
           
        </div>
    );
};

export default NewsCard;