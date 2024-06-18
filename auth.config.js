import { NextAuthConfig } from 'next-auth';
import { userAgentFromString } from 'next/server';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isNotOnLogin = nextUrl.pathname !== '/login';
            if (!isLoggedIn && isNotOnLogin) {
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && !isNotOnLogin) {
                return true;
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
};