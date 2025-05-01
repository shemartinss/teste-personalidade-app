"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
// Import confetti and window size hook
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function FinishPage() {
  const { width, height } = useWindowSize(); // Get window dimensions for confetti

  // Clear localStorage on finish page load
  useEffect(() => {
    try {
      // Keep leadId if needed for other parts, remove answers
      localStorage.removeItem("bigFiveAnswers");
      // localStorage.removeItem('leadId'); // Keep leadId for potential backend processing
    } catch (e) {
      console.error("Error clearing localStorage:", e);
    }
  }, []);

  // Placeholder URL for the upsell - replace with actual URL later
  const upsellUrl = "#"; // TODO: Replace with actual sales page URL provided by user

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">
      {/* Add Confetti */}
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
        initial={{ opacity: 0, scale: 0.9 }} // Start invisible and slightly smaller
        animate={{ opacity: 1, scale: 1 }} // Fade in and scale up
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg text-center p-8 space-y-6 bg-card text-card-foreground rounded-lg shadow-lg border border-border z-10" // Add z-10 to be above confetti
      >
        {/* Checkmark or celebration icon could go here */}
        {/* <CheckCircle className="mx-auto h-16 w-16 text-green-500" /> */}
        <h1 className="text-3xl font-semibold text-primary">Parabéns!</h1>
        <p className="text-lg text-muted-foreground">
          Você completou o teste de personalidade!
        </p>
        <p className="text-muted-foreground">
          Seu relatório personalizado está sendo preparado e será enviado para o
          seu e-mail em breve. Fique de olho na sua caixa de entrada (e na pasta
          de spam, por via das dúvidas!).
        </p>

        {/* Upsell CTA Section */}
        <div className="pt-6 border-t border-border">
          <h2 className="text-xl font-semibold text-secondary-foreground">
            Quer uma Análise AINDA MAIS PROFUNDA do Seu Perfil?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Adicione o{" "}
            <strong className="text-primary">
              'Decodificando Sua Personalidade: O Mapa da sua Potência'
            </strong>{" "}
            e descubra as 30 facetas detalhadas que compõem sua personalidade
            única. Este guia exclusivo revela nuances que o relatório básico não
            cobre e oferece insights muito mais específicos sobre como seus
            traços se manifestam em diferentes áreas da sua vida.
          </p>
          <Button
            onClick={() => window.open(upsellUrl, "_blank")} // Open in new tab
            className="mt-4 w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-ring focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] px-6 py-2"
          >
            Conheça o Guia Avançado
          </Button>
        </div>
      </motion.div>

      <footer className="mt-8 text-center text-xs text-muted-foreground z-10">
        © {new Date().getFullYear()} Sheila Martins. Todos os direitos
        reservados.
      </footer>
    </main>
  );
}
