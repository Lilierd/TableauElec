import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
/**
 * Empeche l'affichage de tout contenu avant verification de l'authentification
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};