import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import Button from "./Button";
import JewelleryPreference from "./JewelleryPreference";
import RingSize from "./RingSize";
import StudioMode from "./StudioMode";


export default function ConfigurationPopup({parentCallBackFunction}) {
  const { isMobile,showJewlleryPref, setShowJewlleryPref,showRingSize, setShowRingSize } = useContext(AppContext);

  const showJewelleryPrefMenu = (event) => {
    setShowRingSize(false);
    setShowJewlleryPref(true);
    parentCallBackFunction(event.target.innerText)
  };

  const showRingSizeMenu = (event) => {
    setShowJewlleryPref(false);
    setShowRingSize(true);
    parentCallBackFunction(event.target.innerText).toString()
  };



  return (
    <div className="flex justify-center items-start w-full h-full absolute overflow-hidden pb-[20px]">
      <div className="flex justify-between items-center z-50 bg-white md:w-[90%] md:h-[700px] sm:justify-center w-full h-[85%] md:h-full">
        {
          isMobile == false ? (
            <div className="w-[50%] h-full">
            <div
              id="studioModeContainer"
              className="w-full h-full flex justify-center items-center relative bg-gray-200"
            >
              <StudioMode />
            </div>
          </div>
          ) : null
        }
        <div className="md:w-[50%] h-full flex flex-start flex-col items-start gap-[20px]  pl-[6px] pr-[6px] pb-[6px] md:pr-[15px] md:pl-[15px] w-full">
          <ul className=" flex flex-start  items-center w-full pt-[20px]  gap-[20px]  cursor-pointer text-base font-medium">
            <li
              onClick={showJewelleryPrefMenu}
              className={
                showJewlleryPref
                  ? " border-b-4 pb-[5px] border-[#7eb046] sm: text-[18px] md:text-[21px] font-semibold"
                  : "md:text-[18px] sm:text-[16px]"
              }
            >
              Jewellery Preference
            </li>
            <li
              onClick={showRingSizeMenu}
              className={
                showRingSize
                  ? " border-b-4 pb-[5px] border-[#7eb046] sm: text-[18px] md:text-[21px] font-semibold"
                  : "md:text-[18px] sm:text-[16px]"
              }
            >
              Ring Size
            </li>
          </ul>
          {showJewlleryPref ? <JewelleryPreference /> : null}
          {showRingSize ? <RingSize /> : null}
          <Button
            buttonclass={
              "w-[250px] px-[10px] py-[15px] font-semibold text-center bg-[#FA505A] cursor-pointer text-white rounded-md "
            }
            buttontext={"Add To cart"}
            buttonParentClass={"self-center	justify-self-start	"}
          />
        </div>
      </div>
    </div>
  );
}
