import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { anniversaries, users } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
export async function DELETE(event) {
  const session = await event.locals.auth();
  if (!session?.user?.id) return json({error:'Unauthorized'},{status:401});
  const user = await db.select().from(users).where(eq(users.id,session.user.id)).get();
  if (!user?.coupleId) return json({error:'No couple'},{status:400});
  await db.delete(anniversaries).where(and(eq(anniversaries.id,Number(event.params.id)),eq(anniversaries.coupleId,user.coupleId)));
  return json({ok:true});
}