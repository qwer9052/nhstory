import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { anniversaries, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth();
  if (!session?.user?.id) return { anniversaries: [] };
  const user = await db.select().from(users).where(eq(users.id,session.user.id)).get();
  if (!user?.coupleId) return { anniversaries: [] };
  return { anniversaries: await db.select().from(anniversaries).where(eq(anniversaries.coupleId,user.coupleId)) };
};