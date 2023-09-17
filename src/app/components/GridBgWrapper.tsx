import * as React from 'react'

const GridBgWrapper = ({children}: {children: React.ReactNode}) =>  (
  <div className="relative px-5">
    <div className="absolute bg-grid inset-0" />
    {children}
  </div>
)

export default GridBgWrapper;
