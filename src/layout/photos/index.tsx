'use client';

import { Container, Content } from '@/components/Container';

import * as S from './styles';

export default function Photos() {
  return (
    <Container size='md'>
      <Content>
        <S.PageTitle>fotos</S.PageTitle>
      </Content>
    </Container>
  );
}