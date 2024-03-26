import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const meatsRouter = express.Router();

meatsRouter.get("/meats", async (req, res) => {
  const meats = await prisma.meat.findMany();
  res.send(meats);
});

export default meatsRouter;
