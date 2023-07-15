import { ReactNode } from 'react';

const Main = ({children}: {
  children: ReactNode
}) => (
  <main className="md:px-52 py-6 px-80">{children}</main>
);

export default Main;
