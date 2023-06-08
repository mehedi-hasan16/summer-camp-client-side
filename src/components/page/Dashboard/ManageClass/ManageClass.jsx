import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import SectionName from "../../../SectionName/SectionName";

const ManageClass = () => {
    const [data, setData] = useState([])
    const { user } = useAuth();
    useEffect(() => {
        fetch(`http://localhost:5000/classes`)
            .then(res => res.json())
            .then(data => setData(data))
    }, [user])

    const handleDenied = item =>{
        console.log(item);
    }
    return (
        <div className="w-full ms-10">
            <SectionName title='Manage Class'></SectionName>
            <div className="flex justify-around my-10">
            <div className="font-bold text-xl">All classes: {data.length}</div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Instructor Email</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            data.map((item, idx) => <tr key={item._id}>
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
                                <td>{item.className}</td>
                                <td>{item.instructor}</td>
                                <td>{item.email}</td>
                                <td>{item.seats}</td>
                                <td>${item.price}</td>
                                <td>{item.status}</td>
                                <td>
                                    <div>
                                        <button className="btn btn-xs btn-success">Approve</button>
                                    </div>
                                    <button onClick={()=>handleDenied(item)} className="btn btn-xs btn-error mt-2">Denied</button>
                                    <div>
                                    </div>
                                    <div>
                                    </div>
                
                                </td>
                                
                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ManageClass;