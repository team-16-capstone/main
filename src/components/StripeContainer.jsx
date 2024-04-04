import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY =
  'pk_test_51Oz1Wh2Lvww0F3rvnvxUrJjPIcZ6BTiPjKgYXgnAxGrc0flSQcmfRj5BG7Zxrf7Jh5XmmRN6XOyzGmOruNyejjBR00ujdRh8DT';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer({ email }) {
  return (
    <Elements stripe={stripeTestPromise}>
      {/* Email is passed as a prop from StripePayment towards PaymentForm */}
      <PaymentForm email={email} />
    </Elements>
  );
}
