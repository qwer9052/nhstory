import { handle as authHandle, signIn } from './auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

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
  
  // Redirect to Keycloak if not authenticated
  if (!session) {
    throw redirect(303, '/auth/signin?provider=keycloak');
  }
  
  return resolve(event);
};

export const handle = sequence(authHandle, protectedRoutes);