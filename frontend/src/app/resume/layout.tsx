import { Footer, Header, Main, SideNav } from '@/components';
import AppWrapper from '@/components/AppWrapper';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Main>
        {children}

        <div
          data-component-embed="chat-prompt"
          data-enable-chat="true"
          id="chat-prompt"
        />
        <Footer />
      </Main>
    </>
  );
};

export default MainLayout;
