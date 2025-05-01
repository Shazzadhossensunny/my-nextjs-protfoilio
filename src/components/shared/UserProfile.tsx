"use server";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export async function getUserProfile() {
  const session = await getServerSession(authOptions);
  return {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
  };
}
