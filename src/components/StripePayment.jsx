import React, { useState } from 'react';
import StripeContainer from './StripeContainer';
import PaymentForm from './PaymentForm';
import membercard from '../assets/membercard.png';
import { Input } from 'postcss';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function StripePayment() {
  const [showItem, setShowItem] = useState(false);
  const [email, setEmail] = useState('');
  const [connection, setConnection] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // this api call will check if the user already is authorized as a StripeUser. if so, it will redirect them.
    const getUserByEmail = await fetch(
      `http://localhost:3001/api/users/stripe/get/${email}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
    const responseData = await getUserByEmail.json();
    if (responseData.stripeUser === true) {
      console.log('This user is already registered for Stripe.');
      return setConnection(false);
    }
    if (!responseData) {
      console.log('This user does not exist.');
      return setConnection(false);
    }

    console.log('Submitted email:', email);
    setConnection(true);
  };

  return (
    <div className='checkout'>
      {/* This conditional will render the stripe payment page only when an email has been set, which then updates state to 'connected' */}
      {!connection ? (
        <>
          <h3>
            To purchase a membership, please enter the email associated with
            your Pocket Butcher account.
          </h3>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type='submit'>Submit</button>
          </form>
        </>
      ) : (
        <>
          <h2>Membership</h2>
          <h3>$100</h3>
          <img src={membercard} alt='member card' />
          {/* email is passed as a prop to Stripe Container */}
          <StripeContainer email={email} />
        </>
      )}
    </div>
  );
}
