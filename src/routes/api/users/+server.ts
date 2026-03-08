import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/users - 모든 사용자 조회
export const GET: RequestHandler = async () => {
  const allUsers = await db.select().from(users);
  return json(allUsers);
};

// POST /api/users - 사용자 생성
export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  
  const newUser = await db.insert(users).values({
    id: body.id,
    email: body.email,
    name: body.name
  }).returning();
  
  return json(newUser[0], { status: 201 });
};