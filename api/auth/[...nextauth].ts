import { authOptions } from "@/libs/authOptions";
import NextAuth from "next-auth/next";

export default NextAuth(authOptions);