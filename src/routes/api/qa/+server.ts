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
  const existing = sqlite.prepare('SELECT * FROM qa WHERE couple_id=? AND question=? AND date=?').get(user.coupleId, b.question, b.date) as any;
  if(existing){
    sqlite.prepare('UPDATE qa SET answer2=? WHERE id=?').run(b.answer, existing.id);
    return json({ok:true});
  }
  sqlite.prepare('INSERT INTO qa(couple_id,question,answer1,date,created_at) VALUES(?,?,?,?,?)').run(user.coupleId,b.question,b.answer,b.date,Date.now());
  return json({ok:true});
}