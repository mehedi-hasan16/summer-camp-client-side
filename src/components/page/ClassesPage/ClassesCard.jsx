import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { useLocation, useNavigate } from "react-router-dom";

const ClassesCard = ({ item }) => {
    const { _id, className, image, instructor, seats, price } = item;
    const { user } = useAuth();
    const [, refetch] = useCart();
    const navigate= useNavigate();
    const location = useLocation();

    const handleAddCart = item => {
        console.log(item);

        if (user && user.email) {
            const orderItem = { courseId: _id, className, image, instructor, price, email: user.email }
            fetch('http://localhost:5000/cart', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(orderItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Added to cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else if( data.message){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title:'Already added before',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }else{
            Swal.fire({
                title: 'Please Login for add to cart',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now'
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login', {state:{form: location}})
                }
              })
        }
    }

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{className}</h2>
                    <div>
                        <div>Instructor: {instructor}</div>
                        <div>Availabe seats: {seats}</div>
                        <div>Price: ${price}</div>
                    </div>
                    <div className="card-actions">
                        <button onClick={() => handleAddCart(item)} className="btn btn-primary">Enroll now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;