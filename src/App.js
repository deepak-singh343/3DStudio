import "./App.css";
import { useContext, useEffect } from "react";
import Button from "./components/Button";
import ConfigurationPopup from "./components/ConfigurationPopup";
import { AppContext } from "./context/AppContextProvider";
import StudioMode from "./components/StudioMode";
import { ThreeDServices } from "./services/threeDServices";
import { Resizable } from "re-resizable";
import { TrayPuller } from "./components/TrayPuller";

const style = {
  position: "absolute",
  // overflow: "hidden",
  left: 0,
  bottom: 0,
  right: 0,
  paddingTop: "30px",
  background: "white",
  borderTopRightRadius: "20px",
  borderTopLeftRadius: "20px",
  overflow:'hidden'
};

function App() {
  const { showPopup, setShowPopUp, setIsMobile, isMobile } =
    useContext(AppContext);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setIsMobile(true);
      console.log("width < 600");
    }
  });

  const showConfigPopup = () => {
    ThreeDServices.sceneLoaded = false;
    setShowPopUp(true);
  };

  return (
    <div className="md:flex items-center justify-center bg-black h-[100vh] w-[100vw] sm:flex-col">
      <div className="flex items-center justify-center relative">
        <div className="bg-white w-[900px] h-[700px]">
          <div id="studio-mode-parent" className="bg-gray-200">
            <StudioMode />
          </div>
        </div>
        <Button
          buttonfunction={showConfigPopup}
          buttonParentClass ={'sm: hidden'}
          buttonclass={
            "absolute pt-[15px] pb-[15px] pl-[25px] pr-[25px] flex items-center justify-center bg-black  bottom-[10px] right-[10px] w-[90px] h-[25px] cursor-pointer rounded-[50px]"
          }
          buttontext={"Customise"}
          buttontextclass={"text-white text-sm"}
        />
      </div>
      {isMobile ? (
        <Resizable
          style={style}
          className={"resizable"}
          minHeight={"7%"}
          maxHeight={`90%`}
          boundsByDirection={true}
          enable={{ top: true }}
          handleComponent={{
            top: <TrayPuller></TrayPuller>,
          }}
          handleStyles={{
            top: { height: "50px" },
          }}
          defaultSize={{
            width: "100%",
            height: `20%`,
          }}
        >
          <ConfigurationPopup />
        </Resizable>
      ) : null}
      {showPopup ? <ConfigurationPopup /> : null}
    </div>
  );
}

export default App;
