import {
    Vector3,
    Box3,
    Box3Helper,
    Color
  } from 'three'

import { SetUp3D } from './setUp3D'

let object,box,size,helper
const updateScreenPosition=()=> {
    if(!box){
        object = SetUp3D.model.object
        box = new Box3().setFromObject(object)
        size = box.getSize(new Vector3())
        
        helper = new Box3Helper(box, new Color(0, 255, 0));
        SetUp3D.scene.add(helper);
    }
    const topLeftvector = new Vector3(box.min.x,box.max.y,box.max.z);      
    const topRightVector = new Vector3(box.max.x,box.max.y,box.max.z);      
    const backBottomLeftVector = new Vector3(box.min.x,box.min.y,box.min.z);    
    const backBottomRightVector = new Vector3(box.max.x,box.min.y,box.min.z);      
    const frontBottomLeftVector = new Vector3(box.min.x,box.min.y,box.max.z);    
    const frontBottomRightVector = new Vector3(box.max.x,box.min.y,box.max.z);     
    const itemLengthVector = new Vector3((box.min.x+box.max.x)/2,box.max.y,box.max.z)      
    const itemHeightLeftVector = new Vector3(box.min.x,(box.min.y+box.max.y)/2,box.max.z)      
    const itemBreadthLeftVector = new Vector3(box.min.x,box.min.y,(box.min.z+box.max.z))        
    const itemHeightRightVector = new Vector3(box.max.x,(box.min.y+box.max.y)/2,box.max.z)     
    const itemBreadthRightVector = new Vector3(box.max.x,box.min.y,(box.min.z+box.max.z))        

    projectScreen(topLeftvector)
    projectScreen(topRightVector)
    projectScreen(backBottomLeftVector)
    projectScreen(backBottomRightVector)
    projectScreen(frontBottomLeftVector)
    projectScreen(frontBottomRightVector)
    projectScreen(itemLengthVector)
    projectScreen(itemHeightLeftVector)
    projectScreen(itemBreadthLeftVector)
    projectScreen(itemHeightRightVector)
    projectScreen(itemBreadthRightVector)

    const frontTopLeftPoint=document.getElementById('top-left')
    positionPoints(frontTopLeftPoint,topLeftvector)
    
    const frontTopRightPoint=document.getElementById('top-right')
    positionPoints(frontTopRightPoint,topRightVector)

    const backBottomLeftPoint=document.getElementById('back-bottom-left')
    positionPoints(backBottomLeftPoint,backBottomLeftVector)

    const backbottomRightPoint=document.getElementById('back-bottom-right')
    positionPoints(backbottomRightPoint,backBottomRightVector)

    const frontBottomLeftPoint=document.getElementById('front-bottom-left')
    positionPoints(frontBottomLeftPoint,frontBottomLeftVector)

    const frontBottomRightPoint=document.getElementById('front-bottom-right')
    positionPoints(frontBottomRightPoint,frontBottomRightVector)

    const itemLength=document.getElementById('item-length')
    if(itemLength){
        itemLength.textContent=`${Math.round(size.x * 0.0264583333)} cm`
    }
    positionPoints(itemLength,itemLengthVector)

    const itemHeight=document.getElementById('item-height')
    if(itemHeight){
        itemHeight.textContent=`${Math.round(size.y * 0.0264583333)} cm`
    }
    positionPoints(itemHeight,itemHeightLeftVector)
    
    const itemBreadth=document.getElementById('item-breadth')
    if(itemBreadth){
        itemBreadth.textContent=`${Math.round(size.z * 0.0264583333)} cm`
    }
    
    positionPoints(itemBreadth,itemBreadthLeftVector)

    showOrhideRulerPointsForRight(backBottomRightVector,backbottomRightPoint,itemHeightLeftVector,itemBreadthLeftVector,itemHeightRightVector,itemBreadthRightVector)
    showOrhideRulerPointsForRight(frontBottomRightVector,frontBottomRightPoint,itemHeightLeftVector,itemBreadthLeftVector,itemHeightRightVector,itemBreadthRightVector)

    showOrhideRulerPointsForLeft(backBottomLeftVector,backBottomLeftPoint,itemHeightLeftVector,itemBreadthLeftVector,itemHeightRightVector,itemBreadthRightVector)
    showOrhideRulerPointsForLeft(frontBottomLeftVector,frontBottomLeftPoint,itemHeightLeftVector,itemBreadthLeftVector,itemHeightRightVector,itemBreadthRightVector)

}

const projectScreen=(vector)=>{
    const canvas = SetUp3D.renderer.domElement
    vector.project(SetUp3D.camera)
    vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
    vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));
}

const positionPoints=(pointElement,vector)=>{
    if(pointElement){
        pointElement.style.left = `${vector.x - 5}px`;
        pointElement.style.top = `${vector.y - 5}px`;
    }
}

const showOrhideRulerPointsForRight=(vector,point,itemHeightLeftVector,itemBreadthLeftVector,itemHeightRightVector,itemBreadthRightVector)=>{
    const meshDistance = SetUp3D.camera.position.distanceTo(SetUp3D.model.object.position);
    const distance = SetUp3D.camera.position.distanceTo(vector)
    if(point){
        if(distance>meshDistance){
            point.style.display='none'
            togglePositionOfDimensions(itemHeightLeftVector,itemBreadthLeftVector)         //position dimensions to left
        }
        else{
            point.style.display='block'
            togglePositionOfDimensions(itemHeightRightVector,itemBreadthRightVector)      //position dimensions to right
        }
    }
}

const showOrhideRulerPointsForLeft=(vector,point,itemHeightLeftVector,itemBreadthLeftVector,itemHeightRightVector,itemBreadthRightVector)=>{
    const meshDistance = SetUp3D.camera.position.distanceTo(SetUp3D.model.object.position);
    const distance = SetUp3D.camera.position.distanceTo(vector)
    if(point){
        if(distance<meshDistance){
            point.style.display='none'
            togglePositionOfDimensions(itemHeightRightVector,itemBreadthRightVector)    //position dimensions to right
        }
        else{
            point.style.display='block'
            togglePositionOfDimensions(itemHeightLeftVector,itemBreadthLeftVector)          //position dimensions to left
        }
    }
}

const togglePositionOfDimensions=(vector1,vector2)=>{
    const itemHeight=document.getElementById('item-height')
    positionPoints(itemHeight,vector1)
    
    const itemBreadth=document.getElementById('item-breadth')
    positionPoints(itemBreadth,vector2)
}

export {
    updateScreenPosition
}





