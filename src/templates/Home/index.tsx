
import { useState } from 'react';
import Link from 'next/link'
import { conversionPage } from '../../utils/functions/conversionPage';
import { Icon } from '../../components';
import images from '../../images';
import * as S from './styled';
import { HeaderPropsStrapiProps } from '../../types/strapi';

const Home = ({ body }: { body: HeaderPropsStrapiProps; }) => {
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
      {body.menu.map(page => {
        const path = page.name;
        const isHovered = hovered === page.name;
        const icon = page.name === 'activities' ? icons[page.name] : icons['default'];
        return(
          <Link href={path} passHref key={page.url}>
            <S.Item page={page.name} onMouseEnter={() => setHovered(page.name)} onMouseLeave={() => setHovered('')}>
              <Icon src={isHovered ? icon.animation : icon.static} />
              {conversionPage(page.name)}
            </S.Item>
          </Link>
        )
      })}
    </S.Content>
  )
}

export default Home;
