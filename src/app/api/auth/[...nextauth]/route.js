// NextAuth route handler for App Router
import NextAuth from "next-auth";
import { authOptions } from "@/app/conf/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
