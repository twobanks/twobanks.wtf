/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from "react";
import ThemeToggle from "../ThemeToggle";

import * as S from './styles'
import Navigation from "../Navigation";
import { usePathname } from "next/navigation";

export default function Container({ name, children, tabs }: { name: string; children: any; tabs?: any; } ): JSX.Element {
  console.log("tabs", Boolean(tabs));
  const path = usePathname();
  console.log('path', path);
  const isHome = path === '/';
  console.log('is', isHome)
  return (
   <S.Container $isHome={isHome}>
      {!isHome && <Navigation />} 
      <S.Content>
        <S.ContentHeader $hasTabs={Boolean(tabs)} $isHome={isHome}>
          {tabs}
          <div className="title_theme">
            <h3>{name}</h3>
            <ThemeToggle />
          </div>
        </S.ContentHeader>
        <S.ContentBody>{children}</S.ContentBody>
      </S.Content>
   </S.Container>
  )
}