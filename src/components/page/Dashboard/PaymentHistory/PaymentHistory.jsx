import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionName from "../../../SectionName/SectionName";
import moment from "moment/moment";


const PaymentHistory = () => {
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
            <SectionName title='Payment History'></SectionName>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Email</th>
                            <th>Transaction Id</th>
                            <th>Date</th>
                            <th>Price</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            data.map((item, idx) => <tr key={item._id}>
                                <td>{idx + 1}</td>
                                <td>{item.item.className}</td>
                                <td>{item.item.email}</td>
                                <td>{item.transactionId}</td>
                                <td> {moment(item.date).format('l')}</td>
                                <td>${item.item.price}</td>


                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;