import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { sqlite } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(event) {
  const session = await event.locals.auth();
  if (!session?.user?.id) return json({error:'Unauthorized'},{status:401});
  const user = await db.select().from(users).where(eq(users.id,session.user.id)).get();
  if (!user?.coupleId) return json({error:'No couple'},{status:400});
  const b = await event.request.json();
  const r = sqlite.prepare('INSERT INTO places(couple_id,name,review,rating,visited_at,created_at) VALUES(?,?,?,?,?,?)').run(user.coupleId,b.name,b.review||'',b.rating||5,b.visited_at,Date.now());
  return json({id:r.lastInsertRowid});
}