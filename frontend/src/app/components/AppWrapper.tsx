'use client';
import UIContext from '@/hooks/UIContext';
import React, { useContext } from 'react';

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const {
    uiState: { isMobileNavOpen },
  } = useContext(UIContext);

  return (
    <div className={`${isMobileNavOpen ? 'h-screen overflow-hidden' : ''}`}>
      {children}
    </div>
  );
};

export default AppWrapper;
