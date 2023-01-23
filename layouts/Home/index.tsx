import useSWR from 'swr';
import fetcher from '@/utils/lib/fetcher';
import * as S from './styled';

const Home = () => {
  const { data } = useSWR(`/api/top-tracks`, fetcher);
  const { data: dataArtists } = useSWR(`/api/top-artists`, fetcher);
  console.log("dataArtists", dataArtists);
  console.log("data", data);
  return (
    <S.Content>
      <S.TwoBanks />
    </S.Content>
  )
}

export default Home;
