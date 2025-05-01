"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

export default function LandingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter(); // Initialize router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Basic validation (can be enhanced)
    if (!name || !email || !phone) {
      setMessage("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([{ name, email, phone }])
      .select("id") // Select the id of the inserted lead
      .single(); // Expect a single row back

    setLoading(false);

    if (error) {
      console.error("Supabase error:", error); // Log the full error object
      // Check for unique constraint violation (example for email)
      if (error.code === "23505") {
        // PostgreSQL unique violation code
        setMessage(
          "Este e-mail já está cadastrado. Tente fazer o teste novamente ou use outro e-mail."
        );
      } else {
        // Display a more generic error message to the user
        setMessage("Erro ao salvar seus dados. Por favor, tente novamente.");
      }
    } else if (data) {
      console.log("Supabase success, lead ID:", data.id);
      setMessage("Dados salvos com sucesso! Iniciando o teste...");
      // Store lead_id in localStorage
      try {
        localStorage.setItem("leadId", data.id);
      } catch (e) {
        console.error("Error saving leadId to localStorage:", e);
        // Handle error - maybe inform user they need to re-register if test fails
      }
      // Redirect to welcome page after successful submission
      setTimeout(() => {
        router.push("/welcome"); // Redirect to the welcome page
      }, 1500); // Delay for user to read the success message
    } else {
      // Handle case where insert succeeded but no data was returned (should not happen with .single())
      setMessage("Erro inesperado ao salvar seus dados. Tente novamente.");
      console.error("Supabase insert succeeded but no data returned.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      {/* Apply boho chic/earthy tones using Tailwind variables */}
      <div className="w-full max-w-md p-8 space-y-6 bg-card text-card-foreground rounded-lg shadow-lg border border-border">
        <div className="text-center">
          {/* Use primary color for title */}
          <h1 className="text-3xl font-semibold text-primary">
            Descubra Sua Personalidade
          </h1>
          {/* Use muted foreground for description */}
          <p className="mt-2 text-muted-foreground">
            Faça nosso teste rápido baseado no Big Five e receba um relatório
            personalizado por e-mail.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Nome
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 bg-input border-border focus:ring-ring focus:border-primary transition-colors duration-200"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Melhor E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 bg-input border-border focus:ring-ring focus:border-primary transition-colors duration-200"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              Telefone (WhatsApp)
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(XX) XXXXX-XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 bg-input border-border focus:ring-ring focus:border-primary transition-colors duration-200"
            />
          </div>

          {/* Apply primary color to button, add hover effect */}
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Começar o Teste!"
            )}
          </Button>

          {message && (
            <p
              className={`mt-4 text-sm text-center ${message.includes("Erro") || message.includes("já cadastrado") ? "text-destructive" : "text-green-600 dark:text-green-400"}`}
            >
              {message}
            </p>
          )}
        </form>
      </div>

      <footer className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sheila Martins. Todos os direitos
        reservados.
      </footer>
    </main>
  );
}
