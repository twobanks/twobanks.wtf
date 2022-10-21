import Image from 'next/image';
import * as S from './styles'
import { useState } from 'react'
import Link from 'next/link'
import { pages } from './mock'
import { conversionPage } from '../../utils/functions/conversionPage'
const avatar = '/img/avatar.webp';

const Header = () => {
  const [hovered, setHovered] = useState<string>('')
  return(
    <S.Header>
      <S.Content>
        <S.Banks>
          <Link href="/" passHref>
            <Image src={avatar} alt="twobanks" placeholder="blur" blurDataURL={avatar} height={60} width={60} />
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
      </S.Content>
    </S.Header>
  )
}

export default Header
