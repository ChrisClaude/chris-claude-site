'use client';
import UIContext from '@/hooks/UIContext';
import { ReactNode, useContext } from 'react';

const Main = ({ children }: { children: ReactNode }) => {
  const { uiState: {isMobileNavOpen} } = useContext(UIContext);

  return <main className={`transition-all duration-75 ease-in md:ml-0 ${isMobileNavOpen? ' ml-72' : ''}`}>{children}</main>;
};

export default Main;
