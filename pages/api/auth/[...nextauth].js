import Users from '@/model/User';
import db from '@/utils/db';
import NextAuth from 'next-auth/next';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token.id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token.id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(x) {
        await db.connect();
        const user = await Users.findOne({ email: x.email });
        await db.disconnect();
        if (user && bcrypt.compareSync(x.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: 'dafa',
            isAdmin: user.isAdmin,
          };
        }
        throw new Error('Invalid email or password');
      },
    }),
  ],
});
