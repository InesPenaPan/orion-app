import Ratios from '../basics/Ratios';
import BarGraphic from '../basics/BarGraphic';
import NewsItem from '../basics/NewsItem';

const FinanceCard = () => {

    // Mock news
    const newsData = [
        {
            headline: 'Headline #1: El mercado de bonos reacciona a los nuevos tipos de la Fed',
            summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            date: '2025-12-01',
            source: 'Wall Street Journal'
        },
        {
            headline: 'Headline #4: Las acciones de tecnología superan las expectativas del trimestre',
            summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
            date: '2025-11-28',
            source: 'Reuters'
        },
        {
            headline: 'Cambios en la directiva que afectan la estrategia a largo plazo',
            summary: 'El nuevo CEO ha anunciado una reestructuración de la deuda y un enfoque en mercados emergentes para los próximos dos años.',
            date: '2025-11-25',
            source: 'Bloomberg'
        },
    ];


    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
            
            {/* Card Title */}
            <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Finance Module
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-9 gap-6">

                {/* Ratios */}
                <div className="md:col-span-3">
                    <Ratios />
                </div>

                {/* Time series */}
                <div className="md:col-span-3 border-l border-gray-200 pl-6">
                    <BarGraphic />
                </div>

                {/* News List */}
                <div className="md:col-span-3 border-l border-gray-200 pl-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Stock news</h3>
                    <div className="space-y-4 max-h-36 overflow-y-auto pr-2"> 
                        {newsData.map((item, index) => (
                            <NewsItem 
                                key={index}
                                headline={item.headline}
                                summary={item.summary}
                                date={item.date}
                                source={item.source}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinanceCard;