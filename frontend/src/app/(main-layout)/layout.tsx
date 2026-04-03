import { Footer, Header, Main, SideNav } from '@/_components';
import AppWrapper from '@/_components/AppWrapper';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppWrapper>
        <SideNav />
        <Header />
        <Main>
          {children}

          <div
            data-component-embed="chat-prompt"
            data-enable-chat="true"
            id="chat-prompt"
          />
          <Footer />
        </Main>
      </AppWrapper>
    </>
  );
};

export default MainLayout;
