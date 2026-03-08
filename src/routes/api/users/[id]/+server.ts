import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/users/:id - 특정 사용자 조회
export const GET: RequestHandler = async ({ params }) => {
  const user = await db.select().from(users).where(eq(users.id, params.id));
  
  if (user.length === 0) {
    throw error(404, 'User not found');
  }
  
  return json(user[0]);
};

// PUT /api/users/:id - 사용자 수정
export const PUT: RequestHandler = async ({ params, request }) => {
  const body = await request.json();
  
  const updated = await db.update(users)
    .set({
      name: body.name,
      updatedAt: new Date()
    })
    .where(eq(users.id, params.id))
    .returning();
  
  if (updated.length === 0) {
    throw error(404, 'User not found');
  }
  
  return json(updated[0]);
};

// DELETE /api/users/:id - 사용자 삭제
export const DELETE: RequestHandler = async ({ params }) => {
  const deleted = await db.delete(users)
    .where(eq(users.id, params.id))
    .returning();
  
  if (deleted.length === 0) {
    throw error(404, 'User not found');
  }
  
  return json({ success: true });
};