import axios, { AxiosError } from 'axios';
import { API_URL } from 'config';
import { useQuery } from '@tanstack/react-query';
import { Tick } from 'types/tick';

export const useGetHistoricalTpsQuery = () => {
  const pollInterval = 5000;
  const url = `${API_URL}/tps/history`;

  const queryFn = async <TData>() => {
    const { data } = await axios.get<TData>(url, {
      timeout: 3000,
    });
    return data;
  };

  const retry = (_failureCount: number, error: AxiosError) => {
    return error.response?.status === 404;
  };

  return useQuery<never, AxiosError, Tick[]>({
    queryKey: ['historical-tps'],
    queryFn,
    retry,
    refetchInterval: pollInterval,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    gcTime: 0,
  });
};
