import { useEffect, useState } from "react";
import InstructorsCard from "./InstructorsCard/InstructorsCard";
import SectionName from "../../SectionName/SectionName";

const InstructorsPage = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/users/instructor')
            .then(res => res.json())
            .then(data => setData(data))
    }, [])
    return (

        <div className="mb-4">
            <SectionName title='All Istructor'></SectionName>
            <div className="grid grid-cols-3 gap-4 my-10">
            {
                data.map(item => <InstructorsCard key={item._id} instructor={item}></InstructorsCard>)
            }
        </div>
        </div>

    );
};

export default InstructorsPage;