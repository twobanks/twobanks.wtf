"use client";

import * as React from "react";

interface VisibilityContextType {
  visible: boolean;
  toggleVisible: () => void;
}

const VisibilityContext = React.createContext<VisibilityContextType | undefined>(undefined);

export function VisibilityProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = React.useState(false);

  const toggleVisible = React.useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return (
    <VisibilityContext.Provider value={{ visible, toggleVisible }}>
      {children}
    </VisibilityContext.Provider>
  );
}

export function useVisibility() {
  const context = React.useContext(VisibilityContext);
  if (context === undefined) {
    throw new Error("useVisibility must be used within a VisibilityProvider");
  }
  return context;
}