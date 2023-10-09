import * as React from 'react'

const GridBgWrapper = ({children, bgType = 1}: {children: React.ReactNode, bgType?: number}) =>  (
  <div className="relative px-5">
    <div className={`absolute inset-0 ${bgType == 1 ? 'bg-grid' : 'bg-grid-2'}`} />
    {children}
  </div>
)

export default GridBgWrapper;
