import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const uniqueMeatRouter = express.Router();

uniqueMeatRouter.get("/meats/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Requested meat ID:", id);

    const uniqueMeat = await prisma.meat.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!uniqueMeat) {
      console.log("Meat not found");
      return res.status(404).send("Meat not found");
    }

    console.log("Found meat:", uniqueMeat);
    res.send(uniqueMeat);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default uniqueMeatRouter;
