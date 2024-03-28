import express from 'express';
import dotenv from 'dotenv';
import stripePackage from 'stripe';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
dotenv.config();
const stripe = stripePackage(process.env.STRIPE_SECRET_TEST);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.post('/payment', async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Pocket Butcher',
      payment_method: id,
      confirm: true,
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
