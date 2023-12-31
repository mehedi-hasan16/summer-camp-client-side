import SectionName from "../SectionName/SectionName";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion"

const PopularClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: data = [] } = useQuery({
        queryKey: ['popularClasses'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/topSort`);
            return res.data;
        }
    })
    return (

        <div>
            <SectionName title='popular classes'></SectionName>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10 px-4 md:px-0">

                {
                    data.map(item => <motion.div whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }} key={item._id}>
                        <div className="card md:w-96 bg-base-100 shadow-xl">
                            <figure><img src={item.image} alt="image" className="w-full h-60 object-cover" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.className}</h2>
                                <p>Instructor: {item.instructor}</p>
                                <p>Enrolled: {item.enrolled}</p>
                                <p>Price: ${item.price}</p>
                            </div>
                        </div>
                    </motion.div>)
                }
            </div>
        </div>
    );
};

export default PopularClass;