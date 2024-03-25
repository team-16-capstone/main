import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

require("dotenv").config();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
