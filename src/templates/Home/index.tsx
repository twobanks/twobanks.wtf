
import { useState } from 'react';
import Link from 'next/link'
import { Icon } from '../../components';
import images from '../../images';
import { header } from '../../../public/content';

import * as S from './styled';

const Home = () => {
  const [hovered, setHovered] = useState<string>('');
  const icons = {
    ['default']: {
      static: images.folder,
      animation: images.folderAnimated
    },
    ['activities']: {
      static: images.folderActivity,
      animation: images.folderActivityAnimated
    },
  }
  return (
    <S.Content>
      {header.menu.map(page => {
        const path = `/${page.url}`
        const isHovered = hovered === page.name;
        const icon = page.url === 'activities' ? icons[page.url] : icons['default'];
        if(page.name !== 'home') {
          return(
            <Link href={path} passHref key={page.name}>
              <S.Item page={page.url} onMouseEnter={() => setHovered(page.name)} onMouseLeave={() => setHovered('')}>
                <Icon src={isHovered ? icon.animation : icon.static} />
                {page.name}
              </S.Item>
            </Link>
          )
        }
      })}
    </S.Content>
  )
}

export default Home;
