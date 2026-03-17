import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { messages, users } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
export async function GET(event) {
  const session = await event.locals.auth();
  if (!session?.user?.id) return json([]);
  const user = await db.select().from(users).where(eq(users.id,session.user.id)).get();
  if (!user?.coupleId) return json([]);
  return json(await db.select().from(messages).where(eq(messages.coupleId,user.coupleId)).orderBy(asc(messages.createdAt)).limit(100));
}
export async function POST(event) {
  const session = await event.locals.auth();
  if (!session?.user?.id) return json({error:'Unauthorized'},{status:401});
  const user = await db.select().from(users).where(eq(users.id,session.user.id)).get();
  if (!user?.coupleId) return json({error:'No couple'},{status:400});
  const b = await event.request.json();
  const r = await db.insert(messages).values({coupleId:user.coupleId,senderId:session.user.id,content:b.content,createdAt:new Date()}).returning();
  return json(r[0]);
}