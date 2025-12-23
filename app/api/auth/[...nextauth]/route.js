import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import connectDB from "@/lib/mongoose";
import User from "@/models/User";

export const authOptions = {
  providers: [
    // 🔐 Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // 🔐 Email & Password (Optional)
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Invalid password");

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      // If Google Login
      if (account.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUser = await User.findOne({ email: user.email });
        token.role = dbUser?.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
