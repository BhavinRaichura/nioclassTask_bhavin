import React from 'react'
import TimerHandler from './TimerHandler'
import TestEndButton from './TestEndButton'


const Navbar = () => {
  return (
    <div className=' border-2 shadow-md min-w-full h-max py-2 px-10 flex justify-between'>
      <TestEndButton/>
    </div>
  )
}

export default Navbar