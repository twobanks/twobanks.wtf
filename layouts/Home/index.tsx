import images from '@/public';
import Image from 'next/image';
import * as S from './styled';
import { social } from '@/public/content';
import Link from 'next/link';
import { header } from '@/public/content';

const Home = () => {
  return (
    <S.Content>
      <div className="section_twobanks">
        <Image src={images.webp} alt='twobanks' title='o pai!' width={214} height={236} />
        <div className='info'>
          <h2>twobanks</h2>
          <ul>
            {header.menu.map(page => {
              const path = `/${page.url}`
              return page.name !== 'home' ? (
                <li key={page.name}>
                  <Link href={path} passHref>
                    {page.name}
                  </Link>
                </li>
              ) : null
            })}
          </ul>
          <S.SocialWrapper>
            {social.map(item => (
              <Link href={item.link} key={item.name} target="_blank" rel="noreferrer" passHref>
                <Image src={item.icon} alt={item.name} height={22.5} width={22.5} blurDataURL={item.icon} priority quality={100}/>
              </Link>
            ))}
          </S.SocialWrapper>
        </div>
      </div>
    </S.Content>
  )
}

export default Home;
