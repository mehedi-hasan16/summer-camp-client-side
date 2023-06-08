import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useManageClass = (email) => {
    const {user, loading} = useAuth();
    const { refetch, data: classes= [] } = useQuery({
        queryKey: ['classes', user?.email],
        enabled:!loading,
        queryFn: async ()=>{
            if(email){
                const res = await fetch(`http://localhost:5000/classes?email=${user?.email}`)
               return res.json();
            }
            else{
                const res = await fetch(`http://localhost:5000/classes`)
               return res.json();
            }
        },

      })
      return [classes, refetch]

};

export default useManageClass;