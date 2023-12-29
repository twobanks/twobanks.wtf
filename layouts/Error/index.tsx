import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { header } from '@/public/content';
import * as S from './styled';

const Error = () => {
  const [hovered, setHovered] = useState<string>('');
  return (
    <S.Content>
      <S.Hantaro aria-label="Orange and tan hamster running in a metal wheel" role="img">
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </S.Hantaro>
      <div className='text_content'>
        <h2>uaaaaai .... peraê!</h2>
        <div>
          <strong>Ocorreu algum erro!</strong>
        </div>
        <ul>
          {header.menu.map(page => {
            const path = `/${page.url}`
            const isHovered = hovered === page.name
            return (
              <Link href={path} passHref key={page.name}>
                <S.NavContainer
                  title={page.name}
                  onMouseEnter={() => setHovered(page.name)}
                  onMouseLeave={() => setHovered('')}
                >
                    <Image src={isHovered ? page.iconAnimated : page.icon}  alt={page.name} height={20} width={20} blurDataURL={isHovered ? page.iconAnimated : page.icon} priority quality={100}/>
                    {page.name}
                </S.NavContainer>
              </Link>
            )
          })}
        </ul>
      </div>
    </S.Content>
  )
}

export default Error;
