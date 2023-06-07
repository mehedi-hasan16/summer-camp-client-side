import Swal from "sweetalert2";
import useCart from "../../../../hooks/useCart";
import SectionName from "../../../SectionName/SectionName";

const SelectedClasses = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);
    const handleRemoveCart = item => {
        fetch(`http://localhost:5000/cart/${item._id}`, {
            method: 'delete'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
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
            <div className="font-bold text-xl">Total Price: ${totalPrice}</div>
            <button className="btn  btn-outline btn-primary btn-sm">PayNow</button>
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
                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default SelectedClasses;