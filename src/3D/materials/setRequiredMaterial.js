import {
  CubeRefractionMapping,
  CubeTextureLoader,
  LinearFilter,
  PMREMGenerator,
  UnsignedByteType
} from 'three'
import {
  HDRCubeTextureLoader
} from 'three/examples/jsm/loaders/HDRCubeTextureLoader'
import { ThreeDServices } from '../../services/threeDServices'

import { materialList } from './materialList'

const genCubeUrls = function (prefix, postfix) {
  return [
    prefix + 'px' + postfix, prefix + 'nx' + postfix,
    prefix + 'py' + postfix, prefix + 'ny' + postfix,
    prefix + 'pz' + postfix, prefix + 'nz' + postfix
  ]
}

const hdrUrls = genCubeUrls('3d/environments/cubeTexture/', '.hdr')

const textureCubeUrls = genCubeUrls('3d/environments/imageTexture/texture1', '.jpg')

let hdrCubeRenderTarget

function getImageCubeMapTexture () {
  return new Promise((resolve, reject) => {
    // console.log(textureCubeUrls)
    const textureCube = new CubeTextureLoader().load(textureCubeUrls)
    textureCube.mapping = CubeRefractionMapping

    // scene.background = textureCube
    resolve({
      envMap: textureCube
    })
  })
}

let UVCubeMap
function getUVCubeMapTexture (renderer) {
  return new Promise((resolve, reject) => {
    if (UVCubeMap) {
      resolve({
        envMap: UVCubeMap
      })
    } else {
      const hdrTextureLoader = new HDRCubeTextureLoader()
      UVCubeMap = hdrTextureLoader.setDataType(UnsignedByteType).load(hdrUrls, function (hdrCubeMap) {
        const pmremGenerator = new PMREMGenerator(renderer)
        hdrCubeRenderTarget = pmremGenerator.fromCubemap(UVCubeMap)

        UVCubeMap.magFilter = LinearFilter
        UVCubeMap.needsUpdate = true
        resolve({
          envMap: UVCubeMap
        })
      })
    }
  })
}

function setRequiredMaterial (object, renderer, data) {
  ThreeDServices.current3DModel.data = data
  ThreeDServices.current3DModel.editableNodes = {}

  // resetting the active node list and corresponding materials
  ThreeDServices.current3DModel.activeNodeList = {}
  ThreeDServices.current3DModel.activeNodeMaterialList = {}
  object.traverse(o => {
    const meshName = o.name.toLowerCase()
    if (meshName.includes('customizable')) {
      const [, nodeName,defaultColor ] = meshName.split('-')
      ThreeDServices.current3DModel.editableNodes[nodeName] = {
        defaultColor,
        node: o
      }
      // storing the nodes sharing the same name
      if (ThreeDServices.current3DModel.activeNodeList[nodeName]) {
        ThreeDServices.current3DModel.activeNodeList[nodeName].push(o)
      } else {
        ThreeDServices.current3DModel.activeNodeList[nodeName] = [o]
      }
      const calibrationData = data.meta.calibrationData

      if (calibrationData) {
        if (calibrationData[nodeName] && typeof calibrationData[nodeName] === 'object' && Object.keys(calibrationData[nodeName]).length) {
          const materialId = calibrationData[nodeName].materialId
          const materialData = materialList.filter(material => material.id === materialId)[0]
          ThreeDServices.current3DModel.assignedMaterials[nodeName] = null
          if (materialData) {
            updateRequiredMaterial(o, materialData, calibrationData[nodeName], nodeName)
          }
        }
      }
    }

      if (meshName.includes('clip')) {
        o.visible = false
      }
  })
}


function updateRequiredMaterial (object, materialData, calibratedData, givenNodeName) {
  getUVCubeMapTexture(ThreeDServices.renderer).then(({
    envMap
  }) => {
    let material
    const MaterialPrototype = materialData?.type
    const nodeName = givenNodeName || ThreeDServices.current3DModel.activeNodeName
    if (
      givenNodeName === nodeName &&
        ThreeDServices.current3DModel.assignedMaterials[givenNodeName] &&
        ThreeDServices.current3DModel.assignedMaterials[givenNodeName].id === materialData.id
    ) {
      material = ThreeDServices.current3DModel.assignedMaterials[givenNodeName]
    } else {
      // this is possible when an uploaded product is never edited
      if (MaterialPrototype) {
        material = new MaterialPrototype({ object, envMap,renderer:ThreeDServices.renderer })
      }
    }
    // this condition is important to check because material will be undefined
    // if nothing is changed in terms of materials calibration
    if (material) {
      if (object.material && object.material.dispose) {
        object.material.dispose()
      }

      material.attachMaterial(object)

      if (calibratedData && typeof calibratedData === 'object' && Object.keys(calibratedData).length) {
        material.setMaterialProperties(calibratedData)
      }

      ThreeDServices.current3DModel.assignedMaterials[nodeName] = material

      // storing materials used for the nodes sharing the same name
      if (ThreeDServices.current3DModel.activeNodeMaterialList[nodeName]) {
        ThreeDServices.current3DModel.activeNodeMaterialList[nodeName].push(material)
      } else {
        ThreeDServices.current3DModel.activeNodeMaterialList[nodeName] = [material]
      }

      ThreeDServices.current3DModel.activeNodeMaterial = material
      ThreeDServices.current3DModel.currentMaterialId = (calibratedData && calibratedData.materialId) || materialData.id
    }

  })
}

export {
  setRequiredMaterial,
  updateRequiredMaterial
}
