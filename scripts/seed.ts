import "dotenv/config";
import { getDb } from "@/lib/db";

async function main() {
  const sql = getDb();
  
  // Criar usuário demo
  const userResult = await sql`
    INSERT INTO users (email, name)
    VALUES (${`demo+${Date.now()}@example.com`}, 'Demo User')
    RETURNING id, email
  ` as Array<{ id: number; email: string }>;
  const user = userResult[0];
  
  console.log("✓ Usuário criado:", user.email);
  
  // Criar grupo
  const groupResult = await sql`
    INSERT INTO groups (name, description, privacy)
    VALUES ('Peladeiros da Quinta', 'Grupo de pelada semanal às quintas', 'private')
    RETURNING id, name
  ` as Array<{ id: number; name: string }>;
  const group = groupResult[0];
  
  console.log("✓ Grupo criado:", group.name);
  
  // Criar evento (próximo jogo amanhã às 19h)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(19, 0, 0, 0);
  
  await sql`
    INSERT INTO events (group_id, starts_at, max_players, status)
    VALUES (${group.id}, ${tomorrow.toISOString()}, 14, 'scheduled')
  `;
  
  console.log("✓ Evento criado para:", tomorrow.toLocaleString("pt-BR"));
  
  // Garantir que a tabela de comentários exista (útil para o exemplo-form)
  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      comment TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // Inserir alguns comentários de exemplo
  await sql`
    INSERT INTO comments (comment, created_at)
    VALUES
      ('Primeiro comentário de exemplo', NOW()),
      ('Outro comentário para testar a lista', NOW())
  `;
  console.log("✓ Tabela 'comments' criada (se inexistente) e comentários de exemplo inseridos.");
  console.log("\n🎉 Seed completo!");
  console.log(`\nAcesse /dashboard para ver o grupo e evento criados.`);
}

main().catch((e) => { 
  console.error("❌ Erro no seed:", e.message); 
  process.exit(1); 
});

