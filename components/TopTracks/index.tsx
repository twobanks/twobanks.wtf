import useSWR from 'swr';
import fetcher from "@/utils/lib/fetcher";
import * as S from './styles';
import Link from 'next/link';
import { TopTracks } from '@/types/spotify';

const TopTracks = () => {
  const { data } = useSWR<TopTracks>(`/api/top-tracks`, fetcher);
  return (
    <S.Wrapper>
      {data?.tracks.map(track => (
        <li key={`track-${track.music}`}>
          <Link href={track.url}>
            <em />
            <div>
              <span>{track.artist}</span>
              <span>{track.music}</span>
            </div>
          </Link>
        </li>
      ))}
    </S.Wrapper>
  )
}

export default TopTracks;