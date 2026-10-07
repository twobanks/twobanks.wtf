"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

const usuarios = [
  {
    email: "twobanks@me.com",
    nome: "Thiago",
    avatar: "https://avatars.githubusercontent.com/u/2577611?v=4",
  },
  {
    email: "stephanie.thiagoo@hotmail.com",
    nome: "Tefa",
    avatar: "https://snipboard.io/wTqQ0S.jpg",
  },
];

const userByEmail = (email: string) =>
  usuarios.find((user) => user.email.toLowerCase() === email.toLowerCase());

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [user, setUser] = useState<typeof usuarios[0] | null>(null);
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
        setUser(userByEmail(email) ?? null);
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
    if (!user || isLoading) return;

    setIsLoading(true);
    setMessage("");

    const result = await signIn("credentials", {
      identifier: user.email,
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
    setUser(null);
    setOtp("");
    setMessage("");
  };

  return (
    <div className="flex flex-1 h-full min-h-[calc(100vh-5rem)] w-full bg-[#0a0a0a] overflow-hidden">
      
      {/* Coluna Esquerda - Decorativa */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 border-r border-gray-800 relative overflow-hidden">
        {/* Fundo de grade geométrica */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
          <div className="w-[200%] h-[1px] bg-white absolute rotate-0" />
          <div className="w-[200%] h-[1px] bg-white absolute rotate-90" />
          <div className="w-[200%] h-[1px] bg-white absolute rotate-45" />
          <div className="w-[200%] h-[1px] bg-white absolute -rotate-45" />
        </div>

        {/* Logo Central */}
        <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img 
            src="/twobanks.webp" 
            alt="Twobanks Logo" 
            className="w-40 h-40 object-contain opacity-90"
          />
        </div>
      </div>

      {/* Coluna Direita - Formulário Empilhado (Card Style) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative overflow-y-auto">
        
        {/* Card Container */}
        <div className="w-full max-w-[420px] bg-[#141414] border border-gray-800/60 rounded-[24px] p-8 sm:p-10 shadow-2xl flex flex-col items-center">
          
          {!user ? (
            <div className="flex flex-col items-center text-center w-full">
              {/* Ícone de Email Genérico */}
              <div className="w-12 h-12 mb-6 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                  <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                </svg>
              </div>
              
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
                Acesse sua conta
              </h2>
              <p className="text-sm text-gray-400 mb-8">
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
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm text-center"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1b73e8] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-xl text-sm transition-colors"
                >
                  {isLoading ? "Enviando..." : "Continuar"}
                </button>
              </form>

              {message && (
                <div className="text-sm text-red-400 mt-6">
                  {message}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center w-full">
              <img
                src={user.avatar}
                alt={user.nome}
                className="w-12 h-12 mb-6 rounded-full object-cover border border-gray-700 shadow-sm"
              />
              
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
                Por favor, verifique seu email
              </h2>
              <p className="text-sm text-gray-400 mb-8">
                Enviamos um código para <span className="font-medium text-white">{user.email}</span>
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
                          ${isActive && !isLoading ? 'border-2 border-blue-500 bg-[#1a1a1a]' : 'border border-gray-700 bg-transparent'}
                          ${isFilled ? 'text-white' : 'text-gray-500'}
                          ${isLoading ? 'opacity-50' : 'opacity-100'}
                        `}
                      >
                        {otp[index] || ""}
                      </div>
                    );
                  })}
                  {/* Substituído o onChange antigo pela nova função */}
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
                  className="w-full bg-[#1b73e8] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-xl text-sm transition-colors"
                >
                  {isLoading ? "Verificando..." : "Verificar"}
                </button>
              </form>

              {message && (
                <div className="text-sm text-red-400 mt-4">
                  {message}
                </div>
              )}

              <div className="mt-8 text-sm text-gray-400">
                Não recebeu o email?{" "}
                <button
                  type="button"
                  onClick={resetToEmailStep}
                  disabled={isLoading}
                  className="text-white font-medium hover:underline transition-all disabled:opacity-50"
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