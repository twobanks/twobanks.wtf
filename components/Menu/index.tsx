import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/types/banks';
import * as S from './styled';

const Menu = ({ header }: { header: Header; }) => {
  const [hovered, setHovered] = useState<string>('');
  const { menu } = header;
  return (
    <S.Wrapper>
      <S.Nav>
        {menu.map(page => {
          const path = `/${page.url}`
          const isHovered = hovered === page.name
          return (
            <S.NavContainer
              key={page.name}
              onMouseEnter={() => setHovered(page.name)}
              onMouseLeave={() => setHovered('')}
            >
              <Link href={path} passHref>
                <Image title={page.name} src={isHovered ? page.iconAnimated : page.icon}  alt={page.name} height={40} width={40} blurDataURL={isHovered ? page.iconAnimated : page.icon} priority quality={100}/>
              </Link>
            </S.NavContainer>
          )
        })}
      </S.Nav>
    </S.Wrapper>
  )
}

export default Menu;
