import Image from 'next/image';
import * as S from './styles'
import { useState } from 'react'
import Link from 'next/link'
import { pages } from './mock'
import { conversionPage, conversionTitlePage } from '../../utils/functions/conversionPage'
import { Title } from '../';
import { HeaderPropsStrapiProps } from '../../types/strapi';
import { getImageUrl } from '../../utils/functions/getImageUrl';
const avatar = '/img/avatar.webp';

type HeaderProps = {
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
  header: HeaderPropsStrapiProps;
}

const Header = ({ page = 'home', header }: HeaderProps) => {
  const { logo: { data: { attributes: image }} } = header;
  const [hovered, setHovered] = useState<string>('')
  return(
    <>
      <S.Header page={page}>
        <S.Content page={page}>
          <S.Banks>
            <Link href="#" passHref>
              <Image src={getImageUrl(image.url)} alt="twobanks" placeholder="blur" blurDataURL={getImageUrl(image.url)} height={60} width={60} />
            </Link>
          </S.Banks>
          {page !== 'home' && (
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
