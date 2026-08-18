import { db } from "@/db";
import { otpCodes, users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const OTP_EXPIRATION_MINUTES = 5;
const OTP_LENGTH = 6;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const SMTP_FROM = process.env.SMTP_FROM ?? process.env.SMTP_USER;

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(to: string, code: string): Promise<void> {
  await transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject: "Seu código de acesso twobanks",
    text: `Seu código de acesso é: ${code}`,
    html: `<p>Seu código de acesso é:</p><h2>${code}</h2><p>Válido por ${OTP_EXPIRATION_MINUTES} minutos.</p>`,
  });
}

export async function POST(req: Request) {
  try {
    const { identifier } = await req.json();

    if (!identifier) {
      return NextResponse.json({ error: "Informe seu email." }, { status: 400 });
    }

    const normalizedEmail = String(identifier).toLowerCase();

    const [user] = await db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(eq(users.email, normalizedEmail));

    // Resposta neutra: não revela se o email existe
    if (!user || !user.email) {
      return NextResponse.json({ success: true });
    }

    const code = generateOtp();
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000);

    await db.insert(otpCodes).values({
      userId: user.id,
      codeHash,
      expiresAt,
    });

    await sendOtpEmail(user.email, code);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao processar OTP:", error);
    return NextResponse.json({ error: "Falha ao enviar o código." }, { status: 500 });
  }
}