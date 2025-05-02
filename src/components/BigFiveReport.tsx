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
