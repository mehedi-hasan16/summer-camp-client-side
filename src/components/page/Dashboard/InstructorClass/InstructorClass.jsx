import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import SectionName from "../../../SectionName/SectionName";

const InstructorClass = () => {
    const [data, setData] = useState([])
    const { user } = useAuth();
    useEffect(() => {
        fetch(`http://localhost:5000/classes?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setData(data))
    }, [user])
    return (
        <div>
            <div className="w-full ms-10 mb-10">
                <SectionName title='my Classes'></SectionName>
                <h3 className="text-2xl font-bold">Total users: {data.length}</h3>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Class Name</th>
                                <th>Enrolled</th>
                                <th>Feedback</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, idx) =>
                                <tr key={item._id}>
                                    <th>{idx + 1}</th>
                                    <td>{item.className}</td>
                                    <td>{item.enrolled}</td>
                                    <td>{item.feedback ? item.feedback : 'Admin will review and feedback'}</td>
                                    <td> <span className="bg-amber-400 p-1 rounded-lg font-bold"> {item.status}</span></td>
                                    <td><button className="btn btn-error btn-xs">update</button></td>
                                </tr>)

                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InstructorClass;