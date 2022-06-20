
import Wrapper from '../Wrapper';
import { about } from './mock'
import * as S from './styled'

const About = () => (
  <Wrapper>
    <S.Content>
      <h2>sobre mim</h2>
      <S.Bio>
        <S.ImageWrapper>
          <S.Me image={about.image} />
        </S.ImageWrapper>
        <S.About>
         <p>Eaêêê!  Meu nome é <strong>Thiago</strong>, moro em Uberaba/MG e trabalho como Desenvolvedor Front-End, desde 2014.</p>
         <p>Atualmente, atuo como Desenvolvedor Front-End,  no <a href="https://harpoon.digital/">Harpoon</a>, onde, diariamente, desenvolvo utilizando as seguitens tecnologias: TypeScript, RreactJS, NextJS, Styled Components ...</p>
         <p>No meu tempo livre, aproveito momentos com a minha esposa Tefa <em>❤</em> e meu cachorro Brown 🐶, pratico mountain bike ou trail run, ouço rap/trap, viajo 🛸, procuro aprender sobre civilizações antigas e expandir meus conhecimentos sobre ReactJS e CSS, entre outras coisas que dispertem minha curiosidade e prazer em aprender, torço para o time do Cruzeiro, assisto NBA e jogo GTA.</p>
        </S.About>
      </S.Bio>
      <S.Career>
        <h3>Experiências</h3>
        <ul>
          {about.career.map(item => {
            const { company, occupation, link, city, uf, current, durationInMonths, startDate, departureDate, stacks } = item;
            return (
              <S.Experience key={company} current={current}>
                <S.Occupation>{occupation}</S.Occupation>
                  <S.Company>
                    <a href={link}>{company}</a> - <em>{city}, {uf}</em>
                  </S.Company>
                  <S.Date>
                    <span>{startDate} - {current ? 'até o momento' : departureDate}</span> - {durationInMonths}
                  </S.Date>
                <S.Stacks>{stacks}</S.Stacks>
              </S.Experience>
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
              <S.Academy key={period}>
                <S.Occupation>{institution}</S.Occupation>
                  <S.Company>
                    {college}
                  </S.Company>
                  <S.Date>
                    <span>{period}</span>
                  </S.Date>
              </S.Academy>
            )
          })}
        </ul>
      </S.Career>
      <S.Career course>
        <h3>Cursos</h3>
        <ul>
          {about.course.map(item => {
            const { name, description, link } = item;
            return (
              <S.Academy key={name}>
                <S.Occupation><a href={link}>{name}</a></S.Occupation>
                  <S.Company>
                    {description}
                  </S.Company>
              </S.Academy>
            )
          })}
        </ul>
      </S.Career>
    </S.Content>
  </Wrapper>
)

export default About;
