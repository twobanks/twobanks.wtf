import { TabsProps } from '@/utils/types/component';

import * as S from './styles';

export default function Tabs<T extends string>({ pillStyle, activeTab, activeTabRef, setActiveTab, dados }: TabsProps<T>) {
  return (
    <S.TabContainer>
      <S.ActivePill $left={pillStyle.left} $width={pillStyle.width} $opacity={pillStyle.opacity} />
      {dados.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <S.TabButton key={tab.id} ref={isActive ? activeTabRef : null} onClick={() => setActiveTab(tab.id)} $active={isActive} type="button">
            {Icon && <Icon weight={isActive ? 'fill' : 'regular'} />}
            {tab.label}
          </S.TabButton>
        );
      })}
    </S.TabContainer>
  );
}