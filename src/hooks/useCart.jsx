import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
const useCart = () => {
    const {user, loading} = useAuth();
    const { refetch, data: cart= [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled:!loading,
        queryFn: async ()=>{
            const res = await fetch(`http://localhost:5000/cart?email=${user?.email}`)
               return res.json();
        },

      })
      return [cart, refetch]

};

export default useCart;