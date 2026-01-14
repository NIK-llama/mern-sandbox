import prisma from "./db";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "email",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "nik@nik.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
            throw new Error("Missing credentials");
        }
        
        const user = await prisma.user.findUnique({
            where: {username: credentials.username},
        })

        if (!user) return null;

        if (credentials.password !== user.password) return null;
        
        return {
            id: user.id.toString(),
            name: user.username,
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
