
import Icon from '../Icon';
import * as S from './styled';
import { useState } from 'react';
import Link from 'next/link';
import { menuItems } from './mock'

const Footer = () => {
  const [hovered, setHovered] = useState<string>('');
  return (
    <S.Footer>
      {menuItems.map(item => {
        const isHovered = hovered === item.name;
        return (
          <Link href={item.url} passHref key={item.id}>
            <li onMouseEnter={() => setHovered(item.name)} onMouseLeave={() => setHovered('')}>
              <Icon src={isHovered ? item.iconAnimated : item.icon} alt={item.name} />
            </li>
          </Link>
        )
      })}
    </S.Footer>
  )
}

export default Footer
