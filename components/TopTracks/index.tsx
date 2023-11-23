import useSWR from 'swr';
import fetcher from "@/utils/lib/fetcher";
import * as S from './styles';
import Link from 'next/link';
import Image from 'next/image';
import { TopTracks as TopTracksType } from '@/types/spotify';

const TopTracks = () => {
  const { data } = useSWR<TopTracksType>(`/api/top-tracks`, fetcher);
  return (
    <S.Wrapper>
      {data?.tracks.map(track => (
        <li key={`track-${track.music}`}>
          <Link href={track.url} target='_blank'>
            <Image src={track.images} alt={track.music} width={40} height={40} />
            <S.Info>
              <strong>{track.music}</strong>
              <span>{track.artist}</span>
            </S.Info>
          </Link>
        </li>
      ))}
    </S.Wrapper>
  )
}

export default TopTracks;