import { NextResponse } from "next/server";
import { sql } from "@/db/client";
import logger from "@/lib/logger";

/**
 * API endpoint to run database migrations
 * This adds missing columns to ensure the database schema is up to date
 * 
 * Security: Can be called without auth during initial setup when password_hash column is missing.
 * After migration, consider adding authentication or removing this endpoint.
 */
export async function POST() {
  try {
    logger.info("Iniciando migração do banco de dados");

    // Add password_hash column if it doesn't exist
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT
    `;
    
    logger.info("Migração concluída: coluna password_hash adicionada/verificada");

    // Verify the column exists
    const columns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `;

    return NextResponse.json({
      success: true,
      message: "Migração executada com sucesso",
      columns: columns.map(col => ({
        name: col.column_name,
        type: col.data_type,
        nullable: col.is_nullable === 'YES'
      }))
    });
  } catch (error) {
    logger.error({ error }, "Erro ao executar migração");
    return NextResponse.json(
      { 
        error: "Erro ao executar migração",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check database schema
 */
export async function GET() {
  try {
    // Check if users table exists
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      )
    `;

    if (!tableExists[0].exists) {
      return NextResponse.json({
        status: "error",
        message: "Tabela 'users' não existe",
        needsMigration: true
      });
    }

    // Get all columns from users table
    const columns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `;

    const columnNames = columns.map(col => col.column_name);
    const hasPasswordHash = columnNames.includes('password_hash');

    return NextResponse.json({
      status: hasPasswordHash ? "ok" : "missing_columns",
      message: hasPasswordHash 
        ? "Esquema do banco de dados está atualizado" 
        : "Coluna 'password_hash' está faltando",
      needsMigration: !hasPasswordHash,
      columns: columns.map(col => ({
        name: col.column_name,
        type: col.data_type,
        nullable: col.is_nullable === 'YES'
      }))
    });
  } catch (error) {
    logger.error({ error }, "Erro ao verificar esquema do banco");
    return NextResponse.json(
      { 
        error: "Erro ao verificar esquema do banco de dados",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
