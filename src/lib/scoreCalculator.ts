// scoreCalculator.ts

interface Answer {
  question_id: string;
  score: number;
  domain: string;
  facet: number;
  keyed: string;
  lead_id: string | null;
}

export interface DomainScores {
  N: number;
  E: number;
  O: number;
  A: number;
  C: number;
}

export function calculateDomainScores(answers: Answer[]): DomainScores {
  const scores: DomainScores = {
    N: 0,
    E: 0,
    O: 0,
    A: 0,
    C: 0,
  };

  for (const answer of answers) {
    const domain = answer.domain as keyof DomainScores;
    const score = Number(answer.score); // Garante que seja número
    const adjusted = answer.keyed === "-" ? 6 - score : score;

    if (Object.prototype.hasOwnProperty.call(scores, domain)) {
      scores[domain] += adjusted;
    } else {
      console.warn("❗ Domínio inválido:", domain);
    }
  }

  console.log("✔️ Domain Scores Calculated:");
  for (const key of Object.keys(scores) as (keyof DomainScores)[]) {
    const val = scores[key];
    console.log(`${key}: ${val} (${typeof val})`);
  }

  return scores;
}
