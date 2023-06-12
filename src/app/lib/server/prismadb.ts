import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

const disconnect = async () => {
  if (client) {
    await client.$disconnect();
  }
};

process.on("beforeExit", () => {
  disconnect();
});

export default client;
