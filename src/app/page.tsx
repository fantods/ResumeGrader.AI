'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import FileInput from './components/FileInput';
import { useClaudeAnalysis } from './hooks/useClaudeAnalysis';
import AnalysisResult from './components/AnalysisResult';
import { parseClaudeResponse } from './utils/analysisParser';
import { getErrorMessage } from './utils/errorHandler';

export default function Home() {
  const [resumeContent, setResumeContent] = useState<string>('');
  const [jobPostingContent, setJobPostingContent] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');

  const { mutate: analyzeResume, isPending, data } = useClaudeAnalysis();

  const handleEvaluate = () => {
    setAnalysisResult('');
    const loadingToast = toast.loading('Analyzing your resume...');

    analyzeResume(
      { resumeContent, jobPostingContent },
      {
        onSuccess: (data) => {
          toast.dismiss(loadingToast);
          toast.success('Analysis complete!');
          setAnalysisResult(data);
        },
        onError: (error) => {
          toast.dismiss(loadingToast);
          toast.error(getErrorMessage(error), {
            duration: 5000,
            style: {
              maxWidth: '500px',
              padding: '16px',
            },
          });
          console.error('Error analyzing resume:', error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              ResumeGrader.AI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 text-center">
              Helps you get your dream job by grading your resume and cover letter.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            <FileInput
              label="Resume"
              onContentChange={setResumeContent}
            />
            <FileInput
              label="Job Posting"
              onContentChange={setJobPostingContent}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleEvaluate}
              disabled={!resumeContent || !jobPostingContent || isPending}
              className={`px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${resumeContent && jobPostingContent && !isPending
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Evaluate'
              )}
            </button>
          </div>

          {analysisResult && data && (
            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <pre className="whitespace-pre-wrap">
                <AnalysisResult analysis={parseClaudeResponse(data)} />
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}