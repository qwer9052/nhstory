import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { sqlite } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(event) {
  const session = await event.locals.auth();
  if (!session?.user?.id) return json({error:'Unauthorized'},{status:401});
  const user = await db.select().from(users).where(eq(users.id,session.user.id)).get();
  if (!user?.coupleId) return json({error:'No couple'},{status:400});
  sqlite.prepare('DELETE FROM budget WHERE id=? AND couple_id=?').run(Number(event.params.id), user.coupleId);
  return json({ok:true});
}