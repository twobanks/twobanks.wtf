import Image from 'next/image';
import images from '../../images';
import * as S from './styled';

const Home = () => (
  <S.Content>
    <Image src={images.me} blurDataURL={images.me} alt="twobanks" quality={100} fill priority />
  </S.Content>
)

export default Home;
