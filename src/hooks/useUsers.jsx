import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useUsers = () => {
    const { user, loading } = useAuth();
    const { data: isUserRole, refetch } = useQuery({
        queryKey: ['isUserRole', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?email=${user?.email}`)
            const data = await res.json();
            return data[0];

        },

    })
    return [isUserRole, refetch]

};

export default useUsers;