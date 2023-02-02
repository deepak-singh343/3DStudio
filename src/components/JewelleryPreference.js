import { useRef,createRef, useEffect, useContext } from "react";
import { FaCaretLeft } from "react-icons/fa"
import { FaCaretRight } from "react-icons/fa"
import { ThreeDServices } from "../services/threeDServices";
import Button from "./Button";
import { AppContext } from "../context/AppContextProvider";
import { metalJson,pearlJson,crystalJson,bottomPearlJson,diamondJson } from "../DummyMaterialJSON";

export default function JewelleryPreference() {
  const calibrationData=ThreeDServices.data.meta.calibrationData
  const customizableMenu = ThreeDServices.current3DModel.editableNodes
  for(let key in calibrationData){
    if(!calibrationData[key].selectableMaterials){
      if(ThreeDServices.category=='Rings'){
        if(key.includes('d')){
          calibrationData[key].selectableMaterials=diamondJson
        }else if(key.includes('m') || key.includes('f')){
          calibrationData[key].selectableMaterials=metalJson
        }else if(key.includes('crystal')){
          calibrationData[key].selectableMaterials=crystalJson
        }else if(key.includes('pearl')){
          calibrationData[key].selectableMaterials=pearlJson
        }
      }else{
        if(key.includes('metal')){
          calibrationData[key].selectableMaterials=metalJson
        }else if(key.includes('bottom')){
          calibrationData[key].selectableMaterials=bottomPearlJson
        }else if(key.includes('crystal')){
          calibrationData[key].selectableMaterials=crystalJson
        }else if(key.includes('pearl')){
          calibrationData[key].selectableMaterials=pearlJson
        }
      }
    }
  }

  const caratWeights=[
    {
      weight:'1 carat'
    },
    {
      weight:'1.1 carat'
    },
    {
      weight:'1.2 carat'
    },
    ,
    {
      weight:'1.3 carat'
    }
  ]
  
  const {selectedMaterial,setSelectedMaterial,selectedCaratWeight,setSelectedCaratWeight} = useContext(AppContext)

  useEffect(()=>{
    if(Object.keys(selectedMaterial).length === 0){
      let obj={}
      for(let key in calibrationData){
        if(!obj[key]){
          obj[key]=calibrationData[key].materialId
        }
      }
      setSelectedMaterial(obj)
    }
  },[])

  const refs=useRef([])
  refs.current=Object.keys(calibrationData).map((key,index)=>{
    return refs.current[index] ?? createRef();
  })
  refs.current[Object.keys(calibrationData).length] =refs.current[Object.keys(calibrationData).length] ?? createRef();

  const handleScrollLeft = (refContainer) =>{
    refContainer.current.scrollLeft -= 80;
  }

  const handleScrollRight = (refContainer) =>{
    refContainer.current.scrollLeft += 80;
  }

  const handleMaterialSelection = (key,materialId,index) =>{
    setSelectedMaterial({...selectedMaterial,[key]:materialId})
    ThreeDServices.changeJewelleryMaterial(index,key)
  }

  const handleCaratSelection = (index,weight) =>{
    setSelectedCaratWeight(index)
    const caratWeight=weight.split(' ')[0]
    ThreeDServices.handleCaratSelection(caratWeight,ThreeDServices.model.object.children)
  }

  return (
    <div className="w-full flex items-start h-full flex-col h-full gap-[20px]">
      <div className="jewellery-preference-container w-full flex flex-col gap-[25px] max-h-[70%] md:max-h-[80%] overflow-y-scroll overflow-x-hidden">
        {
          Object.keys(customizableMenu).map((key,ind)=>{
            return(
              <div key={key} className='flex flex-col gap-[10px] pb-[24px] border-b-2 border-solid border-[#C0C0C0]'>
                    <p className="font-semibold text-sm md:text-base">{key.toUpperCase()} </p>
                    <div className="flex justify-around w-[95%] md:w-[90%] m-auto relative">
                      <FaCaretLeft className="flex absolute self-center	justify-self-center	-left-[13px] md:h-[25px] cursor-pointer" onClick={()=>handleScrollLeft(refs.current[ind])}/>
                      <div className="flex gap-x-6 w-[480px] qualities-container overflow-x-scroll scroll-smooth" ref={refs.current[ind]}>
                        {
                          calibrationData[key].selectableMaterials.map((material,index)=>{
                            return (
                            <div key={index} id={material.id} className={`${material.id==selectedMaterial[key]?'border-2 border-green-500':''} p-[5px] md:p-[8px] min-w-[110px] min-h-[110px] cursor-pointer text-center  flex flex-col justify-center items-center rounded`}
                              onClick={()=>handleMaterialSelection(key,material.id,index)}>
                              <img
                                className="p-[5px] h-[60px] w-[60px]"
                                src={material.representativeImage}
                              />
                              <p className="text-sm">{material.label}</p>
                            </div>
                            )
                          })
                        }
                      </div>
                    <FaCaretRight className="flex absolute self-center justify-self-center	right-[-13px] md:h-[25px] cursor-pointer" onClick={()=>handleScrollRight(refs.current[ind])}/>
                    </div>
              </div>
            )
          })
        }
        <div className="flex flex-col gap-[10px] pb-[24px] border-b-2 border-solid border-[#C0C0C0]">
            <p className="font-semibold text-sm md:text-base">Total Carat Weight </p>
            <div className="flex justify-around w-[95%] md:w-[90%] m-auto relative">
            <FaCaretLeft className="flex absolute self-center	justify-self-center	-left-[13px] md:h-[25px] cursor-pointer" onClick={()=>handleScrollLeft(refs.current[Object.keys(calibrationData).length])}/>
              <div className="flex gap-x-6 w-[480px] qualities-container overflow-x-scroll scroll-smooth" ref={refs.current[Object.keys(calibrationData).length]}>
                {
                  caratWeights.map((weight,index)=>{
                    return(
                            <div key={index} className={`${selectedCaratWeight===index?' border-2 border-green-500':''} p-[5px] md:p-[8px] min-w-[110px] min-h-[110px] cursor-pointer text-center  flex flex-col justify-center items-center rounded`}
                            onClick={()=>handleCaratSelection(index,weight.weight)}>
                              <img
                                className="p-[5px] h-[60px] w-[60px] object-contain"
                                src={ThreeDServices.data.data.image_url}
                              ></img>
                              <p className="text-sm md:text-base">{weight.weight}</p>
                            </div>
                          )
                  })
                }
              </div>
              <FaCaretRight className="flex absolute self-center justify-self-center	right-[-13px] md:h-[25px] cursor-pointer" onClick={()=>handleScrollRight(refs.current[Object.keys(calibrationData).length])}/>
            </div>
        </div>
      </div>
      <Button
            buttonclass={
              "w-[250px] px-[10px] py-[10px] font-semibold text-center bg-[#FA505A] cursor-pointer text-white rounded-md "
            }
            buttontext={"Add To cart"}
            buttonParentClass={"flex h-[10%] w-full items-center justify-center md:absolute bottom-[90px] md:bottom-[0px]"}
          />
    </div>
  );
}
