'use client';

import { Container, Content } from '@/components/Container';

import * as S from './styles';

export default function Trips() {
  return (
    <Container size='md'>
      <Content>
        <S.PageTitle>viagens</S.PageTitle>
      </Content>
    </Container>
  );
}