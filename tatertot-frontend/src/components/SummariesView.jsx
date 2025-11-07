import { useState } from 'react';
import { Play, Clock, CheckCircle, FileText } from 'lucide-react';
import LoadingScreen from './LoadingScreen';
import ArticlesList from './ArticlesList';

function SummariesView() {
  const [pipelineStatus, setPipelineStatus] = useState('idle');
  const [articles, setArticles] = useState([]);
  const [lastRunTime, setLastRunTime] = useState(null);

  const handleRunPipeline = async () => {
    setPipelineStatus('running');
    
    setTimeout(() => {
      const mockArticles = [
        {
          id: 1,
          title: "AI Safety Regulations Announced by UK Government",
          publication: "The Guardian",
          journalist: "Jane Doe",
          summary: "New comprehensive framework for AI safety introduces mandatory reporting requirements for large language models and establishes oversight committee.",
          url: "https://example.com/article1",
          collectedDate: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Luxury Brand Launches Sustainable Collection",
          publication: "Vogue Business",
          journalist: "John Smith",
          summary: "Leading fashion house unveils eco-friendly line featuring recycled materials and ethical sourcing, targeting conscious consumers.",
          url: "https://example.com/article2",
          collectedDate: new Date().toISOString(),
        },
        {
          id: 3,
          title: "Tech Giant Announces Breakthrough in Quantum Computing",
          publication: "TechCrunch",
          journalist: "Sarah Johnson",
          summary: "Revolutionary quantum processor achieves quantum supremacy with 1000+ qubits, opening new possibilities for cryptography and drug discovery.",
          url: "https://example.com/article3",
          collectedDate: new Date().toISOString(),
        },
      ];
      
      setArticles(mockArticles);
      setPipelineStatus('complete');
      setLastRunTime(new Date());
    }, 5000);
  };

  // Inside SummariesView.jsx - Idle state section

if (pipelineStatus === 'idle') {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section - Compact */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#faf8f3] mb-4 border-2 border-[#b8860b]">
          <FileText className="w-8 h-8 text-[#b8860b]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Article Pipeline Ready
        </h2>
        <p className="text-base text-gray-600 mb-6">
          Click the button below to collect and summarize the latest articles from your publications.
        </p>
        
        {/* Big Run Button */}
        <button
          onClick={handleRunPipeline}
          className="inline-flex items-center gap-3 px-8 py-3 bg-[#b8860b] text-black font-bold rounded-lg hover:bg-[#8b6914] transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
        >
          <Play className="w-5 h-5" />
          <span className="text-base">Run Pipeline</span>
        </button>
      </div>

      {/* Stats/Info Cards - Compact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#b8860b] transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-[#b8860b]" />
            <span className="text-xs font-semibold text-gray-600">Publications</span>
          </div>
          <p className="text-xl font-bold text-gray-900">40</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#b8860b] transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-[#b8860b]" />
            <span className="text-xs font-semibold text-gray-600">Avg. Runtime</span>
          </div>
          <p className="text-xl font-bold text-gray-900">~3 min</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 hover:border-[#b8860b] transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-[#b8860b]" />
            <span className="text-xs font-semibold text-gray-600">Last Run</span>
          </div>
          <p className="text-xl font-bold text-gray-900">
            {lastRunTime ? lastRunTime.toLocaleDateString() : 'Never'}
          </p>
        </div>
      </div>

      {/* How it works - Compact */}
      <div className="bg-gradient-to-br from-[#faf8f3] to-[#f5f1e6] rounded-lg p-6 border-2 border-[#b8860b] shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          How it works
        </h3>
        <ol className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#b8860b] text-white text-xs flex items-center justify-center font-bold">1</span>
            <span className="text-sm text-gray-700">Collect articles from 40+ publications</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#b8860b] text-white text-xs flex items-center justify-center font-bold">2</span>
            <span className="text-sm text-gray-700">AI summarizes each article focusing on key details</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#b8860b] text-white text-xs flex items-center justify-center font-bold">3</span>
            <span className="text-sm text-gray-700">Results saved to Google Sheets for review</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

  if (pipelineStatus === 'running') {
    return <LoadingScreen />;
  }

  if (pipelineStatus === 'complete') {
    return (
      <ArticlesList 
        articles={articles} 
        onRunAgain={() => {
          setPipelineStatus('idle');
          setArticles([]);
        }}
        lastRunTime={lastRunTime}
      />
    );
  }
}

export default SummariesView;