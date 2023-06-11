import { useEffect, useState } from "react";
import SectionName from "../SectionName/SectionName";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PopularClass = () => {
    // const [classes, setClass] = useState([])
    // useEffect(() => {
    //     fetch('http://localhost:5000/classes')
    //         .then(res => res.json())
    //         .then(data => setClass(data))
    // }, [])
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
            <div className="md:grid grid-cols-3 gap-4 my-10">
            
            {
                data.map(item => <div key={item._id}>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure><img src={item.image} alt="image" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.className}</h2>
                            <p>Instructor: {item.instructor}</p>
                            <p>Enrolled: {item.enrolled}</p>
                            <p>Price: ${item.price}</p>
                        </div>
                    </div>
                </div>)
            }
        </div>
        </div>
    );
};

export default PopularClass;