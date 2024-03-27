import { NextSeo } from 'next-seo'
import Wrapper from '@/layouts/Wrapper'
import Listening from '@/layouts/Listening'
import { Artist, Playlists } from '@/types/spotify'
import useSWR from 'swr'
import fetcher from '@/utils/lib/fetcher'
import { TopTracks } from '@/types/spotify';

const ListeningPage = () => {
  const { data: dataTopTracks, isLoading: loadingTopTracks } = useSWR<TopTracks>(`/api/top-tracks`, fetcher);
  const { data: dataTopArtists, isLoading: loadingTopArtists } = useSWR<{ artists: Artist[] }>(`/api/top-artists`, fetcher);
  const { data: dataPlaylist, isLoading: loadingPlaylists } = useSWR<{ playlists: Playlists[] }>(`/api/playlists`, fetcher);
  return (
    <>
      <NextSeo
        title="ouvindo | twobanks"
        description="Hello World!"
        openGraph={{
          title: "ouvindo | twobanks",
          description: "Hello World!",
          url: "https://www.twobanks.wtf/ouvindo",
          site_name: "twobanks",
          images: [
            { url: 'https://avatars.githubusercontent.com/u/2577611?v=4' },
          ],
        }}
      />
      <Wrapper page="ouvindo">
        <Listening dataTopTracks={dataTopTracks} isLoading={(loadingTopTracks || loadingTopArtists || loadingPlaylists)} artists={dataTopArtists} dataPlaylist={dataPlaylist} />
      </Wrapper>
    </>
  )
}

export default ListeningPage
