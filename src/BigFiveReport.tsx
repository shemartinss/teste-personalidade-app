// 📁 Arquivo: src/components/BigFiveReport.tsx

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
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
});

interface BigFiveReportProps {
  name: string;
  scores: Record<string, string>; // exemplo: { N: "034...", E: "023..." }
}

// Texto explicativo básico (você pode expandir depois)
const interpretations: Record<string, string> = {
  N: "Neuroticismo representa sua estabilidade emocional e nível de reatividade.",
  E: "Extroversão mostra seu nível de energia, sociabilidade e entusiasmo.",
  O: "Abertura à experiência indica criatividade, imaginação e interesse por novas ideias.",
  A: "Agradabilidade se refere à empatia, gentileza e confiança nos outros.",
  C: "Conscienciosidade representa sua disciplina, organização e persistência."
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
              {domain} - {interpretations[domain] || "Dimensão"}
            </Text>
            <Text style={styles.score}>Respostas: {rawScore}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};
