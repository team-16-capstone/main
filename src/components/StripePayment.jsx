import { useState } from 'react';
import StripeContainer from './StripeContainer';
import membercard from '../assets/membercard.png';

export default function StripePayment() {
  const [email, setEmail] = useState('');
  const [connection, setConnection] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // this api call will check if the user already is authorized as a StripeUser. if so, it will redirect them.
    try {
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
        setError('This user is already registered for Stripe.');
        return setConnection(false);
      }
      return setConnection(true);
    } catch (ex) {
      setError('This user has not been registered.');
      return setConnection(false);
    }
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
          {error ? <h3>{error}</h3> : <></>}
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
