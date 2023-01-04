import Image from 'next/image'
import { v4 as uuid } from 'uuid'
import * as S from './styled'
import { About } from '../../types/banks'

const About = ({ data }: { data: About }) => {
  const { about, experiences, academic } = data;
  return (
    <>
      <S.Content>
        <S.Bio>
          <S.ImageWrapper>
            <Image src={about.image} alt="twobanks" height={350} width={350} objectFit="cover" placeholder="blur" blurDataURL={about.image} priority />
          </S.ImageWrapper>
          <S.About>
            {about.description}
          </S.About>
        </S.Bio>
        <S.Career>
          <h3>Experiências</h3>
          <ul>
            {experiences.map(item => {
              const { current, role, name_company, url_company, city_company, period, tech } = item;
              return (
                <li key={name_company}>
                  <S.Occupation>{role}</S.Occupation>
                    <S.Company current={current}>
                      <a href={url_company}>{name_company}</a> - <em>{city_company}</em>
                    </S.Company>
                    <S.Date>{period}</S.Date>
                  <S.Stacks>
                    {tech?.map(item => <span key={uuid()}>{item}</span>)}
                  </S.Stacks>
                </li>
              )
            })}
          </ul>
        </S.Career>
        <S.Career>
          <h3>Formação acadêmica</h3>
          <ul>
            <li>
              <S.Occupation>{academic.local}</S.Occupation>
                <S.Company>
                  {academic.course}
                </S.Company>
                <S.Date>
                  <span>{academic.period}</span>
                </S.Date>
            </li>
          </ul>
        </S.Career>
      </S.Content>
    </>
  )
}

export default About;
