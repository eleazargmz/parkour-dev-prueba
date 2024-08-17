import { db } from "@/lib/db/index";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { env } from "@/lib/env.mjs";
import { use } from "react";
import { sendEmailVerification } from "./mail";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  } | null;
};

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(db) as Adapter,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      } else {
        console.error("Token.id is not defined");
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) throw new Error("Correo electrónico incorrecto");
        const comparingPassword = await bcrypt.compare(
          credentials?.password ?? "",
          user.password
        );
        if (!comparingPassword) throw new Error("Contraseña incorrecta");

        if(!user.emailVerified) {
          throw new Error("Por favor, verifica tu correo electrónico para completar la verificación")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
};

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } as AuthSession;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect("/api/auth/signin");
};

