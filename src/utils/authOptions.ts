import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/", // Redirect sign-in to home page
    signOut: "/", // Redirect sign-out to home page
    error: "/", // Redirect errors to home page
    verifyRequest: "/", // Redirect verify requests to home page
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Force redirects back to the base URL instead of to /login
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
