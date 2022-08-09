import React, { useEffect } from 'react'
import {SetUp3D} from '../3D/setUp3D'
const StudioMode = () => {

  function setUp3D(){
    SetUp3D.setupThreeJs()
  }
  useEffect(() => {
    setUp3D()
  }, [])
  
  return (
    <div id='studio-mode'>
      <canvas id='studio-mode-3d-canvas'>

      </canvas>
    </div>
  )
}

export default StudioMode