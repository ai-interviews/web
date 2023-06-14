import { Pathname } from "@app/lib/types/api";
import { User } from "@prisma/client";
import { type DefaultSession } from "next-auth";

declare global {
  namespace NodeJS {
    interface ProcessEnv {}
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   * Defaults to default prisma schema, needs to be updated on User table schema changes
   */
  export interface Session {
    user: User | null;
  }
}

declare module "daisyui/src/theming/themes" {
  const themes: any; // replace 'any' with actual type
  export default themes;
}

export {};
