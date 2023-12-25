import db from '@/utils/db';
import NextAuth from 'next-auth/next';
import { compare } from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/model/User';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({
          email: credentials.email,
        });
        if (!user) {
          throw new Error('User is not found');
        }

        //check password
        const checkPassword = await compare(
          credentials.password,
          user.password
        );
        if (!checkPassword) {
          throw new Error('Password is incorrect');
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
});
