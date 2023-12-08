import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/types/banks';
import * as S from './styled';
import images from '@/public';

const Menu = ({ header }: { header: Header; }) => {
  const [hovered, setHovered] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  console.log("open", open);
  const { menu } = header;
  const renderBody = () => (
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
                <Image title={page.name} src={isHovered ? page.iconAnimated : page.icon}  alt={page.name} height={40} width={40} blurDataURL={isHovered ? page.iconAnimated : page.icon} priority quality={100}/>
                {page.name}
            </S.NavContainer>
          </Link>
        )
      })}
    </S.Nav>
  )
  return (
    <>
      <S.Wrapper>
        <S.IconNavWrapper onClick={() => setOpen(prevState => !prevState)} open={open}>
          <Image src={images.menu} alt="Ícone menu" width={20} height={20}/>
        </S.IconNavWrapper>
        {open && (
          <S.Content>
            {renderBody()}
          </S.Content>
        )}
      </S.Wrapper>
      <S.Overlay onClick={() => setOpen(prevState => !prevState)} open={open} />
    </>
  )
}

export default Menu;
