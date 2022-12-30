import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { Strava, Icon } from '../../components';
import { Activities } from '../../types/strava';
import * as S from './styled'

import images from '../../images';

const FIRST = 1;

type ActivitiesProps = {
  activities: Activities[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const ActivitiesTemplate = ({ activities, page, setPage }: ActivitiesProps) => {
  const [orientation, setOrientation] = useState<'ROW' | 'GRID'>('ROW');
  const [hovered, setHovered] = useState<'NEXT' | 'PREV' | 'ROW' | 'GRID' | ''>('');
  return (
    <S.Content>
      <S.Header>
        <S.ButtonWrapper>
          <S.Button onClick={() => setOrientation('GRID')} active={orientation === "GRID"} onMouseEnter={() => setHovered('GRID')} onMouseLeave={() => setHovered('')}>
            <Image src={hovered === 'GRID' ? images.gridAnimated : images.grid} height={20} width={20} alt="Ícone referente a 2 colunas, representando a visão de grid na página" />
          </S.Button>
          <S.Button onClick={() => setOrientation('ROW')} active={orientation === "ROW"} onMouseEnter={() => setHovered('ROW')} onMouseLeave={() => setHovered('')}>
            <Image src={hovered === 'ROW' ? images.rowAnimated : images.row} height={20} width={20} alt="Ícone referente a linha, representando a visão de linha na página" />
          </S.Button>
        </S.ButtonWrapper>
      </S.Header>
      <Strava activities={activities} orientation={orientation} />
      <S.WrapperPagination>
        <S.ButtonPage disabled={page === FIRST} onClick={() => setPage(page - FIRST)} onMouseEnter={() => setHovered('PREV')} onMouseLeave={() => setHovered('')}>
          <Icon src={hovered === 'PREV' ? images.arrowAnimated : images.arrow} rotate alt="Ícone referente a página anterior" />
        </S.ButtonPage>
        <S.ButtonPage onClick={() => setPage(page + FIRST)} onMouseEnter={() => setHovered('NEXT')} onMouseLeave={() => setHovered('')}>
          <Icon src={hovered === 'NEXT' ? images.arrowAnimated : images.arrow} alt="Ícone referente a próxima página" />
        </S.ButtonPage>
      </S.WrapperPagination>
    </S.Content>
  )
}

export default ActivitiesTemplate;
