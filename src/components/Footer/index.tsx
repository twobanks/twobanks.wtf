
import Icon from '../Icon';
import * as S from './styled';
import { useState } from 'react';
import Link from 'next/link';
import { Menu } from '../../types/banks';

const Footer = ({ menu } : { menu: Menu[] }) => {
  const [hovered, setHovered] = useState<string>('');
  return (
    <S.Footer>
      {menu.map((item, index) => {
        const isHovered = hovered === item.name;
        return (
          <Link href={item.url} passHref key={`${item.name}-${index}`}>
            <S.Item avatar={item.name === 'home'} onMouseEnter={() => setHovered(item.name)} onMouseLeave={() => setHovered('')}>
              <Icon src={isHovered ? item.iconAnimated : item.icon} alt={item.name} />
            </S.Item>
          </Link>
        )
      })}
    </S.Footer>
  )
}

export default Footer
