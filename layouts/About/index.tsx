import Link from 'next/link';
import { v4 as uuid } from 'uuid'
import { About as AboutType } from '@/types/banks'
import * as S from './styled'
import images from '@/public';
import Image from 'next/image';
import { social } from '@/public/content';

const About = ({ data }: { data: AboutType }) => {
  const { experiences, academic } = data;
  return (
    <S.Content>
      <S.About>
        <h2>Salveee 🏹</h2>
        <div className='content_about'>
          <section>
            <p>Meu nome é <strong title='o pai!'>Thiago</strong>, vulgo: <span>twobanks, rasta, petildo, zui</span>. Nasci em <strong>Brasília de Minas</strong><span>(norte de minas)</span>, porém, cresci e vivo em <strong title='capital do Triângulo Mineiro'>Uberaba, Minas Gerais</strong>. Trabalho como <strong title='Desenvolvedor Front-End'>Desenvolvedor Front-End</strong> e treino para <strong>ultramaratonas</strong> nas horas vagas. </p>
            <p>Com mais de <strong>9 anos de experiência</strong>  na área de desenvolvimento 💻, tenho sólida formação em <strong title='JavaScript'>JavaScript</strong>, <strong title='TypeScript'>TypeScript</strong>, <strong title='ReactJS'>ReactJS</strong>, <strong title='NextJS'>NextJS</strong>, <strong>CSS</strong>(<strong title='Tailwind CSS'>Tailwind CSS</strong>, <strong title='Styled Components'>Styled Components</strong>).</p>
            <p>Acredito em escrever código limpo, legível e de fácil manutenção 🛠️. Gosto de trabalhar em projetos desafiadores 💡, aprender e aprimorar continuamente minhas habilidades 📚.</p>
            <p>No meu tempo livre, curto momentos com minha esposa <strong title='@stephaniemontandon'>Tefa</strong> 👫 e meu cachorro <strong title='bebê Brown'>Brown</strong> 🐶. Pratico <strong title='mountain bike'>mountain bike</strong> 🚵‍♂️ e, quase sempre, estou na trilha, praticando <strong title='trail running'>trail running</strong> 🏃. Estou sempre ouvindo música <span>(preferencialmente rap)</span>🎧, torço pelo time do <strong title='MAIOR DE MINAS ✋✌'>Cruzeiro</strong>🦊, assisto a <strong>NBA</strong> 🏀 e, atualmente, jogo <strong title='Battlefield V'>Battlefield V</strong>.</p>
          </section>
          <S.PicAndSocial>
            <S.ImageWrapper>
              <Image src={images.thiago} alt='twobanks' title='o pai!' fill blurDataURL={images.thiago} priority quality={100} />
            </S.ImageWrapper>
            <S.SocialWrapper>
              {social.map(item => (
                <Link href={item.link} key={item.name} target="_blank" rel="noreferrer" passHref>
                  <Image src={item.icon} alt={item.name} height={20} width={20} blurDataURL={item.icon} priority quality={100}/>
                </Link>
              ))}
            </S.SocialWrapper>
          </S.PicAndSocial>
        </div>
      </S.About>
      <S.Career>
        <h2 title='Experiências'>Experiências</h2>
        <ul>
          {experiences.map(item => {
            const { role, name_company, url_company, city_company, period, tech, description } = item;
            return (
              <S.Experience key={uuid()}>
                <S.Header>
                  <strong title={role}>{role}</strong>
                  <S.Company>
                    <div>
                      <Link href={url_company} target="_blank" rel="noreferrer" title={name_company}>
                        {name_company}
                      </Link><em title={city_company}> - {city_company}</em>
                    </div>
                    <p title={period}>{period}</p>
                  </S.Company>
                </S.Header>
                <S.Skills>
                  <h4 title="Competências">Competências</h4>
                  <ul>
                    {description.map(item => <li key={uuid()} title={item}>{item}</li>)}
                  </ul>
                </S.Skills>
                <S.Stacks>
                  <h4 title='Tecnologias'>Tecnologias</h4>
                  <ul>
                    {tech?.map(item => <li key={uuid()} title={item}>{item}</li>)}
                  </ul>
                </S.Stacks>
              </S.Experience>
            )
          })}
        </ul>
      </S.Career>
      <S.Career>
        <h2 title='Formação acadêmica'>Formação acadêmica</h2>
        <S.AcademicEducation>
          <Link href={academic.url} target="_blank" rel="noreferrer" title={academic.course}>{academic.course}</Link>
          <p title={academic.local}>{academic.local}</p>
          <p title={academic.period}>{academic.period}</p>
        </S.AcademicEducation>
      </S.Career>
    </S.Content>
  )
}

export default About;
