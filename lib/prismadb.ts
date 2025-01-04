import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma Client
const prismadb =
  globalThis.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// Store Prisma Client in globalThis for reuse in development
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

// Export the Prisma Client instance
export default prismadb;