import useSWR from 'swr';
import fetcher from "@/utils/lib/fetcher";
import * as S from './styles';
import Link from 'next/link';
import { TopTracks } from '@/types/spotify';
import { useState, ReactNode } from 'react';

const TopTracks = () => {
  const { data } = useSWR<TopTracks>(`/api/top-tracks`, fetcher);
  const [hovered, setHovered] = useState<string>('');
  const Animation = (props: { index: string; children: ReactNode }) => {
    console.log("props", props);
    let isHovered = hovered === props.index
    console.log("isHovered", isHovered);
    return (
      <S.AnimContainer
        onHoverStart={() => setHovered(props.index)}
        onHoverEnd={() => setHovered('')}
      >
        {isHovered && (
          <S.AnimHovered
            layoutId="listItem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {props.children}
      </S.AnimContainer>
    )
  }
  return (
    <S.Wrapper>
      {data?.tracks.map(track => (
        <li key={`track-${track.music}`}>
          <Animation index={track.music}>
            <Link href={track.url}>
              <em />
              <div>
                <span>{track.artist}</span>
                <span>{track.music}</span>
              </div>
            </Link>
          </Animation>
        </li>
      ))}
    </S.Wrapper>
  )
}

export default TopTracks;