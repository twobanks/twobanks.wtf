/* eslint-disable @next/next/no-img-element */
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { Strava } from '../../components';
import { Activities } from '../../types/strava';
import Wrapper from '../Wrapper';
import * as S from './styled'

const row = '/icon/row.svg';
const grid = '/icon/grid.svg';
const next = '/icon/next.svg';
const prev = '/icon/prev.svg';

const FIRST = 1;

type ActivitiesProps = {
  activities: Activities[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const ActivitiesTemplate = ({ activities, page, setPage }: ActivitiesProps) => {
  const [orientation, setOrientation] = useState<'ROW' | 'GRID'>('ROW');
  return (
    <Wrapper page='activities'>
      <S.Content>
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
        <S.WrapperPagination>
          <S.ButtonPage disabled={page === FIRST} onClick={() => setPage(page - FIRST)}>
            <img src={prev} alt="Ícone referente a página anterior" />
          </S.ButtonPage>
          <S.ButtonPage onClick={() => {setPage(page + FIRST)}}>
            <img src={next} alt="Ícone referente a próxima página" />
          </S.ButtonPage>
        </S.WrapperPagination>
      </S.Content>
    </Wrapper>
  )
}

export default ActivitiesTemplate;
