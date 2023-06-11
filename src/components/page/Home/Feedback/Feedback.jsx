import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import SectionName from "../../../SectionName/SectionName";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const Feedback = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: data = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review`);
            return res.data;
        }
    })
    return (
        <div>
            <SectionName title="What's our client says"></SectionName>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    data.map(review => <SwiperSlide key={review._id}>
                        <div className="flex justify-center flex-col items-center space-y-4">
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={review.picture} />
                            </div>
                        </div>
                            <p className="text-2xl text-yellow-500">{review.studentName}</p>

                            <p className='w-9/12 text-black'>{review.comment}</p>
                        <div className=" flex flex-col items-center space-y-3">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />

                        </div>
                        </div>

                    </SwiperSlide>)
                }

            </Swiper>
            <div>
            
        </div>
        </div>
    );
};

export default Feedback;