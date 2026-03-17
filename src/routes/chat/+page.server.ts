import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { messages, users } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth();
  if (!session?.user?.id) return { messages: [], userId: '' };
  const user = await db.select().from(users).where(eq(users.id,session.user.id)).get();
  if (!user?.coupleId) return { messages: [], userId: session.user.id };
  const msgs = await db.select().from(messages).where(eq(messages.coupleId,user.coupleId)).orderBy(asc(messages.createdAt)).limit(100);
  return { messages: msgs, userId: session.user.id };
};