import useSWR from 'swr';
import fetcher from '../../utils/lib/fetcher';
import { NowPlayingSong } from '../../types/spotify';

export default function NowPlaying() {
  const { data } = useSWR<NowPlayingSong>('/api/spotify', fetcher);
  return (
   <>
    {data?.isPlaying ? <a href={data?.songUrl}>{data?.album} - {data?.artist} - {data?.title}</a> :  'empty'}
   </>
  );
}
