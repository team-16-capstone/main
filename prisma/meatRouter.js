import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const meatRouter = express.Router();

meatRouter.get("/", async (req, res) => {
  const meats = await prisma.meat.findMany();
  res.send(meats);
});

export default meatRouter;
