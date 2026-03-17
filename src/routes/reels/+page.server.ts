import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { reels, users } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth();
  if (!session?.user?.id) return { reels: [] };
  const user = await db.select().from(users).where(eq(users.id,session.user.id)).get();
  if (!user?.coupleId) return { reels: [] };
  return { reels: await db.select().from(reels).where(eq(reels.coupleId,user.coupleId)).orderBy(desc(reels.createdAt)) };
};