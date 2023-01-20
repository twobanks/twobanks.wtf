import Image from 'next/image';
import images from '../../images';
import * as S from './styled';

const Home = () => (
  <S.Content>
    <Image src={images.me} alt="twobanks" height={165} width={610} />
  </S.Content>
)

export default Home;
