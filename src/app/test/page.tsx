"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ModeToggle } from "@/components/mode-toggle";
import { supabase } from "@/lib/supabaseClient";
import questions from "@/lib/questions";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: string;
  text: string;
  keyed: string;
  domain: string;
  facet: number;
}

interface Answer {
  question_id: string;
  score: number;
  domain: string;
  facet: number;
  keyed: string;
  lead_id: string | null;
}

export default function TestPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedValues, setSelectedValues] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedLeadId = localStorage.getItem("leadId");
      if (storedLeadId) {
        setLeadId(storedLeadId);
      } else {
        console.error("Lead ID not found in localStorage.");
        setErrorMsg("Erro: ID do usuário não encontrado. Por favor, comece pela página inicial.");
      }
    } catch (e) {
      console.error("Error reading leadId from localStorage:", e);
      setErrorMsg("Erro ao carregar informações do usuário.");
    }
  }, [router]);

  const totalQuestions = questions.length;
  const currentQuestion: Question = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleRadioChange = (value: string) => {
    const updated = [...selectedValues];
    updated[currentQuestionIndex] = value;
    setSelectedValues(updated);

    setTimeout(() => handleAnswer(parseInt(value, 10)), 150);
  };

  const handleAnswer = async (score: number) => {
    if (loading || !leadId) return;
    setLoading(true);
    setErrorMsg(null);

    const answer: Answer = {
      question_id: currentQuestion.id,
      score: score,
      domain: currentQuestion.domain,
      facet: currentQuestion.facet,
      keyed: currentQuestion.keyed,
      lead_id: leadId,
    };

    const { error } = await supabase.from("answers").insert([answer]);

    if (error) {
      console.error("Error saving answer:", error);
      setErrorMsg(`Erro ao salvar resposta: ${error.message}. Tente novamente.`);
      setLoading(false);
      return;
    }

    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      try {
        localStorage.setItem("bigFiveAnswers", JSON.stringify(updatedAnswers));
      } catch (e) {
        console.error("Error saving answers to localStorage:", e);
      }
      router.push("/finish");
    }

    setLoading(false);
  };

  const likertOptions = [
    { value: 1, label: "Discordo Fortemente" },
    { value: 2, label: "Discordo" },
    { value: 3, label: "Neutro" },
    { value: 4, label: "Concordo" },
    { value: 5, label: "Concordo Fortemente" },
  ];

  const variants = {
    enter: {
      opacity: 0,
      x: 50,
    },
    center: {
      zIndex: 1,
      opacity: 1,
      x: 0,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      x: -50,
    },
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300 overflow-hidden">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <div className="w-full max-w-2xl p-8 space-y-8 bg-card text-card-foreground rounded-lg shadow-lg border border-border">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress
            value={progress}
            className="w-full h-2 transition-all duration-300 ease-in-out"
          />
          <p className="text-sm text-center text-muted-foreground">
            Pergunta {currentQuestionIndex + 1} de {totalQuestions}
          </p>
        </div>

        {/* Animated Question Area */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentQuestionIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="text-center min-h-[60px] flex items-center justify-center"
          >
            <p className="text-xl md:text-2xl font-semibold">
              {currentQuestion.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Likert Scale Options */}
        <RadioGroup
          value={selectedValues[currentQuestionIndex] ?? undefined}
          onValueChange={handleRadioChange}
          className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-4 pt-4"
          disabled={loading || !leadId}
        >
          {likertOptions.map((option) => (
            <div key={option.value} className="flex flex-col items-center space-y-2">
              <RadioGroupItem
                value={option.value.toString()}
                id={`q${currentQuestionIndex}-o${option.value}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`q${currentQuestionIndex}-o${option.value}`}
                className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all w-full h-full text-center ${loading || !leadId ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="text-xs sm:text-sm font-medium">{option.label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {/* Error Message */}
        {errorMsg && (
          <p className="text-center text-sm text-destructive mt-4">{errorMsg}</p>
        )}
      </div>

      <footer className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sheila Martins. Todos os direitos reservados.
      </footer>
    </main>
  );
}
