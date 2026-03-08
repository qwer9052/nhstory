import { handle as authHandle, signIn } from './auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// Keycloak 사용자를 DB에 동기화
const syncUser: Handle = async ({ event, resolve }) => {
  const session = await event.locals.auth();
  
  if (session?.user?.email && session.user.id) {
    // DB에 사용자가 있는지 확인
    const existingUser = await db.select().from(users).where(eq(users.id, session.user.id));
    
    if (existingUser.length === 0) {
      // 새 사용자 생성
      await db.insert(users).values({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name || null
      });
    }
  }
  
  return resolve(event);
};

const protectedRoutes: Handle = async ({ event, resolve }) => {
  const session = await event.locals.auth();
  
  // Error page - no auth required
  if (event.url.pathname.startsWith('/error')) {
    return resolve(event);
  }
  
  // Auth callback path allowed
  if (event.url.pathname.startsWith('/auth')) {
    return resolve(event);
  }
  
  // API routes - let them handle their own auth
  if (event.url.pathname.startsWith('/api')) {
    return resolve(event);
  }
  
  // Redirect to Keycloak if not authenticated
  if (!session) {
    throw redirect(303, '/auth/signin?provider=keycloak');
  }
  
  return resolve(event);
};

export const handle = sequence(authHandle, syncUser, protectedRoutes);