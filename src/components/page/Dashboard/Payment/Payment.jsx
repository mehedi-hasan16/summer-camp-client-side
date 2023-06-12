import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import SectionName from "../../../SectionName/SectionName";
import useCart from "../../../../hooks/useCart";
import { useLocation } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);
const Payment = () => {
    const [cart] = useCart();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const Id = searchParams.get('Id');
    const paymentCourse = cart.find(item => item._id == Id)

    return (
        <div className="w-full">
            <SectionName title='payment'></SectionName>
            <div className="flex justify-center">
                <h3 className="text-xl font-semibold me-6">Course: {paymentCourse?.className}</h3>
                <h3 className="text-xl font-semibold">Price: ${paymentCourse?.price}</h3>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm course={paymentCourse} price={paymentCourse?.price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;