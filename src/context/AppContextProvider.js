import { createContext, useState } from 'react';

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [showHotspots,setShowHideHostSpots]=useState(false)
    const [topLeftStyle,setTopLeftStyle]=useState({})
    const [topRightStyle,setTopRightStyle]=useState({})
    const [backBottomLeftStyle,setBackBottomLeftStyle]=useState({})
    const [backBottomRightStyle,setBackBottomRightStyle]=useState({})
    const [frontTopRightStyle,setFrontTopRightStyle]=useState({})
    const [frontTopLeftStyle,setFrontTopLeftStyle]=useState({})
    const [frontBottomLeftStyle,setFrontBottomLeftStyle]=useState({})
    const [frontBottomRightStyle,setFrontBottomRightStyle]=useState({})
    const [itemLengthStyle,setItemLengthStyle]=useState({})
    const [itemBreadthStyle,setItemBreadthStyle]=useState({})
    const [itemHeightStyle,setItemHeightStyle]=useState({})
    const [showBackbottomRightPoint,setShowBackbottomRightPoint]=useState(false)
    const [showFrontBottomRightPoint,setShowFrontBottomRightPoint]=useState(false)
    const [showBackbottomLeftPoint,setShowBackbottomLeftPoint]=useState(false)
    const [showFrontBottomLeftPoint,setShowFrontBottomLeftPoint]=useState(false)
    const [itemLengthValue,setItemLengthValue]=useState('')
    const [itemBreadthValue,setItemBreadthValue]=useState('')
    const [itemHeightValue,setItemHeightValue]=useState('')
    const [showPopup, setShowPopUp] = useState(false);

    return <AppContext.Provider value={{
        showHotspots,setShowHideHostSpots,
        topLeftStyle,setTopLeftStyle,
        topRightStyle,setTopRightStyle,
        backBottomLeftStyle,setBackBottomLeftStyle,
        backBottomRightStyle,setBackBottomRightStyle,
        frontTopRightStyle,setFrontTopRightStyle,
        frontTopLeftStyle,setFrontTopLeftStyle,
        frontBottomLeftStyle,setFrontBottomLeftStyle,
        frontBottomRightStyle,setFrontBottomRightStyle,
        itemLengthStyle,setItemLengthStyle,
        itemBreadthStyle,setItemBreadthStyle,
        itemHeightStyle,setItemHeightStyle,
        showBackbottomRightPoint,setShowBackbottomRightPoint,
        showFrontBottomRightPoint,setShowFrontBottomRightPoint,
        showBackbottomLeftPoint,setShowBackbottomLeftPoint,
        showFrontBottomLeftPoint,setShowFrontBottomLeftPoint,
        itemLengthValue,setItemLengthValue,
        itemBreadthValue,setItemBreadthValue,
        itemHeightValue,setItemHeightValue,
        showPopup, setShowPopUp
    }}>
        {children}
    </AppContext.Provider>
}

export { AppContext, AppContextProvider  };