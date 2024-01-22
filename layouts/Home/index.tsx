import images from '@/public';
import Image from 'next/image';
import * as S from './styled';
import Link from 'next/link';
import { header } from '@/public/content';
import { useState } from 'react';

const Home = () => {
  const [hovered, setHovered] = useState<string>('');
  return (
    <S.Content>
      <div className="section_twobanks">
        <Image src={images.webp} alt='twobanks' title='o pai!' className='two_me' width={184} height={206} />
        <div className='info'>
          <h2>twobanks</h2>
          <ul>
            {header.menu.map(page => {
              const path = `/${page.url}`
              const isHovered = hovered === page.name
              return page.name !== 'home' ? (
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
              ): null
            })}
          </ul>
        </div>
      </div>
    </S.Content>
  )
}

export default Home;
