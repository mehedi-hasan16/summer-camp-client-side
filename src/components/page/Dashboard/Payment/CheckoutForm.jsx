import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './common.css'
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";

const CheckoutForm = ({price}) => {
  const stripe = useStripe();
  const elements = useElements();
  const {user}= useAuth();
  const [cardError, setCardError]= useState('')
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({price}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('error', error);
      setCardError(error.message);
    } else {
      setCardError('');
      console.log('PaymentMethod', paymentMethod);
    }
    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'unknown',
            name: user?.displayName || 'anonymous',
          },
        },
      },
    );
    if(confirmError){
      console.log(confirmError);
    }
    console.log(paymentIntent);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-primary btn-sm" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
    </form>
    {cardError && <p className="text-red-500">{cardError}</p> }
    </div>
  );
};

export default CheckoutForm;