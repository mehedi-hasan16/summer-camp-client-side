import { useEffect, useState } from "react";
import ClassesCard from "./ClassesCard";

const ClassesPage = () => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/classes')
        .then(res=>res.json())
        .then(data=>setData(data))
    },[])
    return (
        <div className="grid grid-cols-3 gap-5">
            {
            data.map(item=><ClassesCard key={item._id} item={item}></ClassesCard>)
            }
        </div>
    );
};

export default ClassesPage;
