import { NowPlayingSong } from '@/types/spotify';
import Link from "next/link";
import * as S from './styled'

const ListeningNow = ({ data, isLoading } : { data?: NowPlayingSong; isLoading: boolean; }) => (
  <S.Wrapper $visible={Boolean(data?.isPlaying)}>
    {isLoading ? (
      <S.WrapperLoading>
        <span />
        <span />
        <span />
      </S.WrapperLoading>
    ): (
      <>
        {data?.isPlaying && (
          <Link href={data.url} target="_blank" rel="noreferrer" passHref title={`${data.music} - ${data.artist}`}>
            <S.SongWrapper>
              <span>
                {data.music} - {data.artist}
              </span>
            </S.SongWrapper>
          </Link>
        )}
      </>
    )}
  </S.Wrapper>
)

export default ListeningNow
