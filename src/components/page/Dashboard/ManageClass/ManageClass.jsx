import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import SectionName from "../../../SectionName/SectionName";
import Swal from "sweetalert2";
import useManageClass from "../../../../hooks/useManageClass";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageClass = () => {
    // const [data, setData] = useState([])
    // const { user } = useAuth();
    // useEffect(() => {
    //     fetch(`http://localhost:5000/classes`)
    //         .then(res => res.json())
    //         .then(data => setData(data))
    // }, [user])
    const [classes, refetch]= useManageClass();
    console.log(classes);
const [axiosSecure]= useAxiosSecure();
    const handleDenied = item => {
        console.log(item);
        Swal.fire({
            title: 'Write feedback why denied?',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            showLoaderOnConfirm: true,
            preConfirm: (comment) => {
                axiosSecure.patch(`/classes/${item._id}`,{
                    status: 'denied',
                    comment: comment
                }).then(data => {
                    if (data.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'succesfully updated',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                // fetch(`http://localhost:5000/classes/${item._id}`, {
                //     method: 'PATCH',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         status: 'denied',
                //         comment: comment
                //     })
                // })
                //     .then(res => res.json())
                //     .then(data => {
                //         if (data.modifiedCount > 0) {
                //             refetch();
                //             Swal.fire({
                //                 position: 'top-end',
                //                 icon: 'success',
                //                 title: 'succesfully updated',
                //                 showConfirmButton: false,
                //                 timer: 1500
                //             })
                //         }
                //     })
            }
        })
    }

    const handleApprove = item => {
        axiosSecure.patch(`/classes/${item._id}`, {status: 'approve'})
        .then(data => {
            if (data.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Approved succesfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        // fetch(`http://localhost:5000/classes/${item._id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         status: 'approve',
        //     })
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.modifiedCount > 0) {
        //             refetch();
        //             Swal.fire({
        //                 position: 'top-end',
        //                 icon: 'success',
        //                 title: 'Approved succesfully',
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             })
        //         }
        //     })
    }
    return (
        <div className="w-full ms-10">
            <SectionName title='Manage Class'></SectionName>
            <div className="flex justify-around my-10">
                <div className="font-bold text-xl">All classes: {classes.length}</div>
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
                            classes.map((item, idx) => <tr key={item._id}>
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
                                    {
                                        item.status === 'approve' ? (
                                            <div>
                                                <button onClick={() => handleDenied(item)} className="btn btn-xs btn-error mt-2">Denied</button>
                                            </div>
                                        ) : item.status === 'denied' ? (
                                            <div>
                                                <button onClick={() => handleApprove(item)} className="btn btn-xs btn-success">Approve</button>
                                            </div>
                                        ) : (
                                            <>
                                                <div>
                                                    <button onClick={() => handleDenied(item)} className="btn btn-xs btn-error mt-2">Denied</button>
                                                </div>
                                                <div>
                                                    <button onClick={() => handleApprove(item)} className="btn btn-xs btn-success mt-1">Approve</button>
                                                </div>
                                            </>
                                        )
                                    }



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