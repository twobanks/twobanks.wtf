import { v4 as uuid} from 'uuid';

const home = '/icon/animation/home.svg';
const article = '/icon/animation/article.svg';
const activities = '/icon/animation/activities.svg';
const book = '/icon/animation/book.svg';
const code = '/icon/animation/code.svg';
const homeAnimated = '/icon/animation/home-animated.webp';
const articleAnimated = '/icon/animation/article-animated.webp';
const activitiesAnimated = '/icon/animation/activities-animated.webp';
const bookAnimated = '/icon/animation/book-animated.webp';
const codeAnimated = '/icon/animation/code-animated.webp';

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
    icon: home,
    iconAnimated: homeAnimated,
  },
  {
    id: uuid(),
    name: 'sobre',
    url: '/about',
    icon: book,
    iconAnimated: bookAnimated,
  },
  {
    id: uuid(),
    name: 'atividades',
    url: '/activities',
    icon: activities,
    iconAnimated: activitiesAnimated,
  },
  {
    id: uuid(),
    name: 'trampos',
    url: '/works',
    icon: code,
    iconAnimated: codeAnimated,
  },
  {
    id: uuid(),
    name: 'blog',
    url: '/idea',
    icon: article,
    iconAnimated: articleAnimated,
  },
]
