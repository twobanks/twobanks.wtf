import { NextSeo } from 'next-seo'
import { SEO } from '@/utils/constants/seo'
import Wrapper from '@/layouts/Wrapper'
import Listening from '@/layouts/Listening'
import { NowPlayingSong } from '@/types/spotify'
import useSWR from 'swr'
import fetcher from '@/utils/lib/fetcher'
import { TopTracks } from '@/types/spotify';

const ListeningPage = () => {
  const { data, isLoading } = useSWR<NowPlayingSong>('/api/listening-now', fetcher);
  const { data: dataTopTracks } = useSWR<TopTracks>(`/api/top-tracks`, fetcher);
  return (
    <>
      <NextSeo
        title="ouvindo | twobanks"
        {...SEO}
      />
      <Wrapper page="ouvindo">
        <Listening data={data} dataTopTracks={dataTopTracks} isLoading={isLoading} />
      </Wrapper>
    </>
  )
}

export default ListeningPage
