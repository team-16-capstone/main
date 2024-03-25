import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const butchersRouter = express.Router();

butchersRouter.get("/", async (req, res) => {
  const butchers = await prisma.butcher.findMany();
  res.send(butchers);
});

export default butchersRouter;
