import Link from 'next/link';
import { v4 as uuid } from 'uuid'
import { About as AboutType } from '@/types/banks'
import * as S from './styled'

const About = ({ data }: { data: AboutType }) => {
  const { experiences, academic } = data;
  return (
    <S.Content>
      <S.About>
        <p>Meu nome é <strong>Thiago</strong>, moro em Uberaba/MG e trabalho como Desenvolvedor, desde 2014. Atualmente, atuo como <strong>Desenvolvedor Front-End</strong>, onde, diariamente, desenvolvo utilizando as seguintes tecnologias: <strong>TypeScript</strong>, <strong>ReactJS</strong>, <strong>NextJS</strong>, <strong>Tailwind CSS</strong>, <strong>Styled Components</strong> ...</p>
        <p>No meu tempo livre, aproveito momentos com a minha esposa <strong>Tefa</strong> <em>❤</em> e meu cachorro <strong>Brown</strong> 🐶, pratico <strong>Trail Running</strong> e <strong>Mountain Bike</strong>, gosto de descobrir novos estilos musicais, também gosto de aprender sobre povos antigos  🛸, astronomia 🪐, fotografia e expandir meus conhecimentos sobre JavaScript e CSS.</p>
      </S.About>
      <S.Career>
        <h2>Experiências</h2>
        <ul>
          {experiences.map(item => {
            const { role, name_company, url_company, city_company, period, tech, description } = item;
            return (
              <S.Experience key={uuid()}>
                <S.Header>
                  <strong>{role}</strong>
                  <S.Company>
                    <div>
                      <Link href={url_company} target="_blank" rel="noreferrer">
                        {name_company}
                      </Link><em> - {city_company}</em>
                    </div>
                    <p>{period}</p>
                  </S.Company>
                </S.Header>
                <S.Skills>
                  <h4>Competências</h4>
                  <ul>
                    {description.map(item => <li key={uuid()}>{item}</li>)}
                  </ul>
                </S.Skills>
                <S.Stacks>
                  <h4>Tecnologias</h4>
                  <ul>
                    {tech?.map(item => <li key={uuid()}>{item}</li>)}
                  </ul>
                </S.Stacks>
              </S.Experience>
            )
          })}
        </ul>
      </S.Career>
      <S.Career>
        <h2>Formação acadêmica</h2>
        <S.AcademicEducation>
          <Link href={academic.url} target="_blank" rel="noreferrer">{academic.course}</Link>
          <p>{academic.local}</p>
          <p>{academic.period}</p>
        </S.AcademicEducation>
      </S.Career>
    </S.Content>
  )
}

export default About;
