export interface Answer {
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

export function calculateDomainScores(answers: Answer[]): DomainScores {
  const scores: DomainScores = { N: 0, E: 0, O: 0, A: 0, C: 0 };
  const counts: Record<keyof DomainScores, number> = { N: 0, E: 0, O: 0, A: 0, C: 0 };

  answers.forEach((answer) => {
    const domain = answer.domain as keyof DomainScores;

    if (scores.hasOwnProperty(domain)) {
      const isNegative = answer.keyed === "-";
      const adjustedScore = isNegative ? 6 - answer.score : answer.score;

      // ✅ Garante soma numérica
      scores[domain] += Number(adjustedScore);
      counts[domain]++;
    }
  });

  // ✅ Log detalhado e seguro
  console.log("✔️ Domain Scores Calculated:");
  Object.entries(scores).forEach(([key, value]) => {
    console.log(`${key}:`, value, `(${typeof value})`);
  });

  return scores;
}
