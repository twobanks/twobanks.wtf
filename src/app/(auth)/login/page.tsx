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
        setMessage("Enviamos um código para o email associado.");
      } else {
        setMessage(data.error || "Erro ao enviar código.");
      }
    } catch {
      setMessage("Erro ao enviar código.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setMessage("");

    const result = await signIn("credentials", {
      identifier: user.email,
      otp,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.ok) {
      window.location.href = "/";
    } else {
      setMessage("Código inválido ou expirado.");
    }
  };

  const resetToEmailStep = () => {
    setUser(null);
    setOtp("");
    setMessage("");
  };

  return (
    <div className="flex w-full items-center justify-center p-4 sm:p-6 lg:p-8 dark:bg-black">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-gray-800/80 p-8 shadow-2xl sm:p-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Bem-vindo de volta
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Digite seu email para receber o código de acesso
          </p>
        </div>

        {!user ? (
          <form onSubmit={handleSendCode} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Quem é você?
              </label>
              <input
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="seu@email.com"
                required
                autoFocus
                className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {message && (
              <div className="rounded-lg border border-gray-700 bg-gray-900 p-3 text-center text-sm text-gray-300">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Enviando..." : "Enviar código"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="flex flex-col items-center gap-3">
              <img
                src={user.avatar}
                alt={user.nome}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
              />
              <p className="text-sm text-gray-300">
                Digite o código enviado para {user.email}
              </p>
            </div>
            <div className="space-y-2">
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Código de 6 dígitos"
                inputMode="numeric"
                autoFocus
                required
                className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-center text-2xl tracking-widest text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {message && (
              <div className="rounded-lg border border-gray-700 bg-gray-900 p-3 text-center text-sm text-gray-300">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verificando..." : "Entrar"}
            </button>

            <button
              type="button"
              onClick={resetToEmailStep}
              className="w-full text-center text-sm text-gray-400 hover:text-gray-300"
            >
              Trocar email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}