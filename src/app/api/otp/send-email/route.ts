import { db } from "@/db";
import { otpCodes, users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const OTP_EXPIRATION_MINUTES = 5;

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@twobanks.wtf";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(to: string, code: string): Promise<void> {
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Seu código de acesso twobanks",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #09090b; padding: 40px 0; color: #fafafa;">
        <div style="max-width: 440px; margin: 0 auto; background-color: #18181b; padding: 32px; border-radius: 16px; border: 1px solid #27272a; text-align: center;">
          
          <!-- Logotipo em Tipografia Centralizada (Substitui a imagem com perfeição) -->
          <div style="margin-bottom: 24px;">
            <span style="font-size: 26px; font-weight: 800; color: #fafafa; letter-spacing: -0.5px;">
              BANKS<span style="color: #F35894;">.</span>
            </span>
          </div>

          <p style="color: #a1a1aa; font-size: 14px; line-height: 20px; margin-bottom: 24px;">
            Você solicitou um código de acesso para entrar na sua conta. Utilize o código abaixo:
          </p>

          <!-- Caixa do Código com destaque em Azul Celeste -->
          <div style="margin: 24px 0; padding: 20px; background-color: #09090b; border: 1px solid #27272a; border-radius: 12px; text-align: center;">
            <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #5EACCF;">
              ${code}
            </span>
          </div>

          <p style="color: #71717a; font-size: 12px; line-height: 16px; margin-top: 24px; margin-bottom: 0;">
            Este código é válido por ${OTP_EXPIRATION_MINUTES} minutos. Se você não solicitou este acesso, ignore este e-mail com segurança.
          </p>
        </div>
      </div>
    `,
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
    console.error("Erro ao enviar email:", error);
    return NextResponse.json({ error: "Falha ao enviar o código." }, { status: 500 });
  }
}