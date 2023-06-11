import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
const useCart = () => {
    const [axiosSecure]= useAxiosSecure();
    const {user, loading} = useAuth();
    const { refetch, data: cart= [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled:!loading,
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/cart?email=${user?.email}`)
               return res.data;
        },

      })
      return [cart, refetch]

};

export default useCart;