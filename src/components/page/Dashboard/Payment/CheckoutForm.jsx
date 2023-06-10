import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";



const CheckoutForm = ({ course, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure()
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post('/create-payment-intent', { price })
        .then(res => {
          console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret);
        })
    }
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return
    }

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })

    if (error) {
      console.log('error', error)
      setCardError(error.message);
    }
    else {
      setCardError('');
      // console.log('payment method', paymentMethod)
    }

    setProcessing(true)

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'unknown email',
            name: user?.displayName || 'anonymous user'
          },
        },
      },
    );

    if (confirmError) {
      console.log(confirmError);
    }

    console.log('payment intent', paymentIntent)
    setProcessing(false)
    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Payment Success!',
        showConfirmButton: false,
        timer: 1500
      })
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        item: course,
      }
      axiosSecure.post('/payments', payment)
        .then(res => {
          console.log(res.data);
          if (res.data.insertResult.insertedId) {
            //saved to the database 
          }
        })
    }


  }

  return (
    <div className="text-center">
      <div className="flex justify-center text-center">
        <form className="w-1/2 m-8" onSubmit={handleSubmit}>
          <CardElement className="border-2 p-3 rounded-md"
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
          <button className="btn bg-yellow-400 btn-sm mt-6" type="submit" disabled={!stripe || !clientSecret || processing}>
            Pay
          </button>
        </form>
      </div>
      <div className="text-center">
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && <p className="text-green-500">Success payment. transactionId: {transactionId}</p>}
      </div>
    </div>

  );
};

export default CheckoutForm;