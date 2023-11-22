import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { Works  as WorksType} from '@/types/banks';
import * as S from './styled'

const Works = ({ works }: { works: WorksType[] }) => (
  <S.Container>
    {works.map((work, index) => {
      const { name, type, link, tech, company } = work;
      return (
        <S.Work key={`work-${index}`}>
          <div className='header_work'>
            <Link href={link} target="_blank" rel="noreferrer">
              <strong>{name}</strong>
            </Link>
            <S.Company>
              <Link href={company.link} target="_blank" rel="noreferrer">
                {company.name}
              </Link> • <em>{type}</em>
            </S.Company>
          </div>
          <S.Stack>
            {tech.map(language => <S.Item key={uuid()} $stack={language}>{language}</S.Item>)}
          </S.Stack>
        </S.Work>
      )
    })}
  </S.Container>
)

export default Works;
