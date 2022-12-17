import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { Strava, Title } from '../../components';
import { Activities } from '../../types/strava';
import Wrapper from '../Wrapper';
import * as S from './styled'

const row = '/icon/row.svg';
const grid = '/icon/grid.svg';

type ActivitiesProps = {
  activities: Activities[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const ActivitiesTemplate = ({ activities, page, setPage }: ActivitiesProps) => {
  const [orientation, setOrientation] = useState<'ROW' | 'GRID'>('ROW');
  return (
    <Wrapper>
      <S.Content>
        <Title text='atividades' page='activities' />
        <S.Header>
          <S.ButtonWrapper>
            <S.Button onClick={() => setOrientation('GRID')} active={orientation === "GRID"}>
              <Image src={grid} height={20} width={20} alt="Ícone referente a 2 colunas, representando a visão de grid na página" />
            </S.Button>
            <S.Button onClick={() => setOrientation('ROW')} active={orientation === "ROW"}>
              <Image src={row} height={20} width={20} alt="Ícone referente a linha, representando a visão de linha na página" />
            </S.Button>
          </S.ButtonWrapper>
        </S.Header>
        <Strava activities={activities} orientation={orientation} />
        <button disabled={page === 1} onClick={() => setPage(page--)}>voltar</button>
        <button onClick={() => setPage(page++)}>próximo</button>
      </S.Content>
    </Wrapper>
  )
}

export default ActivitiesTemplate;
