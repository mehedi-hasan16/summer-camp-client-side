import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    

    const {data: role, isLoading: roleLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`users/userRole/${user?.email}`);
            return res.data.userRole;
        }
    })
return [role, roleLoading]
};

export default useUserRole;