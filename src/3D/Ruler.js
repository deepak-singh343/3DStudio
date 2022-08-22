import {
    Vector3,
    Box3,
    Box3Helper,
    Color
  } from 'three'

import { SetUp3D } from './setUp3D'

function updateScreenPosition() {
    const object = SetUp3D.model.object
    const box = new Box3().setFromObject(object)
    const size = box.getSize(new Vector3())
    let helper = new Box3Helper(box, new Color(0, 255, 0));
    SetUp3D.scene.add(helper);
    
    const vector1 = new Vector3(box.min.x,box.max.y,box.max.z);
    const vector2 = new Vector3(box.max.x,box.max.y,box.max.z);
    const vector3 = new Vector3(box.min.x,box.min.y,box.min.z);
    const vector4 = new Vector3(box.max.x,box.min.y,box.min.z);
    const vector5 = new Vector3(box.min.x,box.min.y,box.max.z);
    const vector6 = new Vector3(box.max.x,box.min.y,box.max.z);
    const vector7 = new Vector3((box.min.x+box.max.x)/2,box.max.y,box.max.z)
    const vector8 = new Vector3(box.min.x,(box.min.y+box.max.y)/2,box.max.z)
    const vector9 = new Vector3(box.min.x,box.min.y,(box.min.z+box.max.z))

    projectScreen(vector1)
    projectScreen(vector2)
    projectScreen(vector3)
    projectScreen(vector4)
    projectScreen(vector5)
    projectScreen(vector6)
    projectScreen(vector7)
    projectScreen(vector8)
    projectScreen(vector9)
   

    const frontTopLeftPoint=document.getElementById('top-left')
    positionPoints(frontTopLeftPoint,vector1)
    
    const frontTopRightPoint=document.getElementById('top-right')
    positionPoints(frontTopRightPoint,vector2)

    const backBottomLeftPoint=document.getElementById('back-bottom-left')
    positionPoints(backBottomLeftPoint,vector3)

    const backbottomRightPoint=document.getElementById('back-bottom-right')
    positionPoints(backbottomRightPoint,vector4)

    const frontBottomLeftPoint=document.getElementById('front-bottom-left')
    positionPoints(frontBottomLeftPoint,vector5)

    const frontBottomRightPoint=document.getElementById('front-bottom-right')
    positionPoints(frontBottomRightPoint,vector6)

    const itemLength=document.getElementById('item-length')
    itemLength.textContent=`${Math.round(size.x * 0.0264583333)} cm`
    positionPoints(itemLength,vector7)

    const itemHeight=document.getElementById('item-height')
    itemHeight.textContent=`${Math.round(size.y * 0.0264583333)} cm`
    positionPoints(itemHeight,vector8)
    
    const itemBreadth=document.getElementById('item-breadth')
    itemBreadth.textContent=`${Math.round(size.z * 0.0264583333)} cm`
    positionPoints(itemBreadth,vector9)
    // annotation1.style.opacity = spriteBehindObject ? 0.25 : 1;
}

function projectScreen(vector){
    const canvas = SetUp3D.renderer.domElement
    vector.project(SetUp3D.camera)
    vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
    vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));
}

function positionPoints(pointElement,vector){
    pointElement.style.left = `${vector.x - 5}px`;
    pointElement.style.top = `${vector.y - 5}px`;
}

export {
    updateScreenPosition,
}