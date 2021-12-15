import { useEffect } from 'react';
import { useMeQuery } from '../generated/graphql';
import { useRouter } from './useRouter';

export const useCheckAuth = () => {
  const { data, loading } = useMeQuery({
    fetchPolicy: 'cache-and-network'
  })
  const router = useRouter()
  
  useEffect(()=> {
    if (!loading && data?.me && router.pathname==='/login')
      router.push('/')
  }, [data, loading, router])

  return {data, loading}
}