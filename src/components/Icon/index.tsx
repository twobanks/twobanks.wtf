import * as S from './styled';

type IconProps = {
  rotate?: boolean;
  src: any;
  alt?: string;
}

const Icon = ({ src, rotate, alt }: IconProps) => <S.Image src={src} alt={alt} rotate={rotate} />

export default Icon;
