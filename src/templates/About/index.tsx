import Image from 'next/image'
import { v4 as uuid } from 'uuid'
import * as S from './styled'
import { SectionAbout, SectionAcademic, SectionExperience } from '../../types/strapi'
import { getImageUrl } from '../../utils/functions/getImageUrl';
import { conversionStack } from '../../utils/functions/conversionStack';

type AboutProps = {
  about: SectionAbout;
  academic: SectionAcademic;
  experiences: SectionExperience[];
}

const About = ({ experiences, academic, about }: AboutProps) => {
  const { image: { data: { attributes: { url } }}} = about;
  return (
    <>
      <S.Content>
        <S.Bio>
          <S.ImageWrapper>
            <Image src={getImageUrl(url)} alt="twobanks" height={350} width={350} objectFit="cover" placeholder="blur" blurDataURL={getImageUrl(url)} />
          </S.ImageWrapper>
          <S.About>
            {about.description}
          </S.About>
        </S.Bio>
        <S.Career>
          <h3>Experiências</h3>
          <ul>
            {experiences.map(item => {
              const { role, name_company, url_company, city_company, period, tech } = item;
              const current = name_company === 'Bornlogic';
              return (
                <li key={name_company}>
                  <S.Occupation>{role}</S.Occupation>
                    <S.Company current={current}>
                      <a href={url_company}>{name_company}</a> - <em>{city_company}</em>
                    </S.Company>
                    <S.Date>
                      {period}
                    </S.Date>
                  <S.Stacks>
                    {tech?.map(item => <span key={uuid()}>{conversionStack(item.name)}</span>)}
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
