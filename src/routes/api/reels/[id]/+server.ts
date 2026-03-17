import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { reels, users } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
export async function DELETE(event) {
  const session = await event.locals.auth();
  if (!session?.user?.id) return json({error:'Unauthorized'},{status:401});
  const user = await db.select().from(users).where(eq(users.id,session.user.id)).get();
  if (!user?.coupleId) return json({error:'No couple'},{status:400});
  await db.delete(reels).where(and(eq(reels.id,Number(event.params.id)),eq(reels.coupleId,user.coupleId)));
  return json({ok:true});
}