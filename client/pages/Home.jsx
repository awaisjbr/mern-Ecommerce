import Loading from '@/components/Loading'
import { useAuthStore } from '@/store/useAuthStore'
import { axiosInstance } from '@/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import React, { Suspense } from 'react'

const Home = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const {data} = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const {data} = await axiosInstance.get("/api/auth/getme");
            if(data.success){
                setUser(data.user)
                return data.user
            }
        }
    });

  return (
    <Suspense fallback={<Loading />}>
      <h1>Home Page</h1>
    </Suspense>
  )
}

export default Home
