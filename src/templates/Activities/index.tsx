import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { Strava, Icon } from '../../components';
import { Activities } from '../../types/strava';
import Wrapper from '../Wrapper';
import * as S from './styled'

const arrow = '/icon/animation/arrow.svg';
const arrowAnimated = '/icon/animation/arrow-animated.webp';

const grid = '/icon/animation/grid.svg';
const gridAnimated = '/icon/animation/grid-animated.webp';

const row = '/icon/animation/row.svg';
const rowAnimated = '/icon/animation/row-animated.webp';

const FIRST = 1;

type ActivitiesProps = {
  activities: Activities[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const ActivitiesTemplate = ({ activities, page, setPage }: ActivitiesProps) => {
  const [orientation, setOrientation] = useState<'ROW' | 'GRID'>('ROW');
  const [hovered, setHovered] = useState<string>('');
  return (
    <Wrapper page='activities'>
      <S.Content>
        <S.Header>
          <S.ButtonWrapper>
            <S.Button onClick={() => setOrientation('GRID')} active={orientation === "GRID"} onMouseEnter={() => setHovered('GRID')} onMouseLeave={() => setHovered('')}>
              <Image src={hovered === 'GRID' ? gridAnimated : grid} height={20} width={20} alt="Ícone referente a 2 colunas, representando a visão de grid na página" />
            </S.Button>
            <S.Button onClick={() => setOrientation('ROW')} active={orientation === "ROW"} onMouseEnter={() => setHovered('ROW')} onMouseLeave={() => setHovered('')}>
              <Image src={hovered === 'ROW' ? rowAnimated : row} height={20} width={20} alt="Ícone referente a linha, representando a visão de linha na página" />
            </S.Button>
          </S.ButtonWrapper>
        </S.Header>
        <Strava activities={activities} orientation={orientation} />
        <S.WrapperPagination>
          <S.ButtonPage disabled={page === FIRST} onClick={() => setPage(page - FIRST)} onMouseEnter={() => setHovered('prev')} onMouseLeave={() => setHovered('')}>
            <Icon src={hovered === 'prev' ? arrowAnimated : arrow} rotate alt="Ícone referente a página anterior" />
          </S.ButtonPage>
          <S.ButtonPage onClick={() => setPage(page + FIRST)} onMouseEnter={() => setHovered('next')} onMouseLeave={() => setHovered('')}>
            <Icon src={hovered === 'next' ? arrowAnimated : arrow} alt="Ícone referente a próxima página" />
          </S.ButtonPage>
        </S.WrapperPagination>
      </S.Content>
    </Wrapper>
  )
}

export default ActivitiesTemplate;
