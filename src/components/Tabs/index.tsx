/* eslint-disable @typescript-eslint/no-explicit-any */

import * as S from './styles';

export default function Tabs({pillStyle, activeTab, activeTabRef, setActiveTab, dados}: any) {
  return (
    <S.TabContainer>
      <S.ActivePill $left={pillStyle.left} $width={pillStyle.width} $opacity={pillStyle.opacity} />
      {dados.map((tab: any) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <S.TabButton key={tab.id} ref={isActive ? activeTabRef : null} onClick={() => setActiveTab(tab.id)} $active={isActive}>
            {tab.icon && <Icon weight={isActive ? 'fill' : 'regular'} />}
            {tab.label}
          </S.TabButton>
        );
      })}
    </S.TabContainer>
  )
}