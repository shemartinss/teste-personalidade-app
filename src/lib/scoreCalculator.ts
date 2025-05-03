interface Answer {
  question_id: string;
  score: number;
  domain: string;
  facet: number;
  keyed: string;
  lead_id: string | null;
}

export interface DomainScores {
  N: number; // Neuroticism
  E: number; // Extraversion
  O: number; // Openness
  A: number; // Agreeableness
  C: number; // Conscientiousness
}

// Função principal para calcular os escores do Big Five
export function calculateDomainScores(answers: Answer[]): DomainScores {
  const scores: DomainScores = { N: 0, E: 0, O: 0, A: 0, C: 0 };
  const counts: { [key in keyof DomainScores]: number } = {
    N: 0,
    E: 0,
    O: 0,
    A: 0,
    C: 0,
  };

  for (const answer of answers) {
    const domain = answer.domain as keyof DomainScores;

    if (scores.hasOwnProperty(domain)) {
      const raw = answer.score;
      const adjusted = answer.keyed === '-' ? 6 - raw : raw;

      scores[domain] += adjusted;
      counts[domain]++;
    }
  }

  console.log("\u2714\ufe0f Domain Scores Calculated:");
  (Object.keys(scores) as (keyof DomainScores)[]).forEach((key) => {
    const val = scores[key];
    console.log(`${key}: ${val} (${typeof val})`);
  });

  return scores;
}
