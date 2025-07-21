import Script from "next/script";
import { Footer, Header, Main, SideNav } from "./components";
import AppWrapper from "./components/AppWrapper";
import "./globals.css";
import { UIContextProvider } from "./hooks/UIContext";

export const metadata = {
  title: "Chris Claude",
  description: "Chris Claude Software Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="/cdn-cgi/zaraz/s.js"
          referrerPolicy="origin"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <UIContextProvider>
          <AppWrapper>
            <SideNav />
            <Header />
            <Main>
              {children}

              <div data-component-embed="chat-prompt" data-enable-chat="true" />
              <Footer />
            </Main>
          </AppWrapper>
        </UIContextProvider>
      </body>
    </html>
  );
}
