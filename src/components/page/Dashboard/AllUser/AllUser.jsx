import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import SectionName from "../../../SectionName/SectionName";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const AllUser = () => {
    const [axiosSecure]= useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    
    const handleDelete = user => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                .then(data => {
                    if (data.data.deletedCount > 0) {
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })
            }
        })
    }
    const handleMakeAdmin = (user, role) => {

        axiosSecure.patch(`/users/${user._id}/role`,{role})
        .then(data => {
            if (data.data.modifiedCount) {
                refetch();
                Swal.fire(`${user.name} status updated`)
            }
        })
    }
    return (
        <div className="w-full ms-10 mb-10">
            <SectionName title='all users'></SectionName>
            <h3 className="text-2xl font-bold">Total users: {users.length}</h3>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th>Make Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) =>
                            <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <div>
                                        {user.role === 'admin' ? " " : <button onClick={() => handleMakeAdmin(user, 'admin')} className="btn btn-xs bg-orange-500 text-white">Make admin</button>}
                                    </div>
                                    <div>
                                        {user.role === 'instructor' ? " " : <button onClick={() => handleMakeAdmin(user, 'instructor')} className="btn btn-xs bg-orange-500 text-white">Make instructor</button>}
                                    </div>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(user)} className="btn btn-xs bg-red-600 text-white">delete</button>
                                </td>
                            </tr>)

                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;