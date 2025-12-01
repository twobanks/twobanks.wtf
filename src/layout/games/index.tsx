'use client';

import { Container, Content } from '@/components/Container';

import * as S from './styles';

export default function Games() {
  return (
    <Container size='md'>
      <Content>
        <S.PageTitle>games</S.PageTitle>
      </Content>
    </Container>
  );
}