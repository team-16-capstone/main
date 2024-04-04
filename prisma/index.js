import { PrismaClient } from '@prisma/client';
import express from 'express';
import bcrypt from 'bcrypt';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import process from 'process';
import module from 'module';
//stripe related
import dotenv from 'dotenv';
import stripePackage from 'stripe';
import bodyParser from 'body-parser';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

const secretKey = process.env.JWT_SECRET_KEY;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(express.json());
app.use(morgan('dev'));

// Middleware to protect routes
// If protecting a route with this middleware, make sure the client side API call has:
// const token = window.localStorage.getItem('token'); (retrieves the token)
// Authorization: `Bearer ${token}` (within the header of the call)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('req.headers is', req.headers);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    req.userId = decoded.id;
    next();
  });
};

//////stripe related//////
dotenv.config();
const stripe = stripePackage(process.env.STRIPE_SECRET_TEST);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next(err);
});

// To remove a harmless error, I added next(err) to the above chunk of code. IF there is an issue when sending another
// response in a subsequent middleware, remove the line "next(err)"

////////////STRIPE CODE///////////////
app.post('/api/payment', async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Pocket Butcher',
      payment_method: id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });
    console.log('Payment', payment);
    res.json({
      message: 'Payment successful',
      success: true,
    });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({
      message: 'Payment failed',
      success: false,
    });
  }
});

////////////PRISMA CODE///////////////
//get all users
app.get('/api/users', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return res.status(404).send('Users not found.');
    }
    return res.send(users);
  } catch (error) {
    next(error);
  }
});

//get all meats
app.get('/api/meats', async (req, res, next) => {
  try {
    const meats = await prisma.meat.findMany();
    if (!meats) {
      return res.status(404).send('Meats not found.');
    }
    return res.send(meats);
  } catch (error) {
    next(error);
  }
});

// get all butchers/vendors
app.get('/api/butchers', async (req, res, next) => {
  try {
    const butchers = await prisma.butcher.findMany();
    if (!butchers) {
      return res.status(404).send('Butchers not found.');
    }
    return res.send(butchers);
  } catch (error) {
    next(error);
  }
});

//get a specific/unique user by id
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const uniqueUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!uniqueUser) {
      return res.status(404).send('User not found.');
    }
    return res.send(uniqueUser);
  } catch (error) {
    next(error);
  }
});

//get a specific/unique meat by ID
app.get('/api/meats/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const uniqueMeat = await prisma.meat.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!uniqueMeat) {
      return res.status(404).send('Meat not found.');
    }
    return res.send(uniqueMeat);
  } catch (error) {
    next(error);
  }
});

// get a specific/unique butcher
app.get('/api/butchers/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const uniqueButcher = await prisma.butcher.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!uniqueButcher) {
      return res.status(404).send('Meat not found');
    }
    return res.send(uniqueButcher);
  } catch (error) {
    next(error);
  }
});

// get all experiences
app.get('/api/experiences', async (req, res, next) => {
  try {
    const experiences = await prisma.experience.findMany();
    if (!experiences) {
      return res.status(404).send('experiences not found.');
    }
    return res.send(experiences);
  } catch (error) {
    next(error);
  }
});

//get a specific/unique experiences id
app.get('/api/experiences/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const uniqueExperience = await prisma.experience.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!uniqueExperience) {
      return res.status(404).send('experiences not found.');
    }
    return res.send(uniqueExperience);
  } catch (error) {
    next(error);
  }
});

//create a user
app.post('/api/users', async (req, res, next) => {
  try {
    const { name, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ newUser: newUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// create a meat
app.post('/api/meats', authenticateToken, async (req, res, next) => {
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
app.post('/api/butchers', authenticateToken, async (req, res, next) => {
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

//create an experience
app.post('/api/new-experience', authenticateToken, async (req, res) => {
  try {
    const { butcher, meats, price, review } = req.body;
    const newExperience = await prisma.experience.create({
      data: {
        butcher,
        meats: { set: meats },
        price: price,
        review: review,
      },
    });

    return res
      .status(201)
      .json({ message: 'Form submitted successfully', data: newExperience });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//update a user
// WHEN CALLING THIS ROUTE, I added a passwordConfirmation on the request body.
// This should be an additional value in the form, where the user has to input their password again
// If they don't match, the call to this route will fail. :)
app.patch('/api/users/:id', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password, passwordConfirmation } = req.body;

    if (password !== passwordConfirmation) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const data = {};
    if (name) {
      data.name = name;
    }
    if (email) {
      data.email = email;
    }
    if (password) {
      data.password = password;
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

// update user stripe status
app.patch('/api/users/stripe/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    const updateUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        stripeUser: true,
      },
    });
    const responseData = {
      message: 'User stripe status updated successfully',
      updatedUser: updateUser,
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.log('hi');
    next(error);
  }
});

// get a user for stripe status
app.get('/api/users/stripe/get/:email', async (req, res, next) => {
  try {
    const { email } = req.params;

    const uniqueUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!uniqueUser) {
      return res.status(404).send('User not found.');
    }
    return res.send(uniqueUser);
  } catch (error) {
    next(error);
  }
});

// update a meat
app.patch('/api/meats/:id', authenticateToken, async (req, res, next) => {
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
app.patch('/api/butchers/:id', authenticateToken, async (req, res, next) => {
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
app.delete('/api/users/:id', authenticateToken, async (req, res, next) => {
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
app.delete('/api/meats/:id', authenticateToken, async (req, res, next) => {
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
app.delete('/api/butchers/:id', authenticateToken, async (req, res, next) => {
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

// delete an experience
app.delete('/api/experiences/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const deleteExperience = await prisma.experience.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(202).json(deleteExperience);
  } catch (error) {
    next(error);
  }
});

// find user by token
const findUserByToken = async (token, next) => {
  let id;
  try {
    const payload = await jwt.verify(token, secretKey);
    id = payload.id;
    console.log(payload);
  } catch (error) {
    next(error);
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('Error finding user by token:', error);
    throw error;
  }
};
// authenticate user email and password
const authenticate = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    const error = new Error('Invalid user');
    error.status = 401;
    throw error;
  }

  if (!user.stripeUser) {
    const error = new Error('You have not completed your Stripe payment');
    error.status = 401;
    throw error;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    const error = new Error('Invalid password');
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ id: user.id }, secretKey);
  return { token: token };
};

// login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'Email and password cannot be blank' });
  }
  try {
    const { token } = await authenticate({ email, password });
    res.json({ token });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Verifies if token is correct
app.post('/api/verifyToken', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Forbidden: Invalid token' });
    }
    res.json({ message: 'Token is valid', userId: decoded.userId });
  });
});

const port = 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
  console.log('Curl commands to test application');
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
  findUserByToken,
};
