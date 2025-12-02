'use client';

import { SteamLogoIcon, GameControllerIcon, Icon } from '@phosphor-icons/react';
import { games } from '@/utils/content/games';
import { Container, Content } from '@/components/Container';
import { PLATFORM_GAME } from '@/utils/enums';

import * as S from './styles';

export default function Games() {
  const platformIcons: Record<PLATFORM_GAME, Icon> = {
    [PLATFORM_GAME.STEAM]: SteamLogoIcon,
    [PLATFORM_GAME.PS4]: GameControllerIcon,
  };
  return (
    <Container size='md'>
      <Content>
        <S.List>
          {games.map(item => {
            const IconComponent = platformIcons[item.type as keyof typeof platformIcons];
            return (
              <li key={item.name}>
                <span>{IconComponent && <IconComponent alt={item.type} size={15} weight="fill" />} {item.name}</span>
              </li>
            )
          })}
        </S.List>
      </Content>
    </Container>
  );
}