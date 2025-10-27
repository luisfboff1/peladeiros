import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { sql } from "@/db/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Validar configuração do AUTH_SECRET
if (!process.env.AUTH_SECRET && !process.env.NEXTAUTH_SECRET) {
  console.error(`
╔═══════════════════════════════════════════════════════════════════╗
║                     ⚠️  ERRO DE CONFIGURAÇÃO ⚠️                    ║
╟───────────────────────────────────────────────────────────────────╢
║  AUTH_SECRET não está configurado!                                ║
║                                                                    ║
║  A autenticação não funcionará sem esta variável de ambiente.     ║
║                                                                    ║
║  Para corrigir:                                                    ║
║  1. Gere um secret: openssl rand -base64 32                       ║
║  2. Adicione ao .env.local:                                       ║
║     AUTH_SECRET="valor_gerado"                                    ║
║  3. No Vercel, adicione em: Project Settings > Environment Vars   ║
║                                                                    ║
║  Documentação: /NEON_AUTH_GUIDE.md                                ║
╚═══════════════════════════════════════════════════════════════════╝
  `);
  
  // Em produção, isso é crítico
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "AUTH_SECRET não está configurado. A aplicação não pode iniciar sem esta variável de ambiente."
    );
  }
  
  console.warn("⚠️  Usando modo de desenvolvimento sem AUTH_SECRET - NÃO USE EM PRODUÇÃO!");
}

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().trim().min(6),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validar credenciais
          const { email, password } = credentialsSchema.parse(credentials);

          // Buscar usuário no banco
          const result = await sql`
            SELECT id, name, email, password_hash, image, email_verified
            FROM users
            WHERE email = ${email}
          `;

          if (result.length === 0) {
            return null;
          }

          const user = result[0];

          // Verificar senha
          if (!user.password_hash) {
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            password,
            user.password_hash
          );

          if (!isValidPassword) {
            return null;
          }

          // Retornar dados do usuário (sem senha)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
});
