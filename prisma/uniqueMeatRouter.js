import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const uniqueMeatRouter = express.Router();

uniqueMeatRouter.get("/", async (req, res) => {
  const uniqueMeat = await prisma.meat.findUnique({
    where: {
      id: 22,
    },
  });
  res.send(uniqueMeat);
});

export default uniqueMeatRouter;
