'use client';
import { UIContextType } from '@/AppTypes';
import { createContext, useState } from 'react';

const initialState = { isMobileNavOpen: false, isResumePage: false };
const UIContext = createContext<UIContextType>({ uiState: initialState, setUIState: undefined });

export const UIContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [uiState, setUIState] = useState(initialState);

  return (
    <UIContext.Provider value={{ uiState, setUIState: setUIState }}>{children}</UIContext.Provider>
  );
};

export default UIContext;
