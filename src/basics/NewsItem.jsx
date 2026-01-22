import { ExternalLink } from 'lucide-react'; 

/**
 * Renders a single news entry with a clickable headline that redirects 
 * to the source article in a new browser tab.
 */
const NewsItem = ({ headline, summary, date, source, link }) => (
    <div className="mb-4 last:mb-0 border-b border-gray-50 pb-3 last:border-0">
        
        <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block"
        >
            <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors cursor-pointer flex items-start gap-1">
                <span className="flex-grow">{headline}</span>
                <ExternalLink className="w-3 h-3 mt-1 text-gray-300 group-hover:text-blue-400 flex-shrink-0" />
            </h4>
        </a>

        <p className="text-[10px] text-gray-400 italic mb-1 uppercase tracking-wide">
            {date} &bull; <span className="text-blue-500 font-semibold">{source}</span>
        </p>

        <p className="text-xs text-gray-500 leading-snug line-clamp-2">
            {summary}
        </p>
    </div>
);

export default NewsItem;