import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Estilos do PDF
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
    color: "#8B4513", // marrom-terra
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
  scores: Record<string, string>; // Exemplo: { N: "034...", E: "023..." }
}

// Map para nome completo dos domínios
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

// Breve interpretação de cada dimensão
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

        <Text style={styles.footer}>
          © {new Date().getFullYear()} Sheila Martins — Todos os direitos reservados.
        </Text>
      </Page>
    </Document>
  );
};
