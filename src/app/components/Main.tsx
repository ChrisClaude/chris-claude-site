import { ReactNode } from 'react';

const Main = ({children}: {
  children: ReactNode
}) => (
  <main className="pt-6 px-80">{children}</main>
);

export default Main;
