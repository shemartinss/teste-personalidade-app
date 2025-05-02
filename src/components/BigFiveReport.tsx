import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { DomainScores } from "@/lib/scoreCalculator";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    color: "#333",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#8B4513",
  },
  section: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottom: "1px solid #ccc",
  },
  heading: {
    fontSize: 16,
    marginBottom: 4,
    color: "#444",
  },
  score: {
    fontSize: 14,
    marginBottom: 4,
  },
  footer: {
    marginTop: 40,
    fontSize: 10,
    textAlign: "center",
    color: "#777",
  },
});

interface BigFiveReportProps {
  name: string;
  scores: DomainScores;
}

const getDomainName = (domain: string): string => {
  const map: Record<string, string> = {
    N: "Neuroticismo",
    E: "Extroversão",
    O: "Abertura à Experiência",
    A: "Agradabilidade",
    C: "Conscienciosidade",
  };
  return map[domain] || domain;
};

const interpretations: Record<string, string> = {
  N: "Representa sua estabilidade emocional e nível de reatividade.",
  E: "Mostra seu nível de energia, sociabilidade e entusiasmo.",
  O: "Indica criatividade, imaginação e interesse por novas ideias.",
  A: "Refere-se à empatia, gentileza e confiança nos outros.",
  C: "Representa sua disciplina, organização e persistência.",
};

export const BigFiveReport = ({ name, scores }: BigFiveReportProps) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      {/* Capa */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Relatório de Personalidade Big Five</Text>
        <Text style={styles.heading}>Nome: {name}</Text>
        <Text style={styles.heading}>Data: {currentDate}</Text>
      </Page>

      {/* Capítulo 1 – Introdução */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Capítulo 1 – Introdução ao Big Five</Text>
        <View style={styles.section}>
          <Text>
            O modelo Big Five é a estrutura mais aceita pela psicologia moderna para compreender a personalidade. Este relatório mostrará como seus traços influenciam sua carreira, relacionamentos e bem-estar.
          </Text>
        </View>
      </Page>

      {/* Capítulo 2 – Perfil personalizado */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Capítulo 2 – Seu Perfil Personalizado</Text>
        {scores &&
          Object.entries(scores).map(([domain, rawScore]) => (
            <View key={domain} style={styles.section}>
              <Text style={styles.heading}>
                {getDomainName(domain)} ({domain})
              </Text>
              <Text style={styles.score}>Respostas: {rawScore}</Text>
              <Text>{interpretations[domain]}</Text>
            </View>
          ))}
      </Page>

      {/* Capítulo 3 – Carreira */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Capítulo 3 – Sua Carreira</Text>
        <View style={styles.section}>
          <Text>
            Com base nos seus traços de personalidade, este capítulo apresenta os ambientes ideais, funções mais alinhadas e estratégias para prosperar profissionalmente.
          </Text>
        </View>
      </Page>

      {/* Capítulo 4 – Relacionamentos */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Capítulo 4 – Seus Relacionamentos</Text>
        <View style={styles.section}>
          <Text>
            Como seu perfil influencia suas conexões com os outros. Fortalezas, desafios e estratégias de comunicação para relações saudáveis e profundas.
          </Text>
        </View>
      </Page>

      {/* Capítulo 5 – Bem-estar */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Capítulo 5 – Seu Bem-Estar</Text>
        <View style={styles.section}>
          <Text>
            Entenda como suas características afetam seu equilíbrio emocional e físico. Descubra práticas personalizadas para seu autocuidado.
          </Text>
        </View>
      </Page>

      {/* Capítulo 6 – Pontos Fortes */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Capítulo 6 – Potencializando Seus Pontos Fortes</Text>
        <View style={styles.section}>
          <Text>
            Identifique seus talentos naturais com base no seu perfil e descubra como posicioná-los de forma estratégica na vida pessoal e profissional.
          </Text>
        </View>
      </Page>

      {/* Capítulo 7 – Trabalhando com Desafios */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Capítulo 7 – Trabalhando com Seus Desafios</Text>
        <View style={styles.section}>
          <Text>
            Cada traço traz aprendizados em potencial. Este capítulo é um convite para olhar com gentileza para seus padrões desafiadores e transformá-los em oportunidades de crescimento.
          </Text>
          <Text style={styles.heading}>🧩 Padrões limitantes a observar:</Text>
          <Text>
            ● Alto neuroticismo pode gerar interpretações negativas sobre si e os outros.{"\n"}
            ● Baixa abertura pode limitar suas opções por medo do novo.{"\n"}
            ● Agradabilidade baixa pode dificultar colaborações e gerar conflitos evitáveis.
          </Text>
          <Text style={styles.heading}>🛠️ Estratégias de desenvolvimento:</Text>
          <Text>
            ● Use o autoconhecimento como mapa: observe quais situações disparam seus padrões.{"\n"}
            ● Pratique pausas conscientes antes de reagir.{"\n"}
            ● Invista em feedback e ajuste de rota com apoio de mentores, pares ou terapeutas.
          </Text>
          <Text style={styles.heading}>💬 Reframings poderosos para o seu perfil:</Text>
          <Text>
            ● "Sensibilidade não é fraqueza, é antena."{"\n"}
            ● "Organização é liberdade, não rigidez."{"\n"}
            ● "Abertura é coragem em movimento."
          </Text>
        </View>
        <Text style={styles.footer}>
          © {new Date().getFullYear()} Sheila Martins — Todos os direitos reservados.
        </Text>
      </Page>

      {/* Capítulo 8 – Exercícios e Próximos Passos */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Capítulo 8 – Exercícios e Próximos Passos</Text>
        <View style={styles.section}>
          <Text>
            A jornada de autoconhecimento não termina com um relatório. Ela se aprofunda com a observação, a experiência e a experimentação consciente. Este último capítulo oferece práticas e recursos para te acompanhar nos próximos passos.
          </Text>
          <Text style={styles.heading}>📝 Exercício 1: Diário de Observação de Padrões</Text>
          <Text>
            Reserve 5 minutos ao final do seu dia para anotar situações marcantes. O que você sentiu? Qual traço seu estava ativo? O que funcionou bem? O que poderia ter sido diferente?
          </Text>
          <Text style={styles.heading}>🧪 Exercício 2: Experimento de Expansão</Text>
          <Text>
            Escolha uma área da vida onde você quer se desenvolver. Com base no seu traço menos dominante, proponha um pequeno desafio semanal. Ex: Para baixa extroversão, um café com uma nova pessoa.
          </Text>
          <Text style={styles.heading}>🔋 Exercício 3: Mapeamento de Energia</Text>
          <Text>
            Durante uma semana, anote em que momentos você se sente energizada e em quais se sente drenada. Relacione isso aos seus traços de personalidade e ajuste sua rotina de forma mais estratégica.
          </Text>
          <Text style={styles.heading}>📚 Recursos recomendados</Text>
          <Text>
            ● Livro: "Inteligência Emocional" – Daniel Goleman{"\n"}
            ● Podcast: "Autoconsciente" com Regina Gianetti{"\n"}
            ● Prática: Meditação guiada + journaling 10 min/dia
          </Text>
          <Text style={styles.heading}>📆 Plano de Desenvolvimento Pessoal (4 semanas)</Text>
          <Text>
            Semana 1: Diário de observação + análise dos gatilhos{"\n"}
            Semana 2: Pequeno desafio de expansão semanal{"\n"}
            Semana 3: Reflexão sobre comunicação e relacionamentos{"\n"}
            Semana 4: Planejamento de rotina alinhada aos seus traços
          </Text>
          <Text style={styles.heading}>💌 Convite Final</Text>
          <Text>
            Espero que este material tenha ampliado sua compreensão sobre si mesma. Caso deseje aprofundar, conhecer seus subfatores e receber um plano 100% guiado, estou aqui para te acompanhar.
          </Text>
        </View>
        <Text style={styles.footer}>
          © {new Date().getFullYear()} Sheila Martins — Todos os direitos reservados.
        </Text>
      </Page>
    </Document>
  );
};
