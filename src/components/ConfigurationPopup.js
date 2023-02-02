import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import Button from "./Button";
import JewelleryPreference from "./JewelleryPreference";
import RingSize from "./RingSize";
import StudioMode from "./StudioMode";
import { SlClose } from "react-icons/sl";
import { ThreeDServices } from "../services/threeDServices";
import { AiOutlineRight } from "react-icons/ai";

export default function ConfigurationPopup({parentCallBackFunction}) {
  const { isMobile,showJewlleryPref, setShowJewlleryPref,
    showRingSize, setShowRingSize, setCloseClick,
    setShowPopUp,setResizableHeight,showRightArrowIcon,setShowRightArrowIcon } = useContext(AppContext);

  const showJewelleryPrefMenu = (event) => {
    setShowRingSize(false);
    setShowRightArrowIcon(false)
    setShowJewlleryPref(true);
    setCloseClick(false)
    setResizableHeight(100)
    parentCallBackFunction(event.target.innerText)
  };

  const showRingSizeMenu = (event) => {
    setShowJewlleryPref(false);
    setShowRingSize(true);
    setCloseClick(false)
    setResizableHeight(100)
    parentCallBackFunction(event.target.innerText)
  };

  const closeCustomizationPopUp=()=>{
    setShowPopUp(false)
    ThreeDServices.showPopup = false
    setShowRingSize(false)
  }

  return (
    <div className="flex justify-evenly items-center w-full md:w-[40%] h-full overflow-hidden">
      <div className="flex justify-between items-center bg-white md:h-[700px] w-full h-[100%]">
        <div className="md:w-[100%] pt-[10px] md:pt-[5px] w-full h-full flex flex-col items-start gap-[20px]  pl-[6px] pr-[6px] pb-[6px] md:pr-[15px] md:pl-[15px] relative">
          {!isMobile?
            <SlClose size={25} onClick={closeCustomizationPopUp}className="absolute cursor-pointer right-5 top-3.5"/>
            :''
          }
        
          <ul className="flex w-full pt-[14px] md:pt-[20px] gap-[20px]  cursor-pointer text-base font-medium">
            <li
              onClick={showJewelleryPrefMenu}
              className={` sm: text-[18px] md:text-[21px] font-semibold pb-[5px] flex items-center`
                        }
            >
              Jewellery Preference
              {showRightArrowIcon?<AiOutlineRight/>:''}
            </li>
            {/* <li
              onClick={showRingSizeMenu}
              className={`${showRingSize?'underline decoration-[3px] decoration-gray-500 underline-offset-8':''}
                          sm: text-[18px] md:text-[21px] font-semibold pb-[5px]`
                        }>
              Ring Size
            </li> */}
          </ul>
          {showJewlleryPref ? <JewelleryPreference /> : null}
          {showRingSize ? <RingSize /> : null}
        </div>
      </div>
    </div>
  );
}
