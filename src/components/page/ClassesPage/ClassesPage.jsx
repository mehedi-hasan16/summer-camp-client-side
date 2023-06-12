import ClassesCard from "./ClassesCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionName from "../../SectionName/SectionName";

const ClassesPage = () => {
    const [axiosSecure]= useAxiosSecure();
    const { data: data = [] } = useQuery({
        queryKey: ['classesPage'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/approve`);
            return res.data;
        }
    })
    return (
        <div className="mb-12">
            <SectionName title='All classes'></SectionName>
            <div className="grid grid-cols-3 gap-5">
            {
            data.map(item=><ClassesCard key={item._id} item={item}></ClassesCard>)
            }
        </div>
        </div>
    );
};

export default ClassesPage;
