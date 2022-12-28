import './App.css';
import { useContext } from "react";
import Button from "./components/Button";
import ConfigurationPopup from "./components/ConfigurationPopup";
import { AppContext } from './context/AppContextProvider';
import StudioMode from './components/StudioMode';
import { ThreeDServices } from './services/threeDServices';
function App() {
  const {showPopup,setShowPopUp} = useContext(AppContext)

  const showConfigPopup = () => {
    ThreeDServices.sceneLoaded=false
    setShowPopUp(true)
  }
  return (
    <div className="flex items-center justify-center bg-black h-[100vh] w-[100vw]">
      <div className="flex items-center justify-center relative">
        <div className="bg-white w-[900px] h-[700px]">
          <div id='studio-mode-parent' className='bg-gray-200'>
            <StudioMode/>
          </div>
         </div>
        <Button buttonfunction={showConfigPopup} buttonclass={'absolute pt-[15px] pb-[15px] pl-[25px] pr-[25px] flex items-center justify-center bg-black  bottom-[10px] right-[10px] w-[90px] h-[25px] cursor-pointer rounded-[50px]'}  buttontext={'Customise'} buttontextclass ={'text-white text-sm'}/>
      </div>
      {showPopup ? (
        <ConfigurationPopup/>
      ) : null}
    </div>
  );
}

export default App;
