import React from 'react'

function Container({children}:any) {
  return (
    <div className='max-w-6xl mx-auto w-full'>{children}</div>
  )
}

export default Container