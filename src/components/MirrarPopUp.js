import React, { useEffect, useRef, useState } from 'react'
import { SlClose } from "react-icons/sl";
import { useContext } from 'react';
import { AppContext } from '../context/AppContextProvider';
import { ThreeDServices } from '../services/threeDServices';

const MirrarPopUp = () => {
    const iframeRef=useRef()
    const {setShowMirrarWebArPopup} =useContext(AppContext)
    const [showCloseButton,setShowCloseButton] = useState(false)
    const closeCustomizationPopUp = ()=>{
        setShowMirrarWebArPopup(false)
    }
    useEffect(()=>{
        iframeRef.current.addEventListener("load", ()=>{
            setShowCloseButton(true)
        });
    },[iframeRef])

    return (
        <div  className='fixed bg-black/[0.4] top-0 left-0 flex w-full h-full z-50 items-center overflow-hidden'>
            <div  className='bg-white rounded-full absolute top-[10px] right-[10px] md:top-[50px] md:right-[160px] cursor-pointer'>
                {showCloseButton?<SlClose size={28} onClick={closeCustomizationPopUp}/>:''}
            </div>
            <iframe id='mirrar-iframe' className='w-full h-full min-w-[auto] max-h-[auto] overflow-hidden'
                src={`https://cdn.mirrar.com/general/mirrar.html?sku=${ThreeDServices.productCode}&brand_id=${ThreeDServices.brandId}`}
                allow='camera;autoplay;microphone;clipboard-read; clipboard-write'
                ref={iframeRef}
            ></iframe>
        </div>
    )
}

export default MirrarPopUp