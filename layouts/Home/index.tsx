import images from '@/public';
import Image from 'next/image';
import * as S from './styled';
/* import { social } from '@/public/content'; */
import Link from 'next/link';
import { header } from '@/public/content';
import { useState } from 'react';

const Home = () => {
  const [hovered, setHovered] = useState<string>('');
  return (
    <S.Content>
      <div className="section_twobanks">
        <Image src={images.webp} alt='twobanks' title='o pai!' width={214} height={236} />
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
          {/* <S.SocialWrapper>
            {social.map(item => (
              <Link href={item.link} key={item.name} target="_blank" rel="noreferrer" passHref>
                <Image src={item.icon} alt={item.name} height={20} width={20} blurDataURL={item.icon} priority quality={100}/>
              </Link>
            ))}
          </S.SocialWrapper> */}
        </div>
      </div>
    </S.Content>
  )
}

export default Home;
