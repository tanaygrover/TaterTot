import { RefreshCw, ExternalLink, User, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

function ArticlesList({ articles, onRunAgain, lastRunTime }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header with Run Again button - Fixed at top */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Article Summaries
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            {articles.length} articles collected {lastRunTime && `• ${formatDistanceToNow(lastRunTime, { addSuffix: true })}`}
          </p>
        </div>

        <button
          onClick={onRunAgain}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#b8860b] text-black font-medium rounded-lg hover:bg-[#8b6914] transition-colors shadow-md hover:shadow-lg"
        >
          <RefreshCw className="w-4 h-4" />
          Run Again
        </button>
      </div>

      {/* Success Banner - Compact */}
      <div className="mb-4 p-3 bg-[#faf8f3] border-2 border-[#b8860b] rounded-lg flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-[#b8860b] flex items-center justify-center">
            <span className="text-white text-sm font-bold">✓</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Pipeline completed successfully!</p>
          <p className="text-xs text-gray-700">Articles have been collected and summarized.</p>
        </div>
      </div>

      {/* Articles Grid - Scrollable with max height */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {articles.map(article => (
            <div 
              key={article.id}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 hover:shadow-xl hover:border-[#b8860b] transition-all h-fit"
            >
              {/* Article Header */}
              <div className="mb-2">
                <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                  <span className="font-semibold text-[#b8860b]">
                    {article.publication}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {article.journalist}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.collectedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-gray-700 mb-3 leading-relaxed line-clamp-3">
                {article.summary}
              </p>

              {/* Read More Link */}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#b8860b] hover:text-[#8b6914] font-semibold text-xs"
              >
                Read full article
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticlesList;