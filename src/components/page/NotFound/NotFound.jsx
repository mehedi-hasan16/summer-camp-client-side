import { FaArrowLeft } from 'react-icons/fa';
import notFoundImg from '../../../assets/404.webp'
import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <div className='text-center'>
            <img src={notFoundImg} alt="" />
            <Link to='/'><button className='btn btn-primary'> <FaArrowLeft></FaArrowLeft>Back to Home</button></Link>
        </div>
    );
};

export default NotFound;