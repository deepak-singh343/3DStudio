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

const style = {
  position: "absolute",
  // overflow: "hidden",
  left: 0,
  bottom: 0,
  right: 0,
  paddingTop: "30px",
  paddingBottom: '20px',
  background: "white",
  borderTopRightRadius: "20px",
  borderTopLeftRadius: "20px",
  overflow:'hidden'
};


function App() {
  const { showPopup, setShowPopUp, setIsMobile, isMobile ,showJewlleryPref, showRingSize,closeClick, setCloseClick,    setShowRingSize,
    setShowJewlleryPref} =
    useContext(AppContext);

  const [activeMenu, setActiveMenu] = useState("")
  let resizableHeight = 10


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

    console.log('close clock')
  }

  const showConfigPopup = () => {
    ThreeDServices.sceneLoaded = false;
    setShowPopUp(true);
    setShowJewlleryPref(true)
  };

  const getActiveMenu = (menu) => {
    setActiveMenu(menu)
  } 

  const setHight = () => {
    console.log('xxxxx')

    if(showJewlleryPref) {
      resizableHeight = 90
    }
    
    if (showRingSize) {
      resizableHeight = 40
    }
    
    if (closeClick) {
      resizableHeight = 10
    }
  }

  // let resizableHeight = setHight()

  return (
    <div className="md:flex items-center justify-center bg-black h-[100vh] w-[100vw] sm:flex-col relative">
      <div className="flex items-center justify-center relative">
        <div className="bg-white w-[900px] h-[700px]">
          <div id="studio-mode-parent" className="bg-gray-200">
            <StudioMode />
          </div>
        </div>
        <Button
          buttonfunction={showConfigPopup}
          buttonParentClass ={'hidden md:flex'}
          buttonclass={
            "absolute pt-[15px] pb-[15px] pl-[25px] pr-[25px] flex items-center justify-center bg-black  bottom-[10px] right-[10px] w-[90px] h-[25px] cursor-pointer rounded-[50px]"
          }
          buttontext={"Customise"}
          buttontextclass={"text-white text-sm"}
        />
      </div>
      {isMobile ? (
        <>

                <Resizable
        // onResize= {setHight()}
        onResizeStart={setHight()}
          style={style}
          className={"resizable"}
         
          maxHeight={`${resizableHeight}%`}
          boundsByDirection={true}
          enable={{ top: true }}
          handleComponent={{
            top: <TrayPuller></TrayPuller>,
          }}
          handleStyles={{
            top: { height: "50px" },
          }}
          size = {{height:`${resizableHeight}%`}}
          defaultSize={{
            width: "100%",
            height:`20%`
          }}
        >
          <ConfigurationPopup parentCallBackFunction={getActiveMenu} />
          <div onClick={closePopUp} className="absolute top-[5px] right-[10px] z-[100]">
            <RxCrossCircled/>
          </div>
        </Resizable>
  
        
        </>
        
      ) : null}
      {showPopup ? <ConfigurationPopup parentCallBackFunction={getActiveMenu} /> : null}
    </div>
  );
}

export default App;
