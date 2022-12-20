
import Icon from '../Icon';
import * as S from './styled'
import Link from 'next/link';
import { menuItems } from './mock'

const Footer = () => {
  return (
    <S.Footer>
      {menuItems.map(item => (
        <Link href={item.url} passHref key={item.id}>
          <li>
            <Icon src={item.icon} alt={item.name} />
          </li>
        </Link>
      ))}
    </S.Footer>
  )
}

export default Footer
