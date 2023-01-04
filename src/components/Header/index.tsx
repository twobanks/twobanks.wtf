import Image from 'next/image';
import * as S from './styles'
import { useState } from 'react'
import Link from 'next/link'
import { conversionTitlePage } from '../../utils/functions/conversionPage'
import { Title } from '../';
import { Header } from '../../types/banks';

type HeaderProps = {
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
  header: Header;
}

const Header = ({ page = 'home', header }: HeaderProps) => {
  const [hovered, setHovered] = useState<string>('')
  const { avatar, menu } = header;
  return(
    <S.Header page={page}>
      <S.Content page={page}>
        <S.Banks page={page}>
          <Link href={`/`} passHref prefetch={false}>
            <Image src={avatar} alt="twobanks" blurDataURL={avatar} layout="fill" priority />
          </Link>
        </S.Banks>
        {page !== 'home' && (
          <S.Nav>
            {menu.map(page => {
              const path = `/${page.url}`
              const isHovered = hovered === page.name
              if(page.name !== 'home') {
                return(
                  <li key={page.name}>
                    <Link href={path} passHref>
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
                          {page.name}
                        </S.NavContainer>
                    </Link>
                  </li>
                )
              }
            })}
          </S.Nav>
        )}
      </S.Content>
      <Title text={conversionTitlePage(page)} page={page} />
    </S.Header>
  )
}

export default Header
