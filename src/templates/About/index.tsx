import Image from 'next/image'
import { v4 as uuid } from 'uuid'
import * as S from './styled'
import { About } from '../../types/banks'
import images from '../../images';
import Link from 'next/link';

const About = ({ data }: { data: About }) => {
  const { experiences, academic } = data;
  return (
    <S.Content>
      <S.Bio>
        <S.ImageWrapper>
          <Image src={images.twobanks} alt="twobanks" height={350} width={350} objectFit="cover" placeholder="blur" blurDataURL={images.twobanks} priority />
        </S.ImageWrapper>
        <S.About>
          <p>Eaêêê!  Meu nome é <strong>Thiago</strong>, moro em Uberaba/MG e trabalho como Desenvolvedor, desde 2014. Atualmente, atuo como Desenvolvedor Front-End,  na <Link href="https://www.bornlogic.com/" target="_blank" rel="noreferrer">Bornlogic</Link>, onde, diariamente, desenvolvo utilizando as seguintes tecnologias: TypeScript, ReactJS, Styled Components ...</p>
          <p>No meu tempo livre, aproveito momentos com a minha esposa Tefa <em>❤</em> e meu cachorro Brown 🐶, pratico Trail Running e Mountain Bike, gosto de descobrir novos estilos musicais, também gosto de aprender sobre povos antigos  🛸, astronomia 🪐 e expandir meus conhecimentos sobre JavaScript e CSS.</p>
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
                    <Link href={url_company} target="_blank" rel="noreferrer">{name_company}</Link> - <em>{city_company}</em>
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
  )
}

export default About;
