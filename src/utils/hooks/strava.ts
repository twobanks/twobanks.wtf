import { useState, useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { CALL_REFRESH, CALL_ACTIVITIES, CALL_ATHLETE, CALL_GEAR } from '../constants/strava';
import { Activities } from '../../types/strava';

export const useStrava = () => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    fetch(CALL_REFRESH, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(result => setToken(result.access_token))
  }, [])

  const useActivities:  (page: number) => { data: Activities[]; loading: boolean; } = (page = 1) => {
    const { data = [], error } = useSWR<Activities[]>(token ? `${CALL_ACTIVITIES}${page}&access_token=` + token : null, fetcher);
    const dataFiltered = data?.filter(item => item?.visibility !== 'only_me');
    return { data: dataFiltered, loading: !data && !error };
  }

  const useAthelete = () => {
    const { data = [], error } = useSWR(token ? CALL_ATHLETE + token : null, fetcher);
    return { data, loading: !data && !error };
  }

  const useGear = () => {
    const { data = [], error } = useSWR(token ? CALL_GEAR + token : null, fetcher);
    return { data, loading: !data && !error };
  }

  return { useActivities, useAthelete, useGear }
}

