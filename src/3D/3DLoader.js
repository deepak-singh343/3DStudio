import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { Skeleton } from 'three'


const localCopyObject = {}

const cloneFbx = (fbx) => {
  const clone = fbx.clone(true)
  clone.animations = fbx.animations
  clone.skeleton = { bones: [] }

  const skinnedMeshes = {}

  fbx.traverse(node => {
    if (node.isSkinnedMesh) {
      skinnedMeshes[node.name] = node
    }
  })

  const cloneBones = {}
  const cloneSkinnedMeshes = {}

  clone.traverse(node => {
    if (node.isBone) {
      cloneBones[node.name] = node
    }

    if (node.isSkinnedMesh) {
      cloneSkinnedMeshes[node.name] = node
    }
  })

  for (const name in skinnedMeshes) {
    const skinnedMesh = skinnedMeshes[name]
    const skeleton = skinnedMesh.skeleton
    const cloneSkinnedMesh = cloneSkinnedMeshes[name]

    const orderedCloneBones = []

    for (let i = 0; i < skeleton.bones.length; i++) {
      const cloneBone = cloneBones[skeleton.bones[i].name]
      orderedCloneBones.push(cloneBone)
    }

    cloneSkinnedMesh.bind(
      new Skeleton(orderedCloneBones, skeleton.boneInverses),
      cloneSkinnedMesh.matrixWorld)

    // For animation to work correctly:
    clone.skeleton.bones.push(cloneSkinnedMesh)
    clone.skeleton.bones.push(...orderedCloneBones)
  }

  return clone
}

async function loadGLTFModel (url) {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('3d/assets/draco/')

  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)

  return new Promise((resolve, reject) => {
    loader.load(url, function (gltf) {
      const object = gltf.scene
      resolve(object)
    },
    function ( xhr ) {             // called while loading is progressing
		  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	  },
    function ( error ) {           // called when loading has errors
      console.log( 'An error happened',error );
      reject(error)
    })
  })
}

function loadFBXModel (url) {
  const loader = new FBXLoader()

  return new Promise((resolve, reject) => {
    if (localCopyObject[url]) {
      const obj = localCopyObject[url]
      const cloneObj = cloneFbx(obj)
      cloneObj.visible = true
      setTimeout(() => {
        resolve(cloneObj)
      }, 1)
      return
    }
    loader.load(url, function (fbx) {
      const object = fbx
      resolve(object)
    },
    function ( xhr ) {             // called while loading is progressing
		  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	  },
    function ( error ) {           // called when loading has errors
      console.log( 'An error happened',error );
      reject(error)
    })
  })
}

function loadRequired3dModel (url) {
  const extension = url.split('.').pop().toLowerCase()
  switch (extension) {
    case 'fbx': {
      return loadFBXModel(url)
    }

    case 'gltf': {
      return loadGLTFModel(url)
    }

    case 'glb': {
      return loadGLTFModel(url)
    }

    default: {
      console.log('This extension is not supported: ', extension)
      break
    }
  }
}

export {
  loadFBXModel,
  loadGLTFModel,
  loadRequired3dModel
}
