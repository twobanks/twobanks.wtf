/* eslint-disable @next/next/no-img-element */
import { v4 as uuid} from 'uuid';
import * as S from './styles'
import { useState } from 'react'
import Link from 'next/link'
import { pages } from './mock'
import { conversionPage } from '../../utils/functions/conversionPage'
const twobanks = '/img/twobanks.png';

const Header = () => {
  const [hovered, setHovered] = useState<string>('')
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
    </S.Header>
  )
}

export default Header
