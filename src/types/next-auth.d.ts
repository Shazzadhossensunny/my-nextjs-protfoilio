import NextAuth from "next-auth";

// Extend the built-in NextAuth types to include our custom properties
declare module "next-auth" {
  /**
   * Extend the User type with any additional properties you've added
   */
  interface User {
    isAdmin?: boolean;
    // Add any other custom properties you're storing for users
  }

  /**
   * Extend the Session type to include our custom properties
   */
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean;
      // Add any other custom user properties you're storing in the session
    };
  }
}

// If using JWT strategy, extend the JWT type too
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin?: boolean;
    // Add any other custom properties you're storing in the JWT
  }
}
