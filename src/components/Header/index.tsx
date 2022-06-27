/* eslint-disable @next/next/no-img-element */
import { v4 as uuid} from 'uuid';
import * as S from './styles'
import { useState } from 'react'
import Link from 'next/link'
import { pages } from './mock'
import { conversionPage } from '../../utils/functions/conversionPage'
const twobanks = '/img/twobanks.png';

type TestProps = {
  [key: string]: string[],
  }

const Header = () => {
  const [hovered, setHovered] = useState<string>('')

  const subMenu: TestProps = {
    'works': [ 'about', 'works', 'repo'],
    'lifestyle': ['activities',  'musics', ],
  };

  return(
    <S.Header>
      <S.Banks>
        <Link href="/" passHref>
          <img src={twobanks} alt="twobanks" />
        </Link>
      </S.Banks>
      <S.Nav>
        {pages.map(page => {
          const path = `/${page}`
          const isHovered = hovered === page
          return(
            <li key={page}>
              <Link href={page !== 'idea' ? '' : path} passHref>
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
                    {page !== 'idea' && isHovered && (
                      <S.DropDown
                        layoutId="sub-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 1.5 }, }}
                        exit={{ opacity: 0 }}
                      >
                        {subMenu[hovered]?.map((item) => {
                          return (
                            <li key={uuid()}>
                              {item}
                            </li>
                          )
                        })}
                    </S.DropDown>
                    )}
                    {conversionPage(page)}
                  </S.NavContainer>
              </Link>
            </li>
          )
        })}
      </S.Nav>
    </S.Header>
  )
}

export default Header
