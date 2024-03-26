import { PrismaClient } from '@prisma/client';
import express from 'express';
import meatsRouter from './meatRouter.js';
import butchersRouter from './butchersRouter.js';
import userRouter from './userRouter.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

//get all users/meats/butchers
app.use('/api', userRouter);
app.use('/api', meatsRouter);
app.use('/api', butchersRouter);

//create a user
app.post('/users', async (req, res, next) => {
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
app.get('/users/:id', async (req, res, next) => {});

//update a user
app.patch('/users/:id', async (req, res, next) => {});

//delete a user
app.delete('/users/:id', async (req, res, next) => {});

app.listen(3001, () => console.log('this is working'));
