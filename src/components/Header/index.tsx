import Image from 'next/image';
import * as S from './styles'
import { useState } from 'react'
import Link from 'next/link'
import { pages } from './mock'
import { conversionPage, conversionTitlePage } from '../../utils/functions/conversionPage'
import { Title } from '../';
import { HeaderPropsStrapiProps } from '../../types/strapi';
import { getImageUrl } from '../../utils/functions/getImageUrl';

type HeaderProps = {
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
  menu: HeaderPropsStrapiProps;
}

const Header = ({ page = 'home', menu }: HeaderProps) => {
  const { logo: { data: { attributes: image }} } = menu;
  const [hovered, setHovered] = useState<string>('')
  return(
    <S.Header page={page}>
      <S.Content page={page}>
        <S.Banks page={page}>
          <Link href={`/`} passHref prefetch={false}>
            <Image src={getImageUrl(image.url)} alt="twobanks" blurDataURL={getImageUrl(image.url)} layout="fill" />
          </Link>
        </S.Banks>
        {page !== 'home' && (
          <S.Nav>
            {pages.map(page => {
              const path = page;
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
  )
}

export default Header
