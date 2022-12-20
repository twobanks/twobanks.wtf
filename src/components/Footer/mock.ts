import { v4 as uuid} from 'uuid';

const home = '/icon/home.svg';
const article = '/icon/article.svg';
const activities = '/icon/activities.svg';
const book = '/icon/book.svg';
const code = '/icon/code.svg';

type ItemsProps = {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export const menuItems: ItemsProps[] = [
  {
    id: uuid(),
    name: 'home',
    url: '/',
    icon: home,
  },
  {
    id: uuid(),
    name: 'sobre',
    url: '/about',
    icon: book,
  },
  {
    id: uuid(),
    name: 'atividades',
    url: '/activities',
    icon: activities,
  },
  {
    id: uuid(),
    name: 'trampos',
    url: '/works',
    icon: code,
  },
  {
    id: uuid(),
    name: 'blog',
    url: '/idea',
    icon: article,
  },
]
