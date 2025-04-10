import { ClaudeResponse, ParsedAnalysis } from '../types/analysis';

export function parseClaudeResponse(response: ClaudeResponse): ParsedAnalysis {
  const text = response.content[0].text;
  const sections = text.split('\n\n');

  const matchPercentageMatch = text.match(/Match Percentage: (\d+)%/);
  const matchPercentage = matchPercentageMatch ? parseInt(matchPercentageMatch[1]) : 0;

  const parseSectionContent = (content: string): { category: string; points: string[] } => {
    const lines = content.split('\n');
    const category = lines[0].replace(/^\d+\.\s*/, '').replace(/:$/, '');
    const points = lines
      .slice(1)
      .filter((line) => line.trim().startsWith('-'))
      .map((line) => line.replace(/^-\s*/, '').trim());
    return { category, points };
  };

  const matchingSkillsSection = sections.find((s) =>
    s.includes('Key Matching Skills and Experience:')
  );
  const matchingSkills = matchingSkillsSection
    ? matchingSkillsSection
      .split(/\d+\.\s+/)
      .slice(1)
      .map((section) => parseSectionContent(section))
    : [];

  const missingRequirementsSection = sections.find((s) =>
    s.includes('Missing Important Keywords and Requirements:')
  );
  const missingRequirements = missingRequirementsSection
    ? missingRequirementsSection
      .split(/\d+\.\s+/)
      .slice(1)
      .map((section) => parseSectionContent(section))
    : [];

  const recommendationsSection = sections.find((s) =>
    s.includes('Specific Recommendations for Improvement:')
  );
  const recommendations = recommendationsSection
    ? recommendationsSection
      .split(/\d+\.\s+/)
      .slice(1)
      .map((section) => parseSectionContent(section))
    : [];

  const summary = sections[sections.length - 1].trim();

  return {
    matchPercentage,
    matchingSkills,
    missingRequirements,
    recommendations,
    summary,
  };
}
