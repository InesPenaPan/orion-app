// File: ../basics/NewsItem.jsx

const NewsItem = ({ headline, summary, date, source }) => (
    <div className="mb-3 last:mb-0">
        
        <h4 className="text-sm font-bold text-gray-800 hover:text-blue-600 cursor-pointer">
            {headline}
        </h4>

        <p className="text-xs text-gray-400 italic mb-1">
            {date} &bull; {source}
        </p>

        <p className="text-xs text-gray-500 leading-snug line-clamp-3">
            {summary}
        </p>
    </div>
);

export default NewsItem;