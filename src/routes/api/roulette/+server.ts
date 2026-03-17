import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { rouletteHistory, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
export async function POST(event) {
  const session = await event.locals.auth();
  if (!session?.user?.id) return json({error:'Unauthorized'},{status:401});
  const user = await db.select().from(users).where(eq(users.id,session.user.id)).get();
  if (!user?.coupleId) return json({error:'No couple'},{status:400});
  const b = await event.request.json();
  const r = await db.insert(rouletteHistory).values({coupleId:user.coupleId,result:b.result,date:b.date,createdAt:new Date()}).returning();
  return json(r[0]);
}