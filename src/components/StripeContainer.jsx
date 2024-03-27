import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY =
  'pk_live_51Oz1Wh2Lvww0F3rvis7wIVTCdrpM8cwz7tqzHUgUrwOmx0fD8yKqDyC8WkpwCPwTV8tuQvCl9Lu7M1s3ER4ST5Zh00IgeRiM2v';

const stripTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements strip={stripTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
