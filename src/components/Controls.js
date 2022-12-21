import React from 'react'
import { useState,useContext } from 'react';
import { FaAngleLeft,FaAngleRight,FaSearchPlus,FaSearchMinus,FaPlay,FaPause,FaRulerHorizontal } from 'react-icons/fa';
import {GrRotateLeft,GrRotateRight} from 'react-icons/gr'
import {TfiZoomIn,TfiZoomOut} from 'react-icons/tfi'
import {SlControlPlay,} from 'react-icons/sl'
import {AiOutlinePause} from 'react-icons/ai'
import {RxRulerSquare} from 'react-icons/rx'
import {ThreeDServices} from '../services/threeDServices'
import { AppContext } from "../context/AppContextProvider";
const Controls = () => {
  const {showHotspots,setShowHideHostSpots} = useContext(AppContext)
  const [showPlayButton,setShowHidePlayButton]=useState(true)
  const [showPauseButton,setShowHidePauseButton]=useState(false)
  const handleShowHideHotSpots=()=>{
    setShowHideHostSpots(!showHotspots)
  }

  const handleModelRotationHorizontalRotation=(rotation)=>{
    ThreeDServices.rotateModelHorizontally(rotation)
  }

  const handlePlayPauseButton=(val)=>{
    if(val==='play'){
      setShowHidePlayButton(!showPlayButton)
      setShowHidePauseButton(!showPauseButton)
      ThreeDServices.playPauseAutoRotation(val)
    }else{
      setShowHidePlayButton(!showPlayButton)
      setShowHidePauseButton(!showPauseButton)
      ThreeDServices.playPauseAutoRotation(val)
    }
  }

  const handleZoomInZoomOut =(type)=>{
    ThreeDServices.zoomInZoomOut(type)
  }

  return (
    <div>
      <div className='w-full flex justify-center bottom-12 absolute'>
        <div className='flex justify-around w-[17%]'>
          <div className='rotate flex text-white cursor-pointer'>
            <GrRotateRight size={30} onClick={()=>handleModelRotationHorizontalRotation('left')}/>
            <GrRotateLeft size={30} onClick={()=>handleModelRotationHorizontalRotation('right')}/>
          </div>
          <div className='zoom flex text-white cursor-pointer'>
            <TfiZoomIn size={30} onClick={()=>handleZoomInZoomOut('zoomIn')}/>
            <TfiZoomOut size={30} onClick={()=>handleZoomInZoomOut('zoomOut')}/>
          </div>
          <div className='play-pause text-white cursor-pointer'>
            {showPlayButton?(<SlControlPlay size={30} onClick={()=>handlePlayPauseButton('play')}/>):''}
            {showPauseButton?(<AiOutlinePause size={30} onClick={()=>handlePlayPauseButton('pause')}/>):''} 
          </div>
          <div className='ruler  text-white cursor-pointer'>
            <RxRulerSquare size={30} onClick={handleShowHideHotSpots}/>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Controls