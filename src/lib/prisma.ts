import { PrismaClient } from "@prisma/client";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ override: true });
}

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
  prismaDatabaseUrl?: string;
} & typeof global;

const databaseUrl = process.env.DATABASE_URL;

const prisma =
  globalThis.prismaGlobal && globalThis.prismaDatabaseUrl === databaseUrl
    ? globalThis.prismaGlobal
    : prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
  globalThis.prismaDatabaseUrl = databaseUrl;
}
