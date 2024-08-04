import { db } from "@/lib/db/index";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { env } from "@/lib/env.mjs";

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
  // callbacks: {
  //   session: ({ session, user }) => {
  //     console.log("------------User in session callback:-----------------------", user);
  //     session.user.id = user.id;
  //     return session;
  //   },
  // },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log("-------credentials----------", credentials);

        const user = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) throw new Error("Correo electrónico incorrecto");

        const comparingPassword = await bcrypt.compare(
          credentials?.password,
          user.password
        );

        if (!comparingPassword) throw new Error("Contraseña incorrecta");
       
        // console.log("-------user----------",  user);
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

