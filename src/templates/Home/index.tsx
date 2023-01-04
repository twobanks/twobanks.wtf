
import { useState } from 'react';
import Link from 'next/link'
import { conversionPage } from '../../utils/functions/conversionPage';
import { Icon } from '../../components';
import images from '../../images';
import { menu } from './../../data/menu';
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
      {menu.map(page => {
        const path = page;
        const isHovered = hovered === page;
        const icon = page === 'activities' ? icons[page] : icons['default'];
        return(
          <Link href={path} passHref key={page}>
            <S.Item page={page} onMouseEnter={() => setHovered(page)} onMouseLeave={() => setHovered('')}>
              <Icon src={isHovered ? icon.animation : icon.static} />
              {conversionPage(page)}
            </S.Item>
          </Link>
        )
      })}
    </S.Content>
  )
}

export default Home;
