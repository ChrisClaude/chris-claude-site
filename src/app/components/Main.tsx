import { ReactNode } from 'react';

const Main = ({children}: {
  children: ReactNode
}) => (
  <main className="md:px-52 md:py-32 py-12 px-80">{children}</main>
);

export default Main;
