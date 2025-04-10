import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
    try {
        if (!process.env.ANTHROPIC_API_KEY) {
            throw new Error('ANTHROPIC_API_KEY is not configured');
        }

        const { resumeContent, jobPostingContent } = await request.json();

        if (!resumeContent || !jobPostingContent) {
            return NextResponse.json(
                {
                    error: 'Validation Error',
                    message: 'Resume and job posting content are required',
                    details: {
                        resumeContent: !resumeContent ? 'Resume content is required' : null,
                        jobPostingContent: !jobPostingContent ? 'Job posting content is required' : null,
                    }
                },
                { status: 400 }
            );
        }

        const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-latest",
            max_tokens: 1000,
            temperature: 0.7,
            system: `You are an expert resume analyst and career coach. Analyze the provided resume against 
                    the job posting to determine the match percentage and provide specific recommendations for improvement.
                    Focus on key skills, experience alignment, and missing keywords.`,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Please analyze this resume against the job posting:
                
                RESUME:
                ${resumeContent}
                
                JOB POSTING:
                ${jobPostingContent}
                
                Provide a detailed analysis including:
                1. Match percentage
                2. Key matching skills and experience
                3. Missing important keywords and requirements
                4. Specific recommendations for improvement`
                        }
                    ]
                }
            ]
        });

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error analyzing resume:', error);

        if (error instanceof Anthropic.APIError) {
            return NextResponse.json(
                {
                    error: 'API Error',
                    message: 'Error communicating with AI service',
                    details: error.message
                },
                { status: error.status || 500 }
            );
        }

        return NextResponse.json(
            {
                error: 'Internal Server Error',
                message: 'An unexpected error occurred',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}