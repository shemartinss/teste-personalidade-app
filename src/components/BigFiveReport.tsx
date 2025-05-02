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
  scores: Record<string, string>;
}

const getDomainName = (domain: string): string => {
  const map = {
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
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Relatório de Personalidade Big Five</Text>

        <View style={styles.section}>
          <Text>Nome: {name}</Text>
          <Text>Data: {new Date().toLocaleDateString()}</Text>
        </View>

        {Object.entries(scores).map(([domain, rawScore]) => (
          <View key={domain} style={styles.section}>
            <Text style={styles.heading}>
              {getDomainName(domain)} ({domain})
            </Text>
            <Text style={styles.score}>Respostas: {rawScore}</Text>
            <Text>{interpretations[domain]}</Text>
          </View>
        ))}

        {/* Capítulo 4 – Relacionamentos */}
        <View style={styles.section}>
          <Text style={styles.heading}>Capítulo 4 – Seu Perfil e Seus Relacionamentos</Text>
          <Text>
            Seu perfil de personalidade influencia diretamente a forma como você se conecta com as pessoas.
            Este capítulo revela suas fortalezas, desafios e estratégias para relações mais saudáveis e significativas.
          </Text>
          <Text style={styles.heading}>💡 Pontos fortes relacionais:</Text>
          <Text>
            ● Pessoas com alta agradabilidade tendem a ser empáticas e confiáveis.
            ● Um perfil extrovertido pode se destacar em construir redes sociais amplas.
            ● Alta abertura favorece conexões profundas baseadas em ideias e valores.
          </Text>
          <Text style={styles.heading}>⚠️ Desafios comuns:</Text>
          <Text>
            ● Neuroticismo elevado pode gerar reações intensas a críticas ou conflitos.
            ● Baixa extroversão pode dificultar o início de novas amizades.
            ● Conscienciosidade excessiva pode levar a exigências rígidas nos relacionamentos.
          </Text>
          <Text style={styles.heading}>🔑 Estratégias para conexões mais profundas:</Text>
          <Text>
            ● Pratique escuta ativa e validação emocional, principalmente se você tem baixa agradabilidade.
            ● Agende momentos de socialização mesmo que sua energia social seja limitada.
            ● Permita-se vulnerabilidade: relações íntimas florescem com autenticidade.
          </Text>
          <Text style={styles.heading}>💬 Comunicação efetiva para o seu perfil:</Text>
          <Text>
            ● Se você tem alta extroversão, cuide para não dominar as conversas.
            ● Se você é mais introvertido, planeje e ensaie mensagens importantes.
            ● Use seu ponto forte — seja ele escuta, clareza ou empatia — como ferramenta principal.
          </Text>
        </View>

        {/* Capítulo 5 – Bem-estar */}
        <View style={styles.section}>
          <Text style={styles.heading}>Capítulo 5 – Seu Perfil e Seu Bem-Estar</Text>
          <Text>
            Seu bem-estar emocional, mental e físico é diretamente influenciado por seus traços de personalidade.
            Entender suas tendências naturais pode ajudar a manter seu equilíbrio e evitar o esgotamento.
          </Text>
          <Text style={styles.heading}>⚠️ Sinais de alerta para o seu perfil:</Text>
          <Text>
            ● Alto neuroticismo: risco de ansiedade, ruminação excessiva e baixa autoestima.
            ● Baixa conscienciosidade: dificuldade para manter rotinas saudáveis e regular o sono.
            ● Extroversão baixa: isolamento e perda de estímulos sociais importantes.
          </Text>
          <Text style={styles.heading}>✔️ Práticas de autocuidado recomendadas:</Text>
          <Text>
            ● Para neuroticismo: journaling, terapia cognitivo-comportamental, respiração consciente.
            ● Para conscienciosidade: checklists simples, metas semanais, reforço positivo.
            ● Para extroversão: grupos de apoio, aulas em grupo, atividades culturais.
          </Text>
          <Text style={styles.heading}>🌧️ Estratégias para gerenciar o estresse:</Text>
          <Text>
            ● Estabeleça limites claros com pessoas e tarefas.
            ● Priorize atividades que recarregam sua energia, mesmo que pareçam pequenas.
            ● Desenvolva uma prática de gratidão alinhada ao seu estilo pessoal.
          </Text>
          <Text style={styles.heading}>⏳ Rotinas diárias que apoiam seu equilíbrio:</Text>
          <Text>
            ● Comece o dia com uma intenção clara (para alta abertura, visualize; para alta C, escreva).
            ● Reserve tempo para introspecção ou movimento, de acordo com sua energia.
            ● Tenha espaço de recuperação após momentos intensos.
          </Text>
        </View>

        {/* Capítulo 6 – Potencializando Seus Pontos Fortes */}
        <View style={styles.section}>
          <Text style={styles.heading}>Capítulo 6 – Potencializando Seus Pontos Fortes</Text>
          <Text>
            Todo perfil carrega consigo uma potência única. Identificar e usar seus talentos naturais é a chave para viver com mais autenticidade e realização.
          </Text>
          <Text style={styles.heading}>🦸‍♀️ Seus superpoderes baseados no Big Five:</Text>
          <Text>
            ● Conscienciosidade alta: você transforma visão em execução com disciplina e foco.{"\n"}
            ● Abertura alta: sua mente fértil é fonte de inovação, sensibilidade artística e visão ampla.{"\n"}
            ● Extroversão alta: você energiza ambientes e cria oportunidades onde há conexões.{"\n"}
            ● Agradabilidade alta: seu coração acolhedor inspira confiança e colaboração.{"\n"}
            ● Neuroticismo baixo: sua estabilidade emocional transmite segurança mesmo em tempos difíceis.
          </Text>
          <Text style={styles.heading}>🔍 Como posicionar suas forças:</Text>
          <Text>
            ● Torne visível seu diferencial: fale com orgulho das qualidades que te movem.{"\n"}
            ● Crie rotinas que nutram suas forças diariamente.{"\n"}
            ● Use sua linguagem de potência ao apresentar projetos, ideias ou defender seu ponto de vista.
          </Text>
          <Text style={styles.heading}>🌟 Situações onde você naturalmente brilha:</Text>
          <Text>
            ● Quando está em ambientes que reconhecem sua autenticidade.{"\n"}
            ● Quando pode colocar seus talentos a serviço de um propósito.{"\n"}
            ● Quando há espaço para ritmo próprio e autonomia na entrega.
          </Text>
        </View>

        <Text style={styles.footer}>
          © {new Date().getFullYear()} Sheila Martins — Todos os direitos reservados.
        </Text>
      </Page>
    </Document>
  );
};
