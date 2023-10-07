'use client';
import UIContext from '@/hooks/UIContext';
import { ReactNode, useContext } from 'react';

const Main = ({ children }: { children: ReactNode }) => {
  const { uiState, setUIState } = useContext(UIContext);
  const { isMobileNavOpen } = uiState;

  const handleMainClick = () => {
    if (isMobileNavOpen) {
      setUIState?.({...uiState, isMobileNavOpen: !isMobileNavOpen});
    }
  }

  return <main className={`transition-all duration-75 ease-in-out md:ml-0 ${isMobileNavOpen? ' translate-x-72' : ''}`} onClick={handleMainClick}>{children}</main>;
};

export default Main;
