import Swal from "sweetalert2";
import useCart from "../../../../hooks/useCart";
import SectionName from "../../../SectionName/SectionName";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const SelectedClasses = () => {
    const [axiosSecure]= useAxiosSecure();
    const [cart, refetch] = useCart();

    const handleRemoveCart = item => {
        
        axiosSecure.delete(`/cart/${item._id}`)
        .then(data => {
            if (data.data.deletedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Deleted succesfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            refetch();
        })
    }
    return (
        <div className="w-full ms-10">
            <SectionName title='Selected Classes'></SectionName>
            <div className="flex justify-around my-10">
            <div className="font-bold text-xl">Selected Total classes: {cart.length}</div>
            
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Purchase</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((item, idx) => <tr key={item._id}>
                                <td>{idx + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold">{item.className}</td>
                                <td>${item.price}</td>
                                <th>
                                    <button onClick={() => handleRemoveCart(item)} className="btn btn-error btn-xs">Delete</button>
                                </th>
                                <td><Link to={`/dashboard/payment?Id=${item._id}`}><button className="btn  btn-outline btn-primary btn-sm">PayNow</button></Link></td>
                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default SelectedClasses;