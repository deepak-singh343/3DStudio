import React, { useEffect,useContext, useRef } from 'react'
import {ThreeDServices} from '../services/threeDServices'
import Controls from './Controls'
import Hotspots from './Hotspots'
import { AppContext } from "../context/AppContextProvider";
import { fetchProductData } from '../services/ApiServices';
const StudioMode = () => {
  const {showHotspots} = useContext(AppContext)
  ThreeDServices.showHotspots=showHotspots
  const childFunc=useRef(null)
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(()=>{
    ThreeDServices.childFunc=childFunc
  },[childFunc])

  const fetchData=async ()=>{
    ThreeDServices.data=await fetchProductData()
    ThreeDServices.setupThreeJs()
  }

  return (
    <div id='studio-mode'>
      <Controls/>
      {showHotspots?<Hotspots childFunc={childFunc}/>:''}
    </div>
  )
}

export default StudioMode