import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import SectionName from "../../../SectionName/SectionName";
import useCart from "../../../../hooks/useCart";


console.log(import.meta.env.VITE_STRIPE_PK_KEY);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);
const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2))
    return (
        <div className="w-full">
            <SectionName title='payment'></SectionName>
            <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} price={price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;