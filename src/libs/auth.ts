import { NextAuthOptions } from "next-auth";
// import { Credentials } from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt-ts";
import prisma from "@/libs/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "kedevs" },
        password: { label: "Password", type: "password", placeholder: "****" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }

        const userFound = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!userFound) return null;
        const matchPassword = await compare(
          credentials.password,
          userFound.password,
        );

        if (!matchPassword) return null;
        return {
          id: userFound.id.toString(),
          name: userFound.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  debug: process.env.NODE_ENV === "development",
};
