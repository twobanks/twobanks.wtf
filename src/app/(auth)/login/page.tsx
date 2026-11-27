"use client";

import { LogoTwoBanks } from "@/components/twobanks";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = identifier.trim();
    if (!email) return;

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/otp/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep("otp");
      } else {
        setMessage(data.error || "Erro ao enviar código.");
      }
    } catch {
      setMessage("Erro ao enviar código.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função isolada de submissão para poder ser chamada automaticamente ou via clique
  const executeSignIn = async (code: string) => {
    if (isLoading) return;

    setIsLoading(true);
    setMessage("");

    const result = await signIn("credentials", {
      identifier,
      otp: code,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.ok) {
      window.location.href = "/admin";
    } else {
      setMessage("Código inválido ou expirado.");
    }
  };

  // Submissão manual (caso o usuário aperte o botão "Verificar" ou "Enter")
  const handleVerifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    await executeSignIn(otp);
  };

  // Lida com a digitação e dispara o login automático ao atingir 6 dígitos
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOtp = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(newOtp);

    if (newOtp.length === 6) {
      executeSignIn(newOtp);
    }
  };

  const resetToEmailStep = () => {
    setStep("email");
    setOtp("");
    setMessage("");
  };

  return (
    <div className="flex flex-1 h-full min-h-[calc(100vh-5rem)] w-full bg-background overflow-hidden">
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 border-r border-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
          <div className="w-[200%] h-[1px] bg-foreground/[0.03] absolute rotate-0" />
          <div className="w-[200%] h-[1px] bg-foreground/[0.03] absolute rotate-90" />
          <div className="w-[200%] h-[1px] bg-foreground/[0.03] absolute rotate-45" />
          <div className="w-[200%] h-[1px] bg-foreground/[0.03] absolute -rotate-45" />
        </div>

        <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-62 md:w-[200px] lg:w-[400px] flex items-center justify-center">
            <LogoTwoBanks className="w-full h-auto text-brand-blue transition-colors duration-300 ease-in-out" />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative overflow-y-auto">
        <div className="w-full max-w-[420px] bg-card border border-border/60 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col items-center">
          {step === "email" ? (
            <div className="flex flex-col items-center text-center w-full">
              <div className="w-12 h-12 mb-6 rounded-full bg-surface-1 flex items-center justify-center border border-border">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                </svg>
              </div>
              
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                Acesse sua conta
              </h2>
              <p className="text-sm text-subtle-foreground mb-8">
                Insira seu email para continuar
              </p>

              <form onSubmit={handleSendCode} className="w-full space-y-5">
                <div className="w-full">
                  <input
                    type="email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="hi@company.com"
                    required
                    autoFocus
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-subtle-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-all text-base sm:text-sm text-center"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-3.5 rounded-xl text-sm transition-colors"
                >
                  {isLoading ? "Enviando..." : "Continuar"}
                </button>
              </form>

              {message && (
                <div className="text-sm text-destructive mt-6">
                  {message}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center w-full">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                Por favor, verifique seu email
              </h2>
              <p className="text-sm text-subtle-foreground mb-8">
                Enviamos um código para{" "}
                <span className="font-medium text-foreground">{identifier}</span>
              </p>

              <form onSubmit={handleVerifyOtp} className="w-full flex flex-col items-center">
                <div className="relative flex justify-between gap-2 w-full mb-8">
                  {[0, 1, 2, 3, 4, 5].map((index) => {
                    const isActive = otp.length === index;
                    const isFilled = otp.length > index;
                    return (
                      <div
                        key={index}
                        className={`w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center rounded-lg text-lg font-medium transition-all
                          ${isActive && !isLoading ? 'border-2 border-ring bg-background' : 'border border-border bg-transparent'}
                          ${isFilled ? 'text-foreground' : 'text-subtle-foreground'}
                          ${isLoading ? 'opacity-50' : 'opacity-100'}
                        `}
                      >
                        {otp[index] || ""}
                      </div>
                    );
                  })}
                  <input
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={handleOtpChange}
                    disabled={isLoading}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-text disabled:cursor-not-allowed"
                    autoFocus
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-3.5 rounded-xl text-sm transition-colors"
                >
                  {isLoading ? "Verificando..." : "Verificar"}
                </button>
              </form>

              {message && (
                <div className="text-sm text-destructive mt-4">
                  {message}
                </div>
              )}

              <div className="mt-8 text-sm text-subtle-foreground">
                Não recebeu o email?{" "}
                <button
                  type="button"
                  onClick={resetToEmailStep}
                  disabled={isLoading}
                  className="text-foreground font-medium hover:underline transition-all disabled:opacity-50"
                >
                  Reenviar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}