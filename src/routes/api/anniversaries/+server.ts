import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { anniversaries, users } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
export async function GET(event) {
  const session = await event.locals.auth();
  if (!session?.user?.id) return json([]);
  const user = await db.select().from(users).where(eq(users.id,session.user.id)).get();
  if (!user?.coupleId) return json([]);
  return json(await db.select().from(anniversaries).where(eq(anniversaries.coupleId,user.coupleId)));
}
export async function POST(event) {
  const session = await event.locals.auth();
  if (!session?.user?.id) return json({error:'Unauthorized'},{status:401});
  const user = await db.select().from(users).where(eq(users.id,session.user.id)).get();
  if (!user?.coupleId) return json({error:'No couple'},{status:400});
  const b = await event.request.json();
  const r = await db.insert(anniversaries).values({coupleId:user.coupleId,title:b.title,startDate:b.startDate,endDate:b.endDate||null,repeatType:b.repeatType||null,memo:b.memo||null,createdAt:new Date()}).returning();
  return json(r[0]);
}