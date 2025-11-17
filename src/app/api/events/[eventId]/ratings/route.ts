import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-helpers";
import { sql } from "@/db/client";
import { playerRatingSchema } from "@/lib/validations";
import logger from "@/lib/logger";

type Params = Promise<{ eventId: string }>;

// GET /api/events/:eventId/ratings - Get all ratings for event
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { eventId } = await params;
    const user = await requireAuth();

    const [event] = await sql`
      SELECT group_id FROM events WHERE id = ${eventId}
    `;

    if (!event) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
    }

    // Check if user is member
    const [membership] = await sql`
      SELECT role FROM group_members
      WHERE group_id = ${event.group_id} AND user_id = ${user.id}
    `;

    if (!membership) {
      return NextResponse.json(
        { error: "Você não é membro deste grupo" },
        { status: 403 }
      );
    }

    // Get user's vote for this event (only one player can be voted)
    const [userVote] = await sql`
      SELECT rated_user_id as player_id
      FROM player_ratings
      WHERE event_id = ${eventId} AND rater_user_id = ${user.id}
      LIMIT 1
    `;

    return NextResponse.json({ vote: userVote || null });
  } catch (error) {
    if (error instanceof Error && error.message === "Não autenticado") {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    logger.error(error, "Error fetching ratings");
    return NextResponse.json(
      { error: "Erro ao buscar avaliações" },
      { status: 500 }
    );
  }
}

// POST /api/events/:eventId/ratings - Submit player ratings
export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { eventId } = await params;
    const user = await requireAuth();

    const body = await request.json();
    const validation = playerRatingSchema.safeParse({ ...body, eventId });

    if (!validation.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { ratedUserId } = validation.data;

    const [event] = await sql`
      SELECT group_id FROM events WHERE id = ${eventId}
    `;

    if (!event) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
    }

    // Check if user is member and attended
    const [attendance] = await sql`
      SELECT * FROM event_attendance
      WHERE event_id = ${eventId} AND user_id = ${user.id} AND status = 'yes'
    `;

    if (!attendance) {
      return NextResponse.json(
        { error: "Você precisa ter participado do evento para votar" },
        { status: 403 }
      );
    }

    // Can't vote for yourself
    if (ratedUserId === user.id) {
      return NextResponse.json(
        { error: "Você não pode votar em si mesmo" },
        { status: 400 }
      );
    }

    // Check if rated user attended the event
    const [ratedAttendance] = await sql`
      SELECT * FROM event_attendance
      WHERE event_id = ${eventId} AND user_id = ${ratedUserId} AND status = 'yes'
    `;

    if (!ratedAttendance) {
      return NextResponse.json(
        { error: "Você só pode votar em jogadores que participaram do evento" },
        { status: 400 }
      );
    }

    // First, delete any existing vote from this user for this event
    await sql`
      DELETE FROM player_ratings
      WHERE event_id = ${eventId} AND rater_user_id = ${user.id}
    `;

    // Insert new vote with MVP tag
    const [rating] = await sql`
      INSERT INTO player_ratings (
        event_id,
        rater_user_id,
        rated_user_id,
        score,
        tags
      )
      VALUES (
        ${eventId},
        ${user.id},
        ${ratedUserId},
        NULL,
        ARRAY['mvp']
      )
      RETURNING *
    `;

    logger.info(
      { eventId, raterUserId: user.id, ratedUserId },
      "Player voted as MVP"
    );

    return NextResponse.json({ rating });
  } catch (error) {
    if (error instanceof Error && error.message === "Não autenticado") {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    logger.error(error, "Error submitting rating");
    return NextResponse.json(
      { error: "Erro ao avaliar jogador" },
      { status: 500 }
    );
  }
}
