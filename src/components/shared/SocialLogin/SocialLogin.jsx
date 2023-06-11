import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const{googleSignIn} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const formPage = location.state?.form?.pathname || '/'


    const handleGoogleUser = ()=>{
        googleSignIn()
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);

            Swal.fire(
                'Success',
                'Login successfully',
                'success'
            )
            const saveUser = { name: loggedUser.displayName, email: loggedUser.email, image: loggedUser.photoURL, role: 'student' }
            axios.post('http://localhost:5000/users', saveUser)
            .then(data=>{
                console.log(data.data);
                navigate(formPage, { replace: true });

            })
        })
        .catch(error=>console.log(error))
    }
    return (
        <div className="text-center">
            
            <div className="divider">OR</div>
            <button onClick={handleGoogleUser} className="btn btn-circle btn-outline">
                <FaGoogle></FaGoogle>
            </button>
        </div>
    );
};

export default SocialLogin;