"use client";

import React, { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function FinishPage() {
  const { width, height } = useWindowSize();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    try {
      localStorage.removeItem("bigFiveAnswers");
    } catch (e) {
      console.error("Erro ao limpar localStorage:", e);
    }

    const leadId = localStorage.getItem("leadId");
    if (!leadId) {
      setStatus("error");
      console.error("leadId não encontrado no localStorage.");
      return;
    }

    const sendReport = async () => {
      setStatus("sending");

      try {
        console.log("Enviando leadId para API:", leadId);

        const res = await fetch("/api/generate-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leadId }),
        });

        if (!res.ok) {
          const errorText = await res.text(); // ← Captura resposta de erro
          throw new Error(`Erro na requisição: ${res.status} - ${errorText}`);
        }

        setStatus("success");
      } catch (error) {
        console.error("Erro ao enviar o relatório:", error);
        setStatus("error");
      }
    };

    sendReport();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={300}
        tweenDuration={10000}
      />

      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

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
          Seu relatório está sendo preparado e será enviado para o seu e-mail em instantes.
        </p>

        {status === "sending" && (
          <p className="text-sm text-muted-foreground">
            Enviando relatório por e-mail...
          </p>
        )}
        {status === "success" && (
          <p className="text-sm text-green-600">
            ✅ Relatório enviado com sucesso!
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">
            ❌ Erro ao enviar o relatório. Verifique seu e-mail ou tente mais tarde.
          </p>
        )}
      </motion.div>

      <footer className="mt-8 text-center text-xs text-muted-foreground z-10">
        © {new Date().getFullYear()} Sheila Martins. Todos os direitos reservados.
      </footer>
    </main>
  );
}
