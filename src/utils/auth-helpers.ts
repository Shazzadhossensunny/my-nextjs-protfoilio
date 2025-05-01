import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";
import { redirect } from "next/navigation";

// Use this helper in server components to check if user is authenticated
export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return session;
}

// Use this helper to check if user is an admin
export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  // Check if user has admin flag
  if (!session.user?.isAdmin) {
    // Redirect non-admin users
    redirect("/");
  }

  return session;
}

// Use this helper on client-side to check if user is admin
export function isAdminUser(session: any) {
  return session?.user?.isAdmin === true;
}
