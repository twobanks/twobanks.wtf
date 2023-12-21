import { NextSeo } from 'next-seo'
import { SEO } from '@/utils/constants/seo'
import Wrapper from '@/layouts/Wrapper'
import Listening from '@/layouts/Listening'
import { Artist, NowPlayingSong } from '@/types/spotify'
import useSWR from 'swr'
import fetcher from '@/utils/lib/fetcher'
import { TopTracks } from '@/types/spotify';
import { ListeningNow } from '@/components'

const ListeningPage = () => {
  const { data, isLoading } = useSWR<NowPlayingSong>('/api/listening-now', fetcher);
  const { data: dataTopTracks, isLoading: loadingTopTracks } = useSWR<TopTracks>(`/api/top-tracks`, fetcher);
  const { data: dataTopArtists, isLoading: loadingTopArtists } = useSWR<{artists: Artist[]}>(`/api/top-artists`, fetcher);
  return (
    <>
      <NextSeo
        title="ouvindo | twobanks"
        {...SEO}
      />
      <Wrapper page="ouvindo">
        {/* <ListeningNow data={data} isLoading={isLoading} /> */}
        <Listening data={data} dataTopTracks={dataTopTracks} isLoading={(loadingTopTracks || loadingTopArtists || isLoading)} artists={dataTopArtists}/>
      </Wrapper>
    </>
  )
}

export default ListeningPage
