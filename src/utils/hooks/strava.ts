import { useState, useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { CALL_REFRESH, CALL_ACTIVITIES, CALL_ATHLETE } from '../constants/strava';
import { Activities } from '../../types/strava';

const EMPTY = 0;

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
    const { data = [], error } = useSWR<Activities[]>(token ? `${CALL_ACTIVITIES}${page}&per_page=10&access_token=` + token : null, fetcher, {
      revalidateOnFocus: false,
    });
    return { data, loading: data.length === EMPTY && !error};
  }

  const useAthelete = () => {
    const { data = [], error } = useSWR(token ? CALL_ATHLETE + token : null, fetcher);
    return { data, loading: !data && !error };
  }

  return { useActivities, useAthelete }
}

