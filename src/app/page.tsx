'use client';

import { useState } from 'react';
import FileInput from './components/FileInput';
import { useClaudeAnalysis } from './hooks/useClaudeAnalysis';
import AnalysisResult from './components/AnalysisResult';
import { parseClaudeResponse } from './utils/analysisParser';



export default function Home() {
  const [resumeContent, setResumeContent] = useState<string>('');
  const [jobPostingContent, setJobPostingContent] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');

  const { mutate: analyzeResume, isPending, data } = useClaudeAnalysis();

  const handleEvaluate = () => {
    analyzeResume(
      { resumeContent, jobPostingContent },
      {
        onSuccess: (data) => {
          setAnalysisResult(data);
        },
        onError: (error) => {
          console.error('Error analyzing resume:', error);
          // Handle error appropriately (show error message to user)
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ResumeGrader.AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center">
            Helps you get your dream job by grading your resume and cover letter.
          </p>

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
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${resumeContent && jobPostingContent && !isPending
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
            >
              {isPending ? 'Analyzing...' : 'Evaluate'}
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