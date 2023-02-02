import "./App.css";
import { useContext, useEffect, useState } from "react";
import Button from "./components/Button";
import ConfigurationPopup from "./components/ConfigurationPopup";
import { AppContext } from "./context/AppContextProvider";
import StudioMode from "./components/StudioMode";
import { ThreeDServices } from "./services/threeDServices";
import { Resizable } from "re-resizable";
import { TrayPuller } from "./components/TrayPuller";
import {RxCrossCircled} from 'react-icons/rx'
import MirrarPopUp from "./components/MirrarPopUp";
import { HiChevronLeft } from "react-icons/hi"

const style = {
  position: "absolute",
  left: 0,
  bottom: 0,
  right: 0,
  background: "white",
  zIndex:'10',
  overflow:'hidden'
};


function App() {
  const { showPopup, setShowPopUp, setIsMobile, isMobile ,showJewlleryPref, showRingSize,closeClick, setCloseClick, setShowRingSize,
    setShowJewlleryPref,showMirrarWebArPopup,setShowMirrarWebArPopup,resizableHeight,setResizableHeight,setShowRightArrowIcon} =
    useContext(AppContext);

  const [activeMenu, setActiveMenu] = useState("")
  

  useEffect(() => {
    if (window.innerWidth < 600) {
      setIsMobile(true);
      console.log("width < 600");
    }
  });

  const closePopUp = () => {
    setCloseClick(true)
    setShowRingSize(false);
    setShowJewlleryPref(false);
    setResizableHeight(15)
    setShowRightArrowIcon(true)
  }

  const showConfigPopup = () => {
    // ThreeDServices.sceneLoaded = true;
    ThreeDServices.showPopup = true
    setShowPopUp(true);
    setShowJewlleryPref(true)
  };

  const getActiveMenu = (menu) => {
    setActiveMenu(menu)
  } 

  const setHeight = () => {
    if(showJewlleryPref) {
      setResizableHeight('100')
    }
    
    if (showRingSize) {
      setResizableHeight('100')
    }
    
    if (closeClick) {
      setResizableHeight('15')
    }
  }

  const openMirrarWebAr = () =>{
    setShowMirrarWebArPopup(true)          
  }

  return (
    <div>
      {showMirrarWebArPopup?<MirrarPopUp/>:''}
        <div className="md:flex justify-center bg-black h-[100vh] w-[100vw] sm:flex-col relative">
          <div className={`${isMobile?'':'items-center'} flex justify-center relative h-full`}>
            <div className={`${isMobile?'w-full h-[85%]':'w-[900px] h-[700px]'}  `}>
              <div id="studio-mode-parent" className="bg-gray-200 relative w-full h-full">
                <StudioMode />
              </div>
            </div>
            {
                !showPopup?
                  <Button
                      buttonfunction={showConfigPopup}
                      buttonParentClass ={'hidden md:flex'}
                      buttonclass={
                        "absolute pt-[15px] pb-[15px] pl-[25px] pr-[25px] flex items-center justify-center bg-black  bottom-[20px] right-[340px] w-[90px] h-[25px] cursor-pointer rounded-[50px]"
                      }
                      buttontext={"Customise"}
                      buttontextclass={"text-white text-sm"}
                  />
                :''
            }

            {
                  !showPopup?
                      <Button
                          buttonfunction={openMirrarWebAr}
                          buttonParentClass ={'flex'}
                          buttonclass={
                            "absolute pt-[15px] pb-[15px] pl-[25px] pr-[25px] flex items-center justify-center bg-black  md:bottom-[20px] md:right-[450px] bottom-[125px] right-[5px] w-[100px] h-[25px] cursor-pointer rounded-[50px]"
                          }
                          buttontext={"Try On"}
                          buttontextclass={"text-white text-sm"}
                      />
                  :''
            }
            
            {isMobile ? (
              <Resizable
                      // onResizeStop={setHeight}
                      style={style}
                      className={"resizable"}
                      maxHeight={`100%`}
                      minHeight={'15%'}
                      boundsByDirection={true}
                      enable={{ top: true }}
                      handleComponent={{
                        top: <TrayPuller></TrayPuller>,
                      }}
                      handleStyles={{
                        top: { height: "30px" },
                      }}
                      size = {{height:`${resizableHeight}%`}}
                      onResizeStop={(e, direction, ref, d) => {
                        const reziableHeight=ref.style.height.split('%')[0]
                        if(Number(reziableHeight)<16 || (d.height==0 && Number(reziableHeight)==100) ){
                          setShowRightArrowIcon(true)
                          setCloseClick(false)
                          setShowJewlleryPref(false);
                        }
                        if(showJewlleryPref){
                          setResizableHeight(Number(reziableHeight))
                        }
                      }}
                      defaultSize={{
                        width: "100%",
                        height:`15%`
                      }}
                    >
                      {
                        showJewlleryPref||showRingSize?
                          <div onClick={closePopUp} className="relative top-[15px] left-[10px] z-[100] flex w-[30px] h-[30px] min-w-[30px] bg-[#F8F8F8] justify-center items-center rounded-full drop-shadow-md">
                            <HiChevronLeft/>
                          </div>
                        :''
                      }
                      <ConfigurationPopup parentCallBackFunction={getActiveMenu} />
                      
              </Resizable>
            ) : null}
            {showPopup ? <ConfigurationPopup parentCallBackFunction={getActiveMenu} /> : null}
          </div>
        </div>
    </div>
    
  );
}

export default App;
