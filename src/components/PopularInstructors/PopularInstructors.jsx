import { useEffect, useState } from 'react';
import SectionName from '../SectionName/SectionName';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PopularInstructors = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: data = [] } = useQuery({
        queryKey: ['popularInstructor'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/limitInstructor`);
            return res.data;
        }
    })
    return (
        <div>
            <SectionName title='Popular Instructors'></SectionName>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-10 px-4 md:px-0'>
                {
                    data.map(item => <div key={item._id}>

                        <div className="card card-compact md:w-96 bg-base-100 shadow-xl">
                            <figure><img src={item.image} alt="image" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.name}</h2>
                                <p>Email: {item.email}</p>
                            </div>
                        </div>

                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularInstructors;