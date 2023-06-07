import { useEffect, useState } from 'react';
import SectionName from '../SectionName/SectionName';

const PopularInstructors = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/user?role=instructor')
            .then(res => res.json())
            .then(data => setData(data))
    }, [])
    return (
        <div>
            <SectionName title='Popular Instructors'></SectionName>
            <div className='grid grid-cols-3 gap-4 mb-16'>
                {
                    data.map(item => <div key={item._id}>

                        <div className="card card-compact w-96 bg-base-100 shadow-xl">
                            <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.name}</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>

                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularInstructors;