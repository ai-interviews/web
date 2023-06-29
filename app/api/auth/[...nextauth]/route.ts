import prisma from "../../../_lib/server/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { Session, User } from "next-auth";
import EmailProvider from "next-auth/providers/email";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.SENDGRID_SMTP_HOST,
        port: process.env.SENDGRID_SMTP_PORT,
        auth: {
          user: process.env.SENDGRID_SMTP_USER,
          pass: process.env.SENDGRID_SMTP_KEY,
        },
      },
      from: process.env.SENDGRID_FROM_EMAIL,
      sendVerificationRequest: async ({ url }) => {
        console.log(`Verification link: ${url}`);

        // SENDGRID ACCOUNT IS DOWN TEMPORARILY
        // await provider.sendVerificationRequest({
        //   token,
        //   url,
        //   provider,
        //   expires: new Date(Date.now() + 15 * 60 * 1000),
        //   theme: {},
        //   identifier,
        // });
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }: { session: Session; user: User }) => {
      return {
        ...session,
        user,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
