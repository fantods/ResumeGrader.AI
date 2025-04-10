'use client';

import { ParsedAnalysis } from '../types/analysis';

interface AnalysisResultProps {
  analysis: ParsedAnalysis;
}

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="text-6xl font-bold text-blue-600">{analysis.matchPercentage}%</div>
        <div className="text-gray-600 dark:text-gray-400">Match Score</div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Matching Skills</h2>
        {analysis.matchingSkills.map((skill, index) => (
          <div key={index} className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h3 className="font-semibold text-green-800 dark:text-green-300">{skill.category}</h3>
            <ul className="mt-2 space-y-1">
              {skill.points.map((point, i) => (
                <li key={i} className="text-green-700 dark:text-green-400">
                  • {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Areas for Improvement</h2>
        {analysis.missingRequirements.map((req, index) => (
          <div key={index} className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h3 className="font-semibold text-red-800 dark:text-red-300">{req.category}</h3>
            <ul className="mt-2 space-y-1">
              {req.points.map((point, i) => (
                <li key={i} className="text-red-700 dark:text-red-400">
                  • {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recommendations</h2>
        {analysis.recommendations.map((rec, index) => (
          <div key={index} className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300">{rec.category}</h3>
            <ul className="mt-2 space-y-1">
              {rec.points.map((point, i) => (
                <li key={i} className="text-blue-700 dark:text-blue-400">
                  • {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold">Summary</h2>
        <p className="text-gray-700 dark:text-gray-300">{analysis.summary}</p>
      </div>
    </div>
  );
}
