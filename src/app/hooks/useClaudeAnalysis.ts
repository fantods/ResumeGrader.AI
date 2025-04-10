'use client';

import { useMutation } from '@tanstack/react-query';

interface AnalysisInput {
    resumeContent: string;
    jobPostingContent: string;
}

const analyzeWithClaude = async ({ resumeContent, jobPostingContent }: AnalysisInput) => {
    const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeContent, jobPostingContent }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to analyze resume');
    }

    return response.json();
};

export function useClaudeAnalysis() {
    return useMutation({
        mutationFn: analyzeWithClaude,
    });
}