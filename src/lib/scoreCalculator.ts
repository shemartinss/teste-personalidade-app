interface Answer {
  question_id: string;
  score: number;
  domain: string;
  facet: number;
  keyed: string;
  lead_id: string | null;
}

interface DomainScores {
  N: number; // Neuroticism
  E: number; // Extraversion
  O: number; // Openness
  A: number; // Agreeableness
  C: number; // Conscientiousness
}

// Function to calculate Big Five domain scores
export function calculateDomainScores(answers: Answer[]): DomainScores {
  const scores: DomainScores = { N: 0, E: 0, O: 0, A: 0, C: 0 };
  const counts: { [key: string]: number } = { N: 0, E: 0, O: 0, A: 0, C: 0 };

  answers.forEach((answer) => {
    // Ensure the domain is one of the Big Five keys
    if (answer.domain in scores) {
      let adjustedScore = answer.score;

      // Reverse score for negatively keyed items
      if (answer.keyed === "-") {
        adjustedScore = 6 - answer.score;
      }

      // Add the adjusted score to the correct domain
      scores[answer.domain as keyof DomainScores] += adjustedScore;
      counts[answer.domain]++;
    }
  });

  // Optional: Calculate average score per domain if needed, but raw sum is often used
  // for (const domain in scores) {
  //   if (counts[domain] > 0) {
  //     scores[domain as keyof DomainScores] = scores[domain as keyof DomainScores] / counts[domain];
  //   }
  // }

  // The IPIP-NEO-120 has 24 items per domain (120 / 5 = 24)
  // Raw scores range from 24 (24 * 1) to 120 (24 * 5)

  console.log("Calculated Raw Domain Scores:", scores);
  return scores;
}

// Example usage (can be removed later):
// const exampleAnswers: Answer[] = [
//   { question_id: 'q1', score: 5, domain: 'E', facet: 1, keyed: '+', lead_id: 'uuid1' },
//   { question_id: 'q2', score: 1, domain: 'N', facet: 1, keyed: '+', lead_id: 'uuid1' },
//   { question_id: 'q3', score: 2, domain: 'E', facet: 2, keyed: '-', lead_id: 'uuid1' }, // score becomes 6-2=4
//   // ... add more answers
// ];
// const finalScores = calculateDomainScores(exampleAnswers);
// console.log(finalScores);
