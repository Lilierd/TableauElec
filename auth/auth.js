import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import conn from '@/controller/db';

/**
 * 
 * @param {string} pseudo 
 */
async function getUser(userid) {
  const query = `SELECT * FROM utilisateurs WHERE id_utilisateur=$1`;
  const values = [
    userid,
  ];

  const user = await conn.query(query, values);

  return user.rows[0];
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        userid: { label: 'userid', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const parsedCredentials = z
            .object({ userid: z.string(), password: z.string().min(8) })
            .safeParse(credentials);

          if (parsedCredentials.success) {
            const { userid, password } = parsedCredentials.data;
            const user = await getUser(userid);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch) return user;
          }

          console.log("Mauvais identifiants");
          return null;
        } catch(e) {
          console.log("Erreur !!!" + e);
        }
      },
    }),
  ],
});