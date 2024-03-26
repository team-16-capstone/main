import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

//get all users
app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.send(users);
});

//get all meats
app.get("/api/meats", async (req, res) => {
  const meats = await prisma.meat.findMany();
  return res.send(meats);
});

//get a specific/unique meat by ID
app.get("/api/meats/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const uniqueMeat = await prisma.meat.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!uniqueMeat) {
      return res.status(404).send("Meat not found");
    }
    return res.send(uniqueMeat);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// get all butchers/vendors
app.get("/api/butchers", async (req, res) => {
  const butchers = await prisma.butcher.findMany();
  return res.send(butchers);
});

// get a specific/unique butcher
app.get("/api/butchers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const uniqueButcher = await prisma.butcher.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!uniqueButcher) {
      return res.status(404).send("Meat not found");
    }
    return res.send(uniqueButcher);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

//create a user
app.post("/users", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

//get a user by id
app.get("/users/:id", async (req, res, next) => {});

//update a user
app.patch("/users/:id", async (req, res, next) => {});

//delete a user
app.delete("/users/:id", async (req, res, next) => {});

app.listen(3001, () => console.log("this is working"));
