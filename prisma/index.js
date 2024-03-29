import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import process from "process";
import module from "module";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

const defaultJWT = "shhh";
const JWT = process.env.JWT || defaultJWT;

if (JWT === defaultJWT) {
  console.log("IF THIS IS DEPLOYED SET process.env.JWT");
}

const secretKey = process.env.JWT_SECRET_KEY;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//get all users
app.get("/api/users", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return res.status(404).send("Users not found.");
    }
    return res.send(users);
  } catch (error) {
    next(error);
  }
});

//get all meats
app.get("/api/meats", async (req, res, next) => {
  try {
    const meats = await prisma.meat.findMany();
    if (!meats) {
      return res.status(404).send("Meats not found.");
    }
    return res.send(meats);
  } catch (error) {
    next(error);
  }
});

// get all butchers/vendors
app.get("/api/butchers", async (req, res, next) => {
  try {
    const butchers = await prisma.butcher.findMany();
    if (!butchers) {
      return res.status(404).send("Butchers not found.");
    }
    return res.send(butchers);
  } catch (error) {
    next(error);
  }
});

//get a specific/unique user by id
app.get("/api/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const uniqueUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!uniqueUser) {
      return res.status(404).send("User not found.");
    }
    return res.send(uniqueUser);
  } catch (error) {
    next(error);
  }
});

//get a specific/unique meat by ID
app.get("/api/meats/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const uniqueMeat = await prisma.meat.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!uniqueMeat) {
      return res.status(404).send("Meat not found.");
    }
    return res.send(uniqueMeat);
  } catch (error) {
    next(error);
  }
});

// get a specific/unique butcher
app.get("/api/butchers/:id", async (req, res, next) => {
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
    next(error);
  }
});

//create a user
app.post("/api/users", async (req, res, next) => {
  try {
    console.log("Hello from try.");
    const { name, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ userId: newUser.id }, secretKey);

    res.status(201).json({ newUser: newUser, token: token });
  } catch (error) {
    next(error);
  }
});

// create a meat
app.post("/api/meats", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newMeat = await prisma.meat.create({
      data: {
        name,
        description,
      },
    });
    return res.status(201).json(newMeat);
  } catch (error) {
    next(error);
  }
});

// create a butcher
app.post("/api/butchers", async (req, res, next) => {
  try {
    const { name, street, city, state, zipcode, phonenumber } = req.body;
    const newButcher = await prisma.butcher.create({
      data: {
        name,
        street,
        city,
        state,
        zipcode,
        phonenumber,
      },
    });
    return res.status(201).json(newButcher);
  } catch (error) {
    next(error);
  }
});

//update a user
// still needs a way to update the password, we'll do this after authentication is ironed out
app.patch("/api/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const data = {};
    if (name) {
      data.name = name;
    }
    if (email) {
      data.email = email;
    }

    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: data,
    });
    return res.status(204).json(updateUser);
  } catch (error) {
    next(error);
  }
});

// update a meat
app.patch("/api/meats/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const data = {};
    if (name) {
      data.name = name;
    }
    if (description) {
      data.description = description;
    }

    const updateMeat = await prisma.meat.update({
      where: {
        id: parseInt(id),
      },
      data: data,
    });
    return res.status(204).json(updateMeat);
  } catch (error) {
    next(error);
  }
});

// update a butcher
app.patch("/api/butchers/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateFields = Object.keys(req.body);

    const data = {};

    updateFields.forEach((field) => {
      data[field] = req.body[field];
    });

    const updateButcher = await prisma.butcher.update({
      where: {
        id: parseInt(id),
      },
      data: data,
    });

    return res.status(204).json(updateButcher);
  } catch (error) {
    next(error);
  }
});

//delete a user
app.delete("/api/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteUser = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(202).json(deleteUser);
  } catch (error) {
    next(error);
  }
});

// delete a meat
app.delete("/api/meats/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteMeat = await prisma.meat.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(202).json(deleteMeat);
  } catch (error) {
    next(error);
  }
});

// delete a butcher
app.delete("/api/butchers/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteButcher = await prisma.butcher.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(202).json(deleteButcher);
  } catch (error) {
    next(error);
  }
});

// find user by token
// const findUserByToken = async (token, next) => {
//   let id;
//   try {
//     const payload = await jwt.verify(token, JWT);
//     id = payload.id;
//     console.log(payload);
//   } catch (error) {
//     next(error);
//   }
//   const user = await prisma.user.findUnique({
//     where: {
//       id: id,
//     },
//   });

//   const response = await prisma.query(user.id, [id]);

//   // INCOMPLETE HERE
// };

// authenticate user name and password
const authenticate = async ({ name, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });

  if (!user) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const token = jwt.sign({ id: user.id }, secretKey);
  console.log("Token is:", token);
  return { token: token };
};

const port = 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
  console.log("Curl commands to test application");
  console.log(
    `curl -X POST localhost:${port}/api/meats -d '{ "name": "NewMeat", "description": "NewYummy"}' -H "Content-Type:application/json"`
  );
  console.log(
    `curl -X PATCH localhost:${port}/api/meats/:id -d '{ "name": "NewerMeat", "description": "NewerYummy"}' -H "Content-Type:application/json"`
  );
  console.log(
    `curl -X DELETE localhost:${port}/api/meats/:id -H "Content-Type:application/json"`
  );
});

module.exports = {
  authenticate,
};
