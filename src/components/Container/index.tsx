/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from "react";
import ThemeToggle from "../ThemeToggle";

import * as S from './styles'

export default function Container({ name, children, tabs }: { name: string; children: any; tabs?: any; } ): JSX.Element {
  console.log("tabs", Boolean(tabs));
  return (
   <S.Container>
      <S.Content>
        <S.ContentHeader $hasTabs={Boolean(tabs)}>
          {tabs}
          <div className="title_theme">
            <h2>{name}</h2>
            <ThemeToggle />
          </div>
        </S.ContentHeader>
        <S.ContentBody>{children}</S.ContentBody>
      </S.Content>
   </S.Container>
  )
}