import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { sqlite } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth();
  if (!session?.user?.id) return { entries: [] };
  const user = await db.select().from(users).where(eq(users.id, session.user.id)).get();
  if (!user?.coupleId) return { entries: [] };
  const entries = sqlite.prepare('SELECT * FROM qa WHERE couple_id=? ORDER BY date DESC').all(user.coupleId);
  return { entries };
};