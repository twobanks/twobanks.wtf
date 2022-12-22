import Image from 'next/image';
import * as S from './styles'
import { useState } from 'react'
import Link from 'next/link'
import { pages } from './mock'
import { conversionPage, conversionTitlePage } from '../../utils/functions/conversionPage'
import { Title } from '../';
const avatar = '/img/avatar.webp';

type HeaderProps = {
  page?: 'about' | 'works' | 'activities' | 'idea' | 'default';
}

const Header = ({ page = 'default' }: HeaderProps) => {
  const [hovered, setHovered] = useState<string>('')
  return(
    <>
      <S.Header>
        <S.Content>
          <S.Banks>
            <Link href="/" passHref>
              <Image src={avatar} alt="twobanks" placeholder="blur" blurDataURL={avatar} height={60} width={60} />
            </Link>
          </S.Banks>
          {page !== 'default' && (
            <S.Nav>
              {pages.map(page => {
                const path = `/${page}`
                const isHovered = hovered === page
                return(
                  <li key={page}>
                    <Link href={path} passHref>
                      <S.NavContainer
                          onHoverStart={() => setHovered(page)}
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
                          {conversionPage(page)}
                        </S.NavContainer>
                    </Link>
                  </li>
                )
              })}
            </S.Nav>
          )}
        </S.Content>
        <Title text={conversionTitlePage(page)} page={page} />
      </S.Header>
    </>
  )
}

export default Header
