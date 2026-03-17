import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { couples, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
export async function POST(event) {
  const session = await event.locals.auth();
  if (!session?.user?.id) return json({error:'Unauthorized'},{status:401});
  const body = await event.request.json();
  const coupleId = randomUUID();
  await db.insert(couples).values({id:coupleId,user1Id:session.user.id,startDate:body.startDate,createdAt:new Date()});
  await db.update(users).set({coupleId}).where(eq(users.id,session.user.id));
  return json({ok:true,coupleId});
}