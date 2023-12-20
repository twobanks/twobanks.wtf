
import Image from 'next/image';
import * as S from './styled';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, Pages } from '@/types/banks';

const Footer = ({ menu, page = 'home' } : { menu: Menu[]; page?: Pages }) => {
  const [hovered, setHovered] = useState<string>('');
  return (
    <S.Footer $page={page}>
      {menu.map((item, index) => {
        const isHovered = hovered === item.name;
        return (
          <Link href={`/${item.url}`} passHref key={`${item.name}-${index}`} title={item.name} >
            <S.Item
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered('')}
            >
              <Image src={isHovered ? item.iconAnimated : item.icon} alt={item.name} placeholder='blur' height={40} width={40} blurDataURL={isHovered ? item.iconAnimated : item.icon} priority quality={100}/>
            </S.Item>
          </Link>
        )
      })}
    </S.Footer>
  )
}

export default Footer
