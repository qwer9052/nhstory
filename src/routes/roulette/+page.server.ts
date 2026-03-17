import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { rouletteHistory, users } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth();
  if (!session?.user?.id) return { history: [] };
  const user = await db.select().from(users).where(eq(users.id,session.user.id)).get();
  if (!user?.coupleId) return { history: [] };
  return { history: await db.select().from(rouletteHistory).where(eq(rouletteHistory.coupleId,user.coupleId)).orderBy(desc(rouletteHistory.createdAt)).limit(20) };
};