import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ClassesCard = ({ item }) => {
    const [axiosSecure]= useAxiosSecure();
    const { _id, className, image, instructor, seats, price } = item;
    const { user } = useAuth();
    const [, refetch] = useCart();
    const navigate= useNavigate();
    const location = useLocation();

    const handleAddCart = item => {
        console.log(item);

        if (user && user.email) {
            const orderItem = { courseId: _id, className, image, instructor, price, email: user.email }
            
            axiosSecure.post('/cart', orderItem)
            .then(data => {
                if (data.data.insertedId) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Added to your Dashboard',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else if( data.data.message){
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
                title: 'Please Login for Enroll',
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
            <div className={`${seats ===0?'card w-96 bg-red-500 shadow-xl':'card w-96 bg-base-100 shadow-xl'}`}>
                <figure className="px-10 pt-10">
                    <img src={image} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{className}</h2>
                    <div>
                        <div>Instructor: {instructor}</div>
                        <div>Availabe seats: {seats}</div>
                        <div>Price: ${price}</div>
                    </div>
                    <div className="card-actions">
                        <button onClick={() => handleAddCart(item)} disabled={seats === 0 ? true : false} className="btn btn-primary">Enroll now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;