import { useState, useEffect } from 'react';
import { Loader2, CheckCircle, Clock } from 'lucide-react';

function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { label: 'Initializing pipeline...', duration: 1000 },
    { label: 'Collecting articles from publications...', duration: 2000 },
    { label: 'Running AI summarization...', duration: 1500 },
    { label: 'Saving to Google Sheets...', duration: 500 },
  ];

  useEffect(() => {
    let stepTimer;
    let progressTimer;

    progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 50);

    const progressSteps = () => {
      if (currentStep < steps.length - 1) {
        stepTimer = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, steps[currentStep].duration);
      }
    };

    progressSteps();

    return () => {
      clearTimeout(stepTimer);
      clearInterval(progressTimer);
    };
  }, [currentStep]);

  return (
    <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[calc(100vh-300px)]">
      {/* Main Loading Card - Compact */}
      <div className="bg-white rounded-lg shadow-2xl border-2 border-[#b8860b] p-8 text-center w-full">
        {/* Animated Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#faf8f3] border-2 border-[#b8860b] mb-4">
          <Loader2 className="w-8 h-8 text-[#b8860b] animate-spin" />
        </div>

        {/* Status Text */}
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Pipeline Running
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          This usually takes 2-3 minutes...
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div 
              className="bg-[#b8860b] h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 font-semibold">{progress}% complete</p>
        </div>

        {/* Step Progress - Compact */}
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                index === currentStep 
                  ? 'bg-[#faf8f3] border-2 border-[#b8860b]' 
                  : index < currentStep
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              {index < currentStep ? (
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              ) : index === currentStep ? (
                <Loader2 className="w-4 h-4 text-[#b8860b] flex-shrink-0 animate-spin" />
              ) : (
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
              <span className={`text-xs font-semibold ${
                index === currentStep 
                  ? 'text-gray-900' 
                  : index < currentStep
                  ? 'text-green-900'
                  : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Fun fact while waiting - Compact */}
        <div className="mt-4 p-3 bg-gradient-to-r from-[#faf8f3] to-[#f5f1e6] rounded-lg border-2 border-[#b8860b]">
          <p className="text-xs text-gray-700">
            ✨ <span className="font-bold">Did you know?</span> Our AI reads and summarizes articles 100x faster than a human!
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;