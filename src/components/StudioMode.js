import React, { useEffect } from 'react'
import {SetUp3D} from '../3D/setUp3D'
import Hotspots from './Hotspots'
const StudioMode = () => {

  function setUp3D(){
    SetUp3D.setupThreeJs()
  }
  useEffect(() => {
    setUp3D()
  }, [])
  
  return (
    <div id='studio-mode'>
      <Hotspots/>
    </div>
  )
}

export default StudioMode