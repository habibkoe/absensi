import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    roleId: string;
  }
  interface Session {
    user: User & {
      username: string;
      roleId: string;
    };
    token: {
      username: string;
      roleId: string;
    };
  }
}
