import React, { useEffect } from 'react'
import {SetUp3D} from '../3D/services/setUp3D'
import Controls from './Controls'

const StudioMode = () => {
  const setUp3D=()=>{
    SetUp3D.setupThreeJs()
  }
  useEffect(() => {
    setUp3D()
  }, [])

  return (
    <div id='studio-mode'>
      <Controls/>
    </div>
  )
}

export default StudioMode