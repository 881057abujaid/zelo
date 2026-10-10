import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
    adapter,
});

export async function disconnectDatabase(): Promise<void> {
    await prisma.$disconnect();
    await pool.end();
}