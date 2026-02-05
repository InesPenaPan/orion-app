/**
 * A standardized heading component for the Orion platform.
 */
const CardTitle = ({ title, ticker, loading }) => {
    return (
        <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
            <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold flex items-center text-[#00204A]">
                    {title}
                </h2>

                {/* Optional Ticker Badge following the established design system */}
                {ticker && (
                    <span className="px-4 py-1 rounded-lg text-sm font-mono font-bold border shadow-sm bg-[#00204A] text-white border-[#00204A]">
                        {ticker}
                    </span>
                )}
            </div>
        </div>
    );
};

export default CardTitle;