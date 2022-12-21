import { v4 as uuid} from 'uuid';
import images from '../../images';

type ItemsProps = {
  id: string;
  name: string;
  url: string;
  icon: string;
  iconAnimated: string;
}

export const menuItems: ItemsProps[] = [
  {
    id: uuid(),
    name: 'home',
    url: '/',
    icon: images.home,
    iconAnimated: images.homeAnimated,
  },
  {
    id: uuid(),
    name: 'sobre',
    url: '/about',
    icon: images.avatar,
    iconAnimated: images.avatarAnimated,
  },
  {
    id: uuid(),
    name: 'atividades',
    url: '/activities',
    icon: images.activities,
    iconAnimated: images.activitiesAnimated,
  },
  {
    id: uuid(),
    name: 'trampos',
    url: '/works',
    icon: images.code,
    iconAnimated: images.codeAnimated,
  },
  {
    id: uuid(),
    name: 'blog',
    url: '/idea',
    icon: images.article,
    iconAnimated: images.articleAnimated,
  },
]
