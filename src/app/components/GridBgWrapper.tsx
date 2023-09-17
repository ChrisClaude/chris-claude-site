import * as React from 'react'

const GridBgWrapper = ({children}: {children: React.ReactNode}) =>  (
  <div className="relative">
    <div className="absolute bg-grid inset-0" />
    {children}
  </div>
)

export default GridBgWrapper;
