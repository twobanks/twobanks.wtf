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
  const [hovered, setHovered] = useState<'NEXT' | 'PREV' | ''>('');
  return (
    <S.Content>
      <Strava activities={activities} />
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
