import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { sqlite } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth();
  if (!session?.user?.id) return { places: [] };
  const user = await db.select().from(users).where(eq(users.id, session.user.id)).get();
  if (!user?.coupleId) return { places: [] };
  const places = sqlite.prepare('SELECT * FROM places WHERE couple_id=? ORDER BY visited_at DESC, id DESC').all(user.coupleId);
  return { places };
};