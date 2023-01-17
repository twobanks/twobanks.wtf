
import Icon from '../Icon';
import * as S from './styled';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { Menu } from '../../types/banks';
import { MouseContext } from '../../utils/context/mouse-context';

const Footer = ({ menu } : { menu: Menu[] }) => {
  const [hovered, setHovered] = useState<string>('');
  const { cursorChangeHandler } = useContext(MouseContext);
  return (
    <S.Footer>
      {menu.map((item, index) => {
        const isHovered = hovered === item.name;
        return (
          <Link href={item.url} passHref key={`${item.name}-${index}`} >
            <S.Item
              onMouseEnter={() => {
                setHovered(item.name);
                cursorChangeHandler("hovered");
              }}
              onMouseLeave={() => {
                setHovered('');
                cursorChangeHandler("");
              }}
            >
              <Icon src={isHovered ? item.iconAnimated : item.icon} alt={item.name} />
            </S.Item>
          </Link>
        )
      })}
    </S.Footer>
  )
}

export default Footer
