import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const InstructorRoute = ({children}) => {
    const {user, loading}= useAuth();
    const [role, roleLoading]= useUserRole();
    const  location = useLocation();

    if(loading || roleLoading){
        return <span className="loading loading-spinner loading-lg"></span>
    }
    else if(user && role ==='instructor'){
        return children;
    }
    return <Navigate to='/' state={{form: location}} replace></Navigate>
};

export default InstructorRoute;