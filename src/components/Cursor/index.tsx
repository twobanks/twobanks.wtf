import { useContext } from "react";
import theme from "../../styles/theme";
import useMousePosition from "../../utils/hooks/useMousePosition";
import * as S from './styled';
import { MouseContext } from "../../utils/context/mouse-context";

type CursorProps = {
  page?: 'about' | 'works' | 'activities' | 'idea' | 'home';
}

const cursorTypes = {
  ['home']: theme.colors.secondary,
  ['about']: theme.colors.yellow,
  ['works']: theme.colors.blue,
  ['activities']: theme.colors.green,
  ['idea']: theme.colors.red,
}

const Cursor = ({ page }: CursorProps) => {
  const { clientX, clientY } = useMousePosition();
  const { cursorType } = useContext(MouseContext);
  let cursorHovered = cursorType === 'hovered' ? 48 : 18;
  return (
    <S.Wrapper>
      <svg
        width={cursorHovered}
        height={cursorHovered}
        viewBox="0 0 50 50"
        style={{
          position: "absolute",
          pointerEvents: "none",
          left: clientX,
          top: clientY,
          transform: `translate(-50%, -50%) scale(2.5)`,
          fill: cursorTypes[page || 'home'],
        }}
      >
        <circle cx="25" cy="25" r="8" />
      </svg>
    </S.Wrapper>
  );
};

export default Cursor;
