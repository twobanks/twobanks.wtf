import * as S from './styled';

type IconProps = {
  rotate?: boolean;
  src: string;
  alt: string;
  height?: number;
  width?: number;
}

const Icon = ({ src, rotate, alt, width, height }: IconProps) => <S.IconWrapper src={src} alt={alt} rotate={rotate} fill priority blurDataURL={src} height={height} width={width} />

export default Icon;
