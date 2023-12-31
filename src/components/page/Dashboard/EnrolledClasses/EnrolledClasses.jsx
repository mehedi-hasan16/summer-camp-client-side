import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionName from "../../../SectionName/SectionName";

const EnrolledClasses = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: data = [] } = useQuery({
        queryKey: ['enrolledClass', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrolledClasses/${user?.email}`);
            return res.data;
        }
    })

    return (
        <div className="w-full">
            <SectionName title='Enrolled Classes'></SectionName>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Instructor</th>
                            <th>Price</th>

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
                                                <img src={item.item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold">{item.item.className}</td>
                                <td className="font-bold">{item.item.instructor}</td>
                                <td>${item.item.price}</td>


                            </tr>)
                        }
                    </tbody>


                </table>
            </div>       
         </div>
    );
};

export default EnrolledClasses;