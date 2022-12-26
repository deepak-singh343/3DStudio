import { useState } from "react";
import Button from "./Button";
import JewelleryPreference from "./JewelleryPreference";
import RingSize from "./RingSize";
import StudioMode from "./StudioMode";
export default function ConfigurationPopup() {
    const [showJewlleryPref , setShowJewlleryPref] = useState(true)
    const [showRingSize , setShowRingSize] = useState(false)

    const showJewelleryPrefMenu  = () => {
        setShowRingSize(false)
        setShowJewlleryPref(true)
    }

    const showRingSizeMenu  = () => {
        setShowJewlleryPref(false)
        setShowRingSize(true)
    }

      return (
        <div className="flex justify-center items-start w-full h-hull absolute overflow-hidden">
          <div className="w-screen h-screen absolute bg-[#000000] opacity-50"></div>
          <div className="flex justify-between items-center z-50 bg-white w-[90%] h-[700px]">
            <div className="w-[50%] h-full">
              <div id="studioModeContainer" className="w-[45%] h-full absolute bg-gray-200">
                <StudioMode/>
              </div>
            </div>
            <div className="w-[50%] h-full flex flex-start flex-col items-start gap-[20px] border border-black pl-[15px] pr-[15px] pb-[15px]">
                <ul className=" flex flex-start  items-center w-full pt-[20px]  gap-[20px]  cursor-pointer text-base font-medium">
                    <li onClick={showJewelleryPrefMenu} className = {showJewlleryPref ? ' border-b-4 pb-[5px] border-[#7eb046] text-[21px] font-semibold' : "text-[18px]"}>Jewellery Preference</li>
                    <li onClick={showRingSizeMenu} className = {showRingSize ? ' border-b-4 pb-[5px] border-[#7eb046] text-[21px] font-semibold' : "text-[18px]"}>Ring Size</li>
                </ul>
                    {showJewlleryPref ? <JewelleryPreference/> : null}
                    {showRingSize ? <RingSize/> : null}
                    <Button buttonclass={'w-[250px] px-[10px] py-[15px] text-center bg-[#FA505A] text-white rounded-md '} buttontext ={'Add To cart'} buttonParentClass ={"self-center	justify-self-start	"}/>
            </div>
          </div>
        </div>
      );
}
