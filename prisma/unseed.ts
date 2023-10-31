import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function unseed() {
    await prisma.$executeRaw`DROP TABLE "Block"`
    await prisma.$executeRaw`DROP TABLE "Room"`
    await prisma.$executeRaw`DROP TABLE "Feature"`
    await prisma.$executeRaw`DROP TABLE "CafeOrder"`
    await prisma.$executeRaw`DROP TABLE "Inventory"`
    await prisma.$executeRaw`DROP TABLE "User"`
    console.log("csc498-postgres-prod: All tables dropped")
}
unseed()