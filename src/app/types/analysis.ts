interface MatchingSkill {
  category: string;
  points: string[];
}

interface MissingRequirement {
  category: string;
  points: string[];
}

interface Recommendation {
  category: string;
  points: string[];
}

export interface ParsedAnalysis {
  matchPercentage: number;
  matchingSkills: MatchingSkill[];
  missingRequirements: MissingRequirement[];
  recommendations: Recommendation[];
  summary: string;
}

export interface ClaudeResponse {
  id: string;
  type: string;
  role: string;
  model: string;
  content: Array<{
    type: string;
    text: string;
  }>;
  stop_reason: string;
  stop_sequence: null;
  usage: {
    input_tokens: number;
    output_tokens: number;
    cache_creation_input_tokens: number;
    cache_read_input_tokens: number;
  };
}
