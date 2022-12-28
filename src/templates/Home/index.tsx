
import { useState } from 'react';
import Wrapper from '../Wrapper';
import Link from 'next/link'
import { conversionPage } from '../../utils/functions/conversionPage';
import { Icon } from '../../components';
import images from '../../images';
import * as S from './styled';
import { HomeProps } from '../../types/strapi';

const Home = ({ attributes }: HomeProps) => {
  const { header } = attributes;
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
    <Wrapper page="home" header={header}>
      <S.Content>
        {header.menu.map(page => {
          const path = `/${page.url}`;
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
    </Wrapper>
  )
}

export default Home;
