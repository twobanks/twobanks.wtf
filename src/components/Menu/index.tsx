import { useState } from 'react';
import * as S from './styled';
import { Header } from '../../types/banks';
import Link from 'next/link';
import Icon from '../Icon';
import NowPlaying from '../NowPlaying';

const Menu = ({ header }: { header: Header; }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState<string>('')
  const { menu } = header;
  const renderBody = () => (
    <S.Content
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <S.Nav>
        {menu.map(page => {
          const path = `/${page.url}`
          const isHovered = hovered === page.name
          return (
            <Link href={path} passHref key={page.name}>
              <S.NavContainer
                onHoverStart={() => setHovered(page.name)}
                onHoverEnd={() => setHovered('')}
              >
                {isHovered && (
                  <S.NavHovered
                    layoutId="nav"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <Icon src={isHovered ? page.iconAnimated : page.icon} alt={page.name} />
                {page.name}
              </S.NavContainer>
            </Link>
          )
        })}
      </S.Nav>
      <NowPlaying />
    </S.Content>
  )
  return (
    <S.Wrapper>
      <button onClick={() => setOpen(prevState => !prevState)}>menu</button>
      {open && renderBody()}
    </S.Wrapper>
  )
}

export default Menu;
