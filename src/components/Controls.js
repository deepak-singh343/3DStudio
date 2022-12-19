import React from 'react'
import { useState } from 'react';
import { FaAngleLeft,FaAngleRight,FaSearchPlus,FaSearchMinus,FaPlay,FaPause,FaRulerHorizontal } from 'react-icons/fa';
import Hotspots from './Hotspots';
import {SetUp3D} from '../3D/services/setUp3D'
const Controls = () => {
  const [showHotspots,setShowHideRuler]=useState(false)
  const [showPlayButton,setShowHidePlayButton]=useState(true)
  const [showPauseButton,setShowHidePauseButton]=useState(false)
  const handleShowHideHotSpots=()=>{
    setShowHideRuler(!showHotspots)
  }

  const handleModelRotationHorizontalRotation=(rotation)=>{
    SetUp3D.rotateModelHorizontally(rotation)
  }

  const handlePlayPauseButton=(val)=>{
    if(val==='play'){
      setShowHidePlayButton(!showPlayButton)
      setShowHidePauseButton(!showPauseButton)
      SetUp3D.playPauseAutoRotation(val)
    }else{
      setShowHidePlayButton(!showPlayButton)
      setShowHidePauseButton(!showPauseButton)
      SetUp3D.playPauseAutoRotation(val)
    }
  }

  const handleZoomInZoomOut =(type)=>{
    SetUp3D.zoomInZoomOut(type)
  }

  return (
    <div>
      <div className='w-full flex justify-center bottom-12 absolute'>
        <div className='flex justify-around w-[20%]'>
          <div className='rotate flex text-white cursor-pointer'>
            <FaAngleLeft size={30} onClick={()=>handleModelRotationHorizontalRotation('left')}></FaAngleLeft>
            <FaAngleRight size={30} onClick={()=>handleModelRotationHorizontalRotation('right')}></FaAngleRight>
          </div>
          <div className='zoom flex text-white cursor-pointer'>
            <FaSearchPlus size={30} onClick={()=>handleZoomInZoomOut('zoomIn')}></FaSearchPlus>
            <FaSearchMinus size={30} onClick={()=>handleZoomInZoomOut('zoomOut')}></FaSearchMinus>
          </div>
          <div className='play-pause text-white cursor-pointer'>
            {showPlayButton?(<FaPlay size={30} onClick={()=>handlePlayPauseButton('play')}></FaPlay>):''}
            {showPauseButton?(<FaPause size={30} onClick={()=>handlePlayPauseButton('pause')}></FaPause>):''} 
          </div>
          <div className='ruler  text-white cursor-pointer'>
            <FaRulerHorizontal size={30} onClick={handleShowHideHotSpots}></FaRulerHorizontal>
          </div>
        </div>
    </div>
    {
      showHotspots?(<Hotspots/>):''
    }
    
    </div>
  )
}

export default Controls