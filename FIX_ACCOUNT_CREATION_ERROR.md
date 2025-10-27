# Guia Rápido: Corrigir Erro de Criação de Conta

## Problema
Ao tentar criar uma conta, você recebe o erro:
```json
{"error":"Erro ao criar conta. Tente novamente."}
```

E nos logs do servidor:
```json
{
  "level":50,
  "error":{
    "name":"NeonDbError",
    "severity":"ERROR",
    "code":"42703"
  },
  "msg":"Erro ao criar usuário"
}
```

## Causa
O erro PostgreSQL **42703** significa "undefined_column" (coluna indefinida). Isso ocorre porque a tabela `users` no seu banco de dados Neon **não tem a coluna `password_hash`** necessária para o sistema de autenticação.

## Solução

Você tem **3 opções** para resolver:

### Opção 1: API de Migração (Mais Fácil) ⭐ Recomendado

1. Faça deploy da aplicação ou rode localmente
2. Acesse via navegador ou curl:
   ```bash
   # Para verificar o status do banco de dados
   curl http://localhost:3000/api/db/migrate
   
   # Para executar a migração
   curl -X POST http://localhost:3000/api/db/migrate
   ```

3. Você verá uma resposta como:
   ```json
   {
     "success": true,
     "message": "Migração executada com sucesso",
     "columns": [
       {"name": "id", "type": "uuid", "nullable": false},
       {"name": "name", "type": "character varying", "nullable": false},
       {"name": "email", "type": "character varying", "nullable": false},
       {"name": "password_hash", "type": "text", "nullable": true},
       ...
     ]
   }
   ```

**⚠️ IMPORTANTE - Segurança:** 
- Este endpoint não requer autenticação porque é usado para corrigir o banco quando a autenticação está quebrada
- A operação é segura (apenas adiciona coluna se não existir, não remove dados)
- Após executar a migração, considere:
  - Remover o endpoint `/api/db/migrate` deletando o arquivo `src/app/api/db/migrate/route.ts`
  - Ou adicionar autenticação ao endpoint
  - Ou configurar regras de firewall no Vercel para bloquear acesso público

### Opção 2: Neon Console (SQL Editor)

1. Acesse [Neon Console](https://console.neon.tech/)
2. Selecione seu projeto
3. Vá para **SQL Editor**
4. Execute este comando:
   ```sql
   ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;
   ```
5. Clique em **Run**
6. Verifique se funcionou:
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'users';
   ```

### Opção 3: Via Terminal (CLI)

Se você tem o `psql` instalado:

```bash
# Conectar ao banco
psql $DATABASE_URL

# Executar migração
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;

# Verificar
\d users

# Sair
\q
```

## Verificação

Após executar qualquer uma das opções acima:

1. Tente criar uma conta novamente em `/auth/signup`
2. O erro não deve mais ocorrer
3. Você deve ser redirecionado para a página de login

## Por que isso aconteceu?

O projeto migrou recentemente de **Stack Auth** para **NextAuth v5**. Isso exigiu adicionar a coluna `password_hash` na tabela `users` para armazenar as senhas criptografadas.

Se o seu banco de dados foi criado antes dessa migração, ele não tem essa coluna.

## Precisa de Ajuda?

- **Verifique o status**: `GET /api/db/migrate`
- **Execute a migração**: `POST /api/db/migrate`
- **Veja os logs**: Verifique os logs do Vercel ou console local
- **Documentação completa**: Veja [DATABASE_MIGRATION.md](./DATABASE_MIGRATION.md)

## Schema Correto

Após a migração, a tabela `users` deve ter estas colunas:

```sql
users (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            VARCHAR(255) NOT NULL,
  email           VARCHAR(255) UNIQUE NOT NULL,
  email_verified  TIMESTAMP,
  password_hash   TEXT,              -- ← Esta é a coluna que estava faltando
  image           TEXT,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
)
```
