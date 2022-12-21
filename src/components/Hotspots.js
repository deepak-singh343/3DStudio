import React,{useContext, useEffect} from 'react'
import {
  Vector3,
  Box3,
  Box3Helper,
  Color
} from 'three'
import { AppContext } from "../context/AppContextProvider";
const Hotspots = ({childFunc}) => {
    const {
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
      itemHeightValue,setItemHeightValue
    } = useContext(AppContext)

    useEffect(()=>{
      childFunc.current=updateScreenPosition
    },[])

    let object,box,size,helper
    const updateScreenPosition=(model,scene,renderer,camera)=> {
      if(!box){
          object = model.object
          box = new Box3().setFromObject(object)
          size = box.getSize(new Vector3())
          
          helper = new Box3Helper(box, new Color(0, 255, 0));
          // scene.add(helper);
      }
      const frontTopLeftvector = new Vector3(box.min.x,box.max.y,box.max.z);      
      const frontTopRightVector = new Vector3(box.max.x,box.max.y,box.max.z);      
      const backBottomLeftVector = new Vector3(box.min.x,box.min.y,box.min.z);    
      const backBottomRightVector = new Vector3(box.max.x,box.min.y,box.min.z);      
      const frontBottomLeftVector = new Vector3(box.min.x,box.min.y,box.max.z);    
      const frontBottomRightVector = new Vector3(box.max.x,box.min.y,box.max.z);     
      const itemLengthVector = new Vector3((box.min.x+box.max.x)/2,box.max.y,box.max.z)      
      const itemHeightLeftVector = new Vector3(box.min.x,(box.min.y+box.max.y)/2,box.max.z)      
      const itemBreadthLeftVector = new Vector3(box.min.x,box.min.y,(box.min.z+box.max.z))        
      const itemHeightRightVector = new Vector3(box.max.x,(box.min.y+box.max.y)/2,box.max.z)     
      const itemBreadthRightVector = new Vector3(box.max.x,box.min.y,(box.min.z+box.max.z))        

      projectScreen(frontTopLeftvector,camera,renderer)
      projectScreen(frontTopRightVector,camera,renderer)
      projectScreen(backBottomLeftVector,camera,renderer)
      projectScreen(backBottomRightVector,camera,renderer)
      projectScreen(frontBottomLeftVector,camera,renderer)
      projectScreen(frontBottomRightVector,camera,renderer)
      projectScreen(itemLengthVector,camera,renderer)
      projectScreen(itemHeightLeftVector,camera,renderer)
      projectScreen(itemBreadthLeftVector,camera,renderer)
      projectScreen(itemHeightRightVector,camera,renderer)
      projectScreen(itemBreadthRightVector,camera,renderer)

      setFrontTopLeftStyle({
        left:`${frontTopLeftvector.x - 5}px`,
        top:`${frontTopLeftvector.y - 5}px`
      })
      
      setFrontTopRightStyle({
        left:`${frontTopRightVector.x - 5}px`,
        top:`${frontTopRightVector.y - 5}px`
      })

      setBackBottomLeftStyle({
        left:`${backBottomLeftVector.x - 5}px`,
        top:`${backBottomLeftVector.y - 5}px`
      })

      setBackBottomRightStyle({
        left:`${backBottomRightVector.x - 5}px`,
        top:`${backBottomRightVector.y - 5}px`
      })

      setFrontBottomLeftStyle({
        left:`${frontBottomLeftVector.x - 5}px`,
        top:`${frontBottomLeftVector.y - 5}px`
      })

      setFrontBottomRightStyle({
        left:`${frontBottomRightVector.x - 5}px`,
        top:`${frontBottomRightVector.y - 5}px`
      })

      setItemLengthValue(`${Math.round(size.x * 0.0264583333)} cm`)
      setItemLengthStyle({
        left:`${itemLengthVector.x - 5}px`,
        top:`${itemLengthVector.y - 5}px`
      })

      setItemHeightValue(`${Math.round(size.y * 0.0264583333)} cm`)
      setItemHeightStyle({
        left:`${itemHeightLeftVector.x - 5}px`,
        top:`${itemHeightLeftVector.y - 5}px`
      })

      setItemBreadthValue(`${Math.round(size.z * 0.0264583333)} cm`)
      setItemBreadthStyle({
        left:`${itemBreadthLeftVector.x - 5}px`,
        top:`${itemBreadthLeftVector.y - 5}px`
      })


      showOrhideRulerPointsForRight(backBottomRightVector,'backbottomRightPoint',itemHeightLeftVector,itemBreadthLeftVector,itemHeightRightVector,itemBreadthRightVector,camera,model)
      showOrhideRulerPointsForRight(frontBottomRightVector,'frontBottomRightPoint',itemHeightLeftVector,itemBreadthLeftVector,itemHeightRightVector,itemBreadthRightVector,camera,model)

      showOrhideRulerPointsForLeft(backBottomLeftVector,'backBottomLeftPoint',itemHeightLeftVector,itemBreadthLeftVector,itemHeightRightVector,itemBreadthRightVector,camera,model)
      showOrhideRulerPointsForLeft(frontBottomLeftVector,'frontBottomLeftPoint',itemHeightLeftVector,itemBreadthLeftVector,itemHeightRightVector,itemBreadthRightVector,camera,model)
  }

  const showOrhideRulerPointsForRight=(vector,point,itemHeightLeftVector,itemBreadthLeftVector,itemHeightRightVector,itemBreadthRightVector,camera,model)=>{
    const meshDistance = camera.position.distanceTo(model.object.position);
    const distance = camera.position.distanceTo(vector)
    if(distance>meshDistance){
      if(point==='backbottomRightPoint'){
        setShowBackbottomRightPoint(false)
      }else {
        setShowFrontBottomRightPoint(false)
      }
      setItemHeightStyle({
        left:`${itemHeightLeftVector.x - 5}px`,
        top:`${itemHeightLeftVector.y - 5}px`
      })
      setItemBreadthStyle({
        left:`${itemBreadthLeftVector.x - 5}px`,
        top:`${itemBreadthLeftVector.y - 5}px`
      })
    }
    else{
      setItemHeightStyle({
        left:`${itemHeightRightVector.x - 5}px`,
        top:`${itemHeightRightVector.y - 5}px`
      })
      setItemBreadthStyle({
        left:`${itemBreadthRightVector.x - 5}px`,
        top:`${itemBreadthRightVector.y - 5}px`
      })
      if(point==='backbottomRightPoint'){
        setShowBackbottomRightPoint(true)
      }else {
        setShowFrontBottomRightPoint(true)
      }
    }
  }

  const showOrhideRulerPointsForLeft=(vector,point,itemHeightLeftVector,itemBreadthLeftVector,itemHeightRightVector,itemBreadthRightVector,camera,model)=>{
    const meshDistance = camera.position.distanceTo(model.object.position);
    const distance = camera.position.distanceTo(vector)
    if(distance<meshDistance){
      if(point==='backBottomLeftPoint'){
        setShowBackbottomLeftPoint(false)
      }else{
        setShowFrontBottomLeftPoint(false)
      }
      setItemHeightStyle({
        left:`${itemHeightRightVector.x - 5}px`,
        top:`${itemHeightRightVector.y - 5}px`
      })
      setItemBreadthStyle({
        left:`${itemBreadthRightVector.x - 5}px`,
        top:`${itemBreadthRightVector.y - 5}px`
      })
    }
    else{
      setItemHeightStyle({
        left:`${itemHeightLeftVector.x - 5}px`,
        top:`${itemHeightLeftVector.y - 5}px`
      })
      setItemBreadthStyle({
        left:`${itemBreadthLeftVector.x - 5}px`,
        top:`${itemBreadthLeftVector.y - 5}px`
      })
      if(point==='backBottomLeftPoint'){
        setShowBackbottomLeftPoint(true)
      }else{
        setShowFrontBottomLeftPoint(true)
      }
    }
  }

  const projectScreen=(vector,camera,renderer)=>{
    const canvas = renderer.domElement
    vector.project(camera)
    vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
    vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));
  }

  return (
    <div id='hotspots'>
      <div id="front-top-left" className="hotspot" style={frontTopLeftStyle}></div>
      <div id="front-top-right" className="hotspot" style={frontTopRightStyle}></div>
      {
        showBackbottomLeftPoint?
        <div id="back-bottom-left" className="hotspot" style={backBottomLeftStyle}></div>
        :''
      }
      {
        showBackbottomRightPoint?
        <div id="back-bottom-right" className="hotspot" style={backBottomRightStyle}></div>
        :''
      }
      {
        showFrontBottomLeftPoint?
        <div id="front-bottom-left" className="hotspot" style={frontBottomLeftStyle}></div>
        :''
      }
      {
        showFrontBottomRightPoint?
        <div id="front-bottom-right" className="hotspot" style={frontBottomRightStyle}></div>
        :''
      }
      <div id="item-length" className="dimensions" style={itemLengthStyle}>{itemLengthValue}</div>
      <div id="item-breadth" className="dimensions" style={itemBreadthStyle}>{itemBreadthValue}</div>  
      <div id="item-height" className="dimensions" style={itemHeightStyle}>{itemHeightValue}</div>  
    </div>
  )
}

export default Hotspots