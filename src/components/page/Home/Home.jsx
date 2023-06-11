import PopularClass from "../../PopularClass/PopularClass";
import PopularInstructors from "../../PopularInstructors/PopularInstructors";
import TopSlider from "../../TopSlider/TopSlider";
import Feedback from "./Feedback/Feedback";


const Home = () => {
    return (
        <div>
            <TopSlider></TopSlider>
            <PopularClass></PopularClass>
            <PopularInstructors></PopularInstructors>
            <Feedback></Feedback>
        </div>
    );
};

export default Home;