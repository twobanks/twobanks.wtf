import { useContext, useState } from 'react';
import * as S from './styled';
import { Header } from '../../types/banks';
import Link from 'next/link';
import Icon from '../Icon';
import NowPlaying from '../NowPlaying';
import { social } from '../../../public/content';
import { MouseContext } from '../../utils/context/mouse-context';

const Menu = ({ header }: { header: Header; }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState<string>('');
  const { cursorChangeHandler } = useContext(MouseContext);
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
                onMouseEnter={() => {
                  setHovered(page.name);
                  cursorChangeHandler("hovered");
                }}
                onMouseLeave={() => {
                  setHovered('');
                  cursorChangeHandler("");
                }}
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
      <S.SocialWrapper>
        {social.map(item => (
          <a href={item.link} key={item.name} target="_blank" rel="noreferrer">
            <Icon src={item.icon} alt={item.name} />
          </a>
        ))}
      </S.SocialWrapper>
    </S.Content>
  )
  return (
    <>
      <S.Wrapper onMouseEnter={() => cursorChangeHandler("hovered")} onMouseLeave={() => cursorChangeHandler("")}>
        <S.IconNavWrapper onClick={() => setOpen(prevState => !prevState)} open={open}>
          <span />
          <span />
          <span />
        </S.IconNavWrapper>
        {open && renderBody()}
      </S.Wrapper>
      <S.Overlay onClick={() => setOpen(prevState => !prevState)} open={open} />
    </>
  )
}

export default Menu;
