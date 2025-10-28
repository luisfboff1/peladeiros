import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/db/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import logger from "@/lib/logger";

const signupSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const validatedData = signupSchema.parse(body);
    const { name, email, password } = validatedData;

    // Verificar se o email já existe
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email.toLowerCase()}
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
      );
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, 10);

    console.log('🔍 [SIGNUP DEBUG] Email:', email.toLowerCase());
    console.log('🔍 [SIGNUP DEBUG] Senha original:', password);
    console.log('🔍 [SIGNUP DEBUG] Hash gerado:', passwordHash);
    console.log('🔍 [SIGNUP DEBUG] Tamanho do hash:', passwordHash.length);

    // Criar usuário
    const newUser = await sql`
      INSERT INTO users (name, email, password_hash)
      VALUES (
        ${name},
        ${email.toLowerCase()},
        ${passwordHash}
      )
      RETURNING id, name, email
    `;

    console.log('✅ [SIGNUP DEBUG] Usuário criado com ID:', newUser[0].id);

    logger.info({ userId: newUser[0].id, email: newUser[0].email }, "Novo usuário criado");

    return NextResponse.json(
      {
        success: true,
        user: {
          id: newUser[0].id,
          name: newUser[0].name,
          email: newUser[0].email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    logger.error({ error }, "Erro ao criar usuário");
    return NextResponse.json(
      { error: "Erro ao criar conta. Tente novamente." },
      { status: 500 }
    );
  }
}
