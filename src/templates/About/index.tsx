import { Title } from '../../components'
import Image from 'next/image'
import Wrapper from '../Wrapper'
import { about } from './mock'
import * as S from './styled'

const About = () => (
  <Wrapper>
    <S.Content>
      <Title text='sobre' page='about' />
      <S.Bio>
        <S.ImageWrapper>
          <Image src={about.image} alt="twobanks" height={350} width={350} objectFit="cover" placeholder="blur" blurDataURL={about.image} />
        </S.ImageWrapper>
        <S.About>
         <p>Eaêêê!  Meu nome é <strong>Thiago</strong>, moro em Uberaba/MG e trabalho como Desenvolvedor Front-End, desde 2014.</p>
         <p>Atualmente, atuo como Desenvolvedor Front-End,  na <a href="https://www.bornlogic.com/">Bornlogic</a>, onde, diariamente, desenvolvo utilizando as seguintes tecnologias: TypeScript, ReactJS, Styled Components ...</p>
         <p>No meu tempo livre, aproveito momentos com a minha esposa Tefa <em>❤</em> e meu cachorro Brown 🐶, pratico Trail Running e Mountain Bike, ouço bastante música (principalmente RAP), viajo 🛸, procuro aprender sobre povos antigos e expandir meus conhecimentos sobre ReactJS e CSS, entre outras coisas que dispertem minha curiosidade e prazer em aprender, torço para o time do Cruzeiro, assisto NBA e jogo GTA.</p>
        </S.About>
      </S.Bio>
      <S.Career>
        <h3>Experiências</h3>
        <ul>
          {about.career.map(item => {
            const { company, occupation, link, city, uf, current, durationInMonths, startDate, departureDate, stacks } = item;
            return (
              <li key={company}>
                <S.Occupation>{occupation}</S.Occupation>
                  <S.Company current={current}>
                    <a href={link}>{company}</a> - <em>{city}, {uf}</em>
                  </S.Company>
                  <S.Date>
                    <span>{startDate} - {current ? 'até o momento' : departureDate}</span> {durationInMonths ? `- ${durationInMonths}` : null}
                  </S.Date>
                <S.Stacks>{stacks}</S.Stacks>
              </li>
            )
          })}
        </ul>
      </S.Career>
      <S.Career>
        <h3>Formação acadêmica</h3>
        <ul>
          {about.academy.map(item => {
            const { college, institution, period } = item;
            return (
              <li key={period}>
                <S.Occupation>{institution}</S.Occupation>
                  <S.Company>
                    {college}
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
  </Wrapper>
)

export default About;
