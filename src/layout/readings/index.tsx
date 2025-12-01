'use client';

import { Container, Content } from '@/components/Container';

import * as S from './styles';

export default function Readings() {
  return (
    <Container size='md'>
      <Content>
        <S.PageTitle>leituras</S.PageTitle>
      </Content>
    </Container>
  );
}