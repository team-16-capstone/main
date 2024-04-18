import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

export default function PaymentForm({ email }) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;

        const response = await fetch('http://localhost:3001/api/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: 1000, id }),
        });
        const responseData = await response.json();
        // If the payment is successful, another API call will be made to patch the user with the associated email,
        // So that stripeUser is set to true, therefore being able to log in
        if (responseData.success) {
          const updateResponse = await fetch(
            `http://localhost:3001/api/users/stripe/${email}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          const updateResponseData = await updateResponse.json();
          if (updateResponseData.ok) {
            console.log('succesfully update user status');
          }
          console.log('successful payment');
          setSuccess(true);
          setTimeout(() => {
            navigate('/');
          }, 1500); // redirect after 1.5 seconds
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className='FormGroup'>
            <div className='FormRow'>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <br />
          <button>Pay</button>
        </form>
      ) : (
        <div>
          <h3>Success!!</h3>
          <h3>Redirecting to Login...</h3>
        </div>
      )}
    </>
  );
}
