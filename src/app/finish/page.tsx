"use client";

import React, { useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function FinishPage() {
  const { width, height } = useWindowSize();

  // Limpar respostas ao carregar a página de finalização
  useEffect(() => {
    try {
      localStorage.removeItem("bigFiveAnswers");
    } catch (e) {
      console.error("Erro ao limpar localStorage:", e);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">
      {/* Efeito de confete */}
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={300}
        tweenDuration={10000}
      />

      {/* Botão de modo claro/escuro */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      {/* Bloco principal com mensagem de parabéns */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg text-center p-8 space-y-6 bg-card text-card-foreground rounded-lg shadow-lg border border-border z-10"
      >
        <h1 className="text-3xl font-semibold text-primary">Parabéns!</h1>
        <p className="text-lg text-muted-foreground">
          Você completou o teste de personalidade!
        </p>
        <p className="text-muted-foreground">
          Seu relatório personalizado está sendo preparado e será enviado para o
          seu e-mail em breve. Fique de olho na sua caixa de entrada (e na pasta
          de spam, por via das dúvidas!).
        </p>
      </motion.div>

      {/* Rodapé */}
      <footer className="mt-8 text-center text-xs text-muted-foreground z-10">
        © {new Date().getFullYear()} Sheila Martins. Todos os direitos reservados.
      </footer>
    </main>
  );
}
