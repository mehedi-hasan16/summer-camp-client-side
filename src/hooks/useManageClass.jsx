import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useManageClass = (email) => {
    const [axiosSecure]= useAxiosSecure();
    const {user, loading} = useAuth();
    const { refetch, data: classes= [] } = useQuery({
        queryKey: ['classes', user?.email],
        enabled:!loading,
        queryFn: async ()=>{
            if(email){
                const res = await axiosSecure.get(`/classes/${user?.email}`)
               return res.data;
            }
            else{
                const res = await axiosSecure.get(`/classes`)
               return res.data;
            }
        },

      })
      return [classes, refetch]

};

export default useManageClass;