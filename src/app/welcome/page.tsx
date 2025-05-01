"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Import motion for animations

export default function WelcomePage() {
  const router = useRouter();

  const startTest = () => {
    router.push("/test"); // Navigate to the test page
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      {/* Add motion.div for entry animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Start invisible and slightly down
        animate={{ opacity: 1, y: 0 }} // Fade in and move up
        transition={{ duration: 0.5, ease: "easeOut" }} // Animation duration and easing
        className="w-full max-w-lg text-center p-8 space-y-6 bg-card text-card-foreground rounded-lg shadow-lg border border-border"
      >
        <h1 className="text-3xl font-semibold text-primary">Quase lá!</h1>
        <p className="text-lg text-muted-foreground">
          Obrigado por se inscrever! Você está a um passo de descobrir mais
          sobre sua personalidade única.
        </p>
        <p className="text-muted-foreground">
          O teste a seguir contém 120 afirmações. Responda honestamente,
          indicando o quanto cada afirmação se aplica a você. Não há respostas
          certas ou erradas.
        </p>
        <p className="text-sm text-muted-foreground">
          Reserve alguns minutos em um local tranquilo para completar o teste.
        </p>

        <Button
          onClick={startTest}
          className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] px-8 py-3 text-lg"
        >
          Começar o Teste
        </Button>
      </motion.div>

      <footer className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sheila Martins. Todos os direitos
        reservados.
      </footer>
    </main>
  );
}
