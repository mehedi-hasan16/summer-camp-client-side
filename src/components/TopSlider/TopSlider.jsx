import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import './TopSlider.css'

// import required modules
import { Parallax, Pagination, Navigation } from "swiper";

const TopSlider = () => {
    return (
        <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            "backgroundImage":
              "url(https://images.squarespace-cdn.com/content/v1/5df033c6e1ea57732a4de2b7/1577529605849-STF6EWC8O28BTAIZO2RR/Sailing_Cass2.jpeg?format=1000w)",
          }}
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
          Explore, Learn, Connect 
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
          Language Adventure Awaits
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
            Join our summer language camp for an immersive and exciting language learning experience. Dive into a world of language and culture as you explore new destinations, learn new languages, and connect with like-minded language enthusiasts.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
          Unlock Your Linguistic Potential
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
          Summer Language Camp
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
            Unleash your linguistic potential at our summer language camp! Discover the joy of learning languages in a dynamic and supportive environment. Our camp offers a unique blend of interactive language lessons, cultural activities, and engaging workshops. 
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
          Experience the Magic of Multilingualism
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
          Summer Language Camp
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              Step into a world of multilingual magic at our summer language camp! Ignite your passion for languages and embrace the beauty of diversity. Our camp invites you to immerse yourself in a melting pot of languages, cultures, and traditions. From language workshops to cultural excursions, 
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
    );
};

export default TopSlider;