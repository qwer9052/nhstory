import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { couples, anniversaries, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth();
  if (!session?.user?.id) return { couple: null, anniversaries: [] };
  const user = await db.select().from(users).where(eq(users.id, session.user.id)).get();
  if (!user?.coupleId) return { couple: null, anniversaries: [] };
  const couple = await db.select().from(couples).where(eq(couples.id, user.coupleId)).get();
  const anns = await db.select().from(anniversaries).where(eq(anniversaries.coupleId, user.coupleId));
  return { couple: couple || null, anniversaries: anns };
};