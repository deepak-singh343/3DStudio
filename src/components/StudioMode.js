import React, { useEffect,useContext, useRef } from 'react'
import {ThreeDServices} from '../services/threeDServices'
import Controls from './Controls'
import Hotspots from './Hotspots'
import { AppContext } from "../context/AppContextProvider";
import { fetchProductData } from '../services/ApiServices';
import EnvironmentSelection from './EnvironmentSelection';
const StudioMode = () => {
  const {showHotspots,showPopup} = useContext(AppContext)
  ThreeDServices.showHotspots=showHotspots
  ThreeDServices.showPopup=showPopup
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
    <div>
      <Controls/>
      <EnvironmentSelection/>
      {showHotspots?<Hotspots childFunc={childFunc}/>:''}
    </div>
      
    
  )
}

export default StudioMode