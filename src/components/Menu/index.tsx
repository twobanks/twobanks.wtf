import { useState } from 'react';
import * as S from './styled';
import { Header } from '../../types/banks';
import Link from 'next/link';
import Image from 'next/image';
import NowPlaying from '../NowPlaying';
import { social } from '../../../public/content';

const Menu = ({ header }: { header: Header; }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState<string>('');
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
                onMouseEnter={() => setHovered(page.name)}
                onMouseLeave={() => setHovered('')}
              >
                {isHovered && (
                  <S.NavHovered
                    layoutId="nav"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <Image src={isHovered ? page.iconAnimated : page.icon} alt={page.name} height={25} width={25} blurDataURL={isHovered ? page.iconAnimated : page.icon} priority quality={100}/>
                {page.name}
              </S.NavContainer>
            </Link>
          )
        })}
      </S.Nav>
      <NowPlaying />
      <S.SocialWrapper>
        {social.map(item => (
          <Link href={item.link} key={item.name} target="_blank" rel="noreferrer" passHref>
            <Image src={item.icon} alt={item.name} height={22.5} width={22.5} blurDataURL={item.icon} priority quality={100}/>
          </Link>
        ))}
      </S.SocialWrapper>
    </S.Content>
  )
  return (
    <>
      <S.Wrapper>
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
