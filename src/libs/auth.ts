import { NextAuthOptions } from "next-auth";
// import { CredentialsProvider } from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "@/libs/db";

interface Credentials {
  username: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "kedevs" },
        password: { label: "Password", type: "password", placeholder: "****" },
      },
      async authorize(credentials: Credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }

        const userFound = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!userFound) return null;
        console.log(credentials.password, userFound?.password);
        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound?.password,
        );

        // if (!matchPassword) throw new Error("password doesn't match");
        if (!matchPassword) return null;
        return {
          id: userFound.id,
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
