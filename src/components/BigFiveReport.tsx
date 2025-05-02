// 📁 Arquivo: src/components/BigFiveReport.tsx

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

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
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
  },
  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 14,
    marginBottom: 8,
    color: "#222",
    fontWeight: 600,
  },
  paragraph: {
    marginBottom: 8,
    textAlign: "justify",
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
  scores: Record<string, string>; // Ex: { N: "034...", E: "032..." }
}

export const BigFiveReport = ({ name, scores }: BigFiveReportProps) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      {/* Capa */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Relatório de Personalidade Big Five</Text>
        <Text style={styles.subtitle}>Nome: {name}</Text>
        <Text style={styles.subtitle}>Data: {currentDate}</Text>
      </Page>

      {/* Capítulo 1 - Introdução ao Big Five */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Capítulo 1: Introdução ao Big Five</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>O que é o Big Five e por que ele importa</Text>
          <Text style={styles.paragraph}>
            O modelo Big Five de personalidade é uma das teorias mais validadas cientificamente para compreender o comportamento humano. Ele avalia cinco grandes domínios: Neuroticismo, Extroversão, Abertura à Experiência, Agradabilidade e Conscienciosidade. Cada um deles influencia de forma significativa a forma como você pensa, sente e age.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Como interpretar seus resultados</Text>
          <Text style={styles.paragraph}>
            Este relatório apresenta suas pontuações em cada um dos cinco traços principais. Ao longo das próximas páginas, você descobrirá como essas características influenciam suas escolhas, relações, desempenho profissional e bem-estar. Os dados aqui apresentados foram organizados para ajudar você a tomar decisões mais alinhadas com sua essência.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>O Big Five e o potencial inexplorado das mulheres</Text>
          <Text style={styles.paragraph}>
            Mulheres têm, historicamente, enfrentado desafios ao expressar seus talentos autêuticos no mercado e na vida pessoal. Compreender seus traços de personalidade é um passo essencial para se posicionar com mais clareza, definir limites com mais firmeza e acessar uma liderança mais conectada com sua verdadeira natureza.
          </Text>
        </View>

        <Text style={styles.footer}>
          Sheila Martins | Relatório Big Five | Capítulo 1
        </Text>
      </Page>
    </Document>
  );
};
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

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
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    color: "#444",
  },
  section: {
    marginBottom: 16,
  },
  paragraph: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 600,
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 5,
  },
});

interface BigFiveReportProps {
  name: string;
  scores: Record<string, string>; // { N: "...", E: "...", etc. }
}

export const BigFiveReport = ({ name, scores }: BigFiveReportProps) => {
  const domains = [
    {
      key: "N",
      name: "Neuroticismo",
      interpretation:
        "Representa sua estabilidade emocional e nível de reatividade. Pessoas com alto neuroticismo tendem a experimentar emoções negativas com mais frequência.",
      situations: [
        "Você pode se sentir mais afetada por críticas ou ambientes instáveis.",
        "Tende a antecipar cenários negativos, mesmo em situações neutras.",
        "Busca segurança emocional antes de tomar decisões importantes.",
      ],
      strengths: [
        "Capacidade de antecipar riscos.",
        "Autoconsciência emocional aguçada.",
        "Empatia com emoções dos outros.",
      ],
      challenges: [
        "Tendência ao perfeccionismo.",
        "Sensibilidade ao julgamento.",
        "Dificuldade em lidar com mudanças inesperadas.",
      ],
    },
    {
      key: "E",
      name: "Extroversão",
      interpretation:
        "Mostra seu nível de energia, sociabilidade e entusiasmo. Pessoas com alta extroversão são naturalmente expressivas e se energizam com interações sociais.",
      situations: [
        "Tende a se destacar em ambientes colaborativos.",
        "Sente-se mais motivada em grupos ou parcerias.",
        "Costuma verbalizar suas ideias com facilidade.",
      ],
      strengths: [
        "Habilidade de liderar naturalmente.",
        "Facilidade para criar conexões.",
        "Entusiasmo que inspira.",
      ],
      challenges: [
        "Necessidade constante de estímulo externo.",
        "Dificuldade em apreciar momentos de introspecção.",
        "Tendência a falar antes de refletir.",
      ],
    },
    {
      key: "O",
      name: "Abertura à Experiência",
      interpretation:
        "Indica criatividade, imaginação e interesse por novas ideias. Pessoas com alta abertura são curiosas e flexíveis.",
      situations: [
        "Gosta de testar novas rotinas ou ferramentas.",
        "Busca atividades que envolvam criatividade ou mudanças.",
        "Facilidade para pensar fora da caixa.",
      ],
      strengths: [
        "Visão inovadora.",
        "Facilidade de adaptação.",
        "Mentalidade exploradora.",
      ],
      challenges: [
        "Pode se dispersar com múltiplos interesses.",
        "Nem sempre segue processos convencionais.",
        "Tendência a se entediar com rotina.",
      ],
    },
    {
      key: "A",
      name: "Amabilidade",
      interpretation:
        "Refere-se à empatia, gentileza e confiança nos outros. Pessoas altamente amáveis priorizam harmonia nas relações.",
      situations: [
        "Tende a evitar conflitos diretos.",
        "Sente-se realizada ajudando outras pessoas.",
        "Preocupa-se com o impacto de suas palavras.",
      ],
      strengths: [
        "Construção de relações saudáveis.",
        "Alto grau de empatia.",
        "Capacidade de mediação.",
      ],
      challenges: [
        "Tendência a se colocar em segundo plano.",
        "Evita confrontos necessários.",
        "Pode ter dificuldade em impor limites.",
      ],
    },
    {
      key: "C",
      name: "Conscienciosidade",
      interpretation:
        "Representa sua disciplina, organização e persistência. Altamente conscienciosas são comprometidas, determinadas e confiáveis.",
      situations: [
        "Planeja seus dias com antecedência.",
        "Tem facilidade para estabelecer e seguir metas.",
        "Valoriza entrega com qualidade.",
      ],
      strengths: [
        "Confiabilidade.",
        "Alta produtividade.",
        "Foco em resultados.",
      ],
      challenges: [
        "Autocrítica excessiva.",
        "Dificuldade em delegar.",
        "Resistência a improvisos.",
      ],
    },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Capítulo 2: Seu Perfil Personalizado</Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Visão Geral</Text>
          <Text style={styles.paragraph}>
            Este relatório foi criado para ajudar você a compreender de forma profunda como cada uma das 5 grandes dimensões da sua personalidade se manifestam no seu dia a dia. Vamos explorar seus pontos fortes, desafios naturais e como sua configuração única pode influenciar sua carreira, seus relacionamentos e seu bem-estar.
          </Text>
        </View>

        {domains.map((domain) => (
          <View key={domain.key} style={styles.section}>
            <Text style={styles.subtitle}>{domain.name} ({domain.key})</Text>
            <Text style={styles.paragraph}>
              <Text style={styles.label}>Pontuação:</Text> {scores[domain.key] || "N/A"}
            </Text>
            <Text style={styles.paragraph}>{domain.interpretation}</Text>

            <Text style={styles.label}>Como isso se manifesta na sua vida:</Text>
            {domain.situations.map((s, i) => (
              <Text key={i} style={styles.bullet}>- {s}</Text>
            ))}

            <Text style={[styles.label, { marginTop: 8 }]}>Pontos Fortes:</Text>
            {domain.strengths.map((s, i) => (
              <Text key={i} style={styles.bullet}>- {s}</Text>
            ))}

            <Text style={[styles.label, { marginTop: 8 }]}>Desafios Potenciais:</Text>
            {domain.challenges.map((s, i) => (
              <Text key={i} style={styles.bullet}>- {s}</Text>
            ))}
          </View>
        ))}

        <Text style={[styles.subtitle, { marginTop: 16 }]}>Interações entre traços</Text>
        <Text style={styles.paragraph}>
          A maneira como seus traços interagem cria uma configuração de personalidade única. Em vez de ver cada traço isoladamente, pense em como uma combinação de altos e baixos pode funcionar como pontos de equilíbrio.
        </Text>
        <Text style={styles.paragraph}>
          Exemplos de interação serão incluídos com base nas suas três pontuações mais altas ou contrastes mais fortes.
        </Text>
      </Page>
    </Document>
  );
};
{/* Capítulo 3 – Aplicações do seu perfil na carreira */}
<Page size="A4" style={styles.page}>
  <Text style={styles.chapterTitle}>Capítulo 3</Text>
  <Text style={styles.heading}>Seu Perfil e Sua Carreira</Text>

  <View style={styles.section}>
    <Text style={styles.paragraph}>
      Entender como seus traços de personalidade influenciam seu ambiente profissional pode ser o diferencial entre uma carreira satisfatória e uma rotina de frustração.
    </Text>
    <Text style={styles.paragraph}>
      A seguir, você verá como seu perfil se manifesta em situações de trabalho, quais ambientes são mais adequados para o seu estilo e quais estratégias podem te ajudar a brilhar profissionalmente.
    </Text>
  </View>

  <View style={styles.section}>
    <Text style={styles.subheading}>🌱 Ambientes de trabalho ideais</Text>
    <Text style={styles.paragraph}>
      Com base nas suas respostas, você tende a se sentir mais produtiva e engajada em ambientes que valorizam:
    </Text>
    <Text style={styles.listItem}>• {careerRecommendations.environments[0]}</Text>
    <Text style={styles.listItem}>• {careerRecommendations.environments[1]}</Text>
    <Text style={styles.listItem}>• {careerRecommendations.environments[2]}</Text>
  </View>

  <View style={styles.section}>
    <Text style={styles.subheading}>🔍 Funções alinhadas ao seu perfil</Text>
    <Text style={styles.paragraph}>
      Considerando seus pontos fortes, essas são áreas e funções onde seu perfil pode naturalmente se destacar:
    </Text>
    <Text style={styles.listItem}>• {careerRecommendations.roles[0]}</Text>
    <Text style={styles.listItem}>• {careerRecommendations.roles[1]}</Text>
    <Text style={styles.listItem}>• {careerRecommendations.roles[2]}</Text>
  </View>

  <View style={styles.section}>
    <Text style={styles.subheading}>⚠️ Desafios profissionais comuns</Text>
    <Text style={styles.paragraph}>
      Todo perfil tem suas vulnerabilidades. Aqui estão alguns desafios que você pode enfrentar:
    </Text>
    <Text style={styles.listItem}>• {careerRecommendations.challenges[0]}</Text>
    <Text style={styles.listItem}>• {careerRecommendations.challenges[1]}</Text>
    <Text style={styles.listItem}>• {careerRecommendations.challenges[2]}</Text>
  </View>

  <View style={styles.section}>
    <Text style={styles.subheading}>🚀 Estratégias para prosperar</Text>
    <Text style={styles.paragraph}>
      Para crescer profissionalmente respeitando sua autenticidade, considere:
    </Text>
    <Text style={styles.listItem}>• {careerRecommendations.strategies[0]}</Text>
    <Text style={styles.listItem}>• {careerRecommendations.strategies[1]}</Text>
    <Text style={styles.listItem}>• {careerRecommendations.strategies[2]}</Text>
  </View>
</Page>
