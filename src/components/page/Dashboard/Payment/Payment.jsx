import { loadStripe } from "@stripe/stripe-js";
import SectionName from "../../../SectionName/SectionName";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../../../hooks/useCart";
const strpePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY)

const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));
    return (
        <div className="w-full">
            <SectionName title='payment'></SectionName>

            <Elements stripe={strpePromise}>
                <CheckoutForm price={price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;