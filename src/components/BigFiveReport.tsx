import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { DomainScores } from "@/lib/scoreCalculator";

// Estilos compatíveis com react-pdf
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
  },
  section: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
  },
  heading: {
    fontSize: 16,
    marginBottom: 4,
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

const domainLabels: Record<keyof DomainScores, string> = {
  N: "Neuroticismo",
  E: "Extroversão",
  O: "Abertura à Experiência",
  A: "Agradabilidade",
  C: "Conscienciosidade",
};

const interpretations: Record<keyof DomainScores, string> = {
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
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Relatório de Personalidade Big Five</Text>
        <Text style={styles.heading}>Nome: {name || "Usuário"}</Text>
        <Text style={styles.heading}>Data: {currentDate}</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Capítulo 2 – Seu Perfil Personalizado</Text>
        {Object.entries(scores).map(([domain, score]) => {
          const key = domain as keyof DomainScores;
          return (
            <View key={domain} style={styles.section}>
              <Text style={styles.heading}>
                {domainLabels[key]} ({key})
              </Text>
              <Text style={styles.score}>Pontuação: {score}</Text>
              <Text>{interpretations[key]}</Text>
            </View>
          );
        })}
      </Page>
    </Document>
  );
};
