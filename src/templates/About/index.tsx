import Image from 'next/image'
import * as S from './styled'
import { SectionAbout, SectionAcademic, SectionExperience } from '../../types/strapi'
import { getImageUrl } from '../../utils/functions/getImageUrl';

type AboutProps = {
  sectionAbout: SectionAbout;
  sectionAcademic: SectionAcademic;
  sectionExperience: SectionExperience;
}

const About = ({ sectionExperience, sectionAcademic, sectionAbout }: AboutProps) => {
  const { image: { data: { attributes: { url } }}} = sectionAbout;
  return (
    <>
      <S.Content>
        <S.Bio>
          <S.ImageWrapper>
            <Image src={getImageUrl(url)} alt="twobanks" height={350} width={350} objectFit="cover" placeholder="blur" blurDataURL={getImageUrl(url)} />
          </S.ImageWrapper>
          <S.About>
            {sectionAbout.description}
          </S.About>
        </S.Bio>
        <S.Career>
          <h3>{sectionExperience.title.title}</h3>
          <ul>
            {sectionExperience.experiences.map(item => {
              const { role, name_company, url_company, city_company, period, stack } = item;
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
                  <S.Stacks>{stack}</S.Stacks>
                </li>
              )
            })}
          </ul>
        </S.Career>
        <S.Career>
          <h3>{sectionAcademic.title.title}</h3>
          <ul>
            {sectionAcademic.academic.map(item => {
              const { course, local, period } = item;
              return (
                <li key={period}>
                  <S.Occupation>{local}</S.Occupation>
                    <S.Company>
                      {course}
                    </S.Company>
                    <S.Date>
                      <span>{period}</span>
                    </S.Date>
                </li>
              )
            })}
          </ul>
        </S.Career>
      </S.Content>
    </>
  )
}

export default About;
