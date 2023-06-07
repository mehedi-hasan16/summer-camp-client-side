import { useEffect, useState } from "react";
import InstructorsCard from "./InstructorsCard/InstructorsCard";

const InstructorsPage = () => {
    const [data, setData]= useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/user?role=instructor')
        .then(res=>res.json())
        .then(data=>setData(data))
    },[])
    return (
        
            <div className="grid grid-cols-3 gap-4 my-10">
            {
                data.map(item=><InstructorsCard key={item._id} instructor={item}></InstructorsCard>)
            }
        </div>
  
    );
};

export default InstructorsPage;