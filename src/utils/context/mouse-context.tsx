import { createContext, useState } from "react";

export const MouseContext = createContext({
  cursorType: "",
  cursorChangeHandler: (_cursorType: string) => {},
});

type MouseContextProps = {
  children: React.ReactNode;
}

const MouseContextProvider = (props : MouseContextProps) => {
  const [cursorType, setCursorType] = useState<string>("");
  const cursorChangeHandler = (cursorType: string) => setCursorType(cursorType);
  return (
    <MouseContext.Provider
      value={{
        cursorType: cursorType,
        cursorChangeHandler: cursorChangeHandler,
      }}
    >
      {props.children}
    </MouseContext.Provider>
  );
};

export default MouseContextProvider;
