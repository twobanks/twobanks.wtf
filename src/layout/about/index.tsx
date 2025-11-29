'use client';

import * as S from './styles'

export default function About() {
  return (
    <S.Container>
      <S.GlassCard>
        <S.PageTitle>sobre mim</S.PageTitle>
        <S.TextContent>
          <p>
            E aí, tranquilo? Eu sou o <strong>TwoBanks</strong>.
          </p>
          <p>
            Sou um desenvolvedor apaixonado por criar experiências digitais que misturam 
            <strong> arte urbana</strong>, tecnologia e interatividade. Acredito que a web 
            não precisa ser apenas funcional, ela pode ter personalidade, estilo e vida.
          </p>
          <p>
            Meu trabalho é transformar códigos em interfaces que as pessoas realmente gostem de usar.
            Seja navegando pelo espaço sideral ou explorando o caos da cidade, meu objetivo é 
            sempre entregar algo único.
          </p>
          <p>
            Atualmente estou focado em <strong>Next.js</strong>, React e explorar os limites do CSS criativo.
          </p>
        </S.TextContent>
      </S.GlassCard>
    </S.Container>
  );
}