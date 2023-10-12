import {
  AmbientLight,
  Scene,
  PMREMGenerator,
  LinearToneMapping,
  WebGLRenderer,
  OrthographicCamera,
  PerspectiveCamera,
  Vector2,
  Vector3,
  Box3,
  CubeTextureLoader,
} from 'three'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { TransparentBackgroundFixedUnrealBloomPass } from '../3D/TransparentBackgroundFixedUnrealBloomPass'
import { loadRequired3dModel } from '../3D/3DLoader'
import { OrbitControls } from '../3D/OrbitControls'
import { setRequiredMaterial,updateRequiredMaterial } from '../3D/materials/setRequiredMaterial'
import modelScene from '../3D/models/seamaster3.glb'
import { metalJson,pearlJson,crystalJson,bottomPearlJson, diamondJson } from "../DummyMaterialJSON";
import { QueryParam } from '../utilities/queryParam'
import  {RGBELoader}  from 'three/examples/jsm/loaders/RGBELoader'

class threeDServices {
  constructor () {
    this.brandId=QueryParam.getParam("brand_id") || '562e2c77-8e8d-41b1-96bc-4b431b2c3a16'
    this.category=QueryParam.getParam("category") || 'Earrings'
    this.productCode=QueryParam.getParam("sku") || 'E14322-SSILBIBWM'
    // this.productCode='E14322-SSILBIBWM-fbx'
    // this.category='Rings'
    // this.productCode='JNY8158CW'
    
    this.scene = null
    this.renderer = null
    this.ambient = null
    this.lightFront = null
    this.sceneLoaded = false
    this.controls=null

    this.canvas = null

    this.dprScale = window.devicePixelRatio

    this.canvasWidth = window.innerWidth
    this.canvasHeight = window.innerHeight
    this.scaleFactor = 1
    this.showHotspots=false
    this.data=''
    this.childFunc=null
    this.showPopup=false
    this.current3DModel= {
      enablePostProcessing: false,
      object: null,
      editableNodes: {},
      activeNode: null,
      resetNode: null,
      activeNodeName: null,
      activeNodeMaterial: null,
      assignedMaterials: {},
      data: null,
      activeNodeList: {}, // this is used to store the nodes sharing the same name
      activeNodeMaterialList: {} // this is used to store the materials applied to the nodes sharing the same name
    }
    this.caratWeight ={
      x:null,
      y:null,
      z:null
    }
    // this.environments = {
    //   'Blouberg Sunrise': { filename: 'Mono_Lake.hdr' },
    //   'Moonless Golf': { filename: 'moonless_golf.hdr' },
    //   'Pedestrian Overpass': { filename: 'pedestrian_overpass.hdr' },
    //   'Quarry': { filename: 'quarry.hdr' },
    //   'Royal Esplanade': { filename: 'royal_esplanade.hdr' },
    //   'San Giuseppe Bridge': { filename: 'san_giuseppe_bridge.hdr' },
    //   'Venice Sunset': { filename: 'venice_sunset.hdr' }
    // };

    this.environments = {
      'Texture1': { filepath: 'texture1' },
      'Texture2': { filepath: 'texture2' },
      'Texture3': { filepath: 'texture3' },
      'Texture4': { filepath: 'texture4' },
      'Texture5': { filepath: 'texture5' },
      'Texture6': { filepath: 'texture6' },
      'Texture7': { filepath: 'texture7' },
      'Texture8': { filepath: 'texture8' },
      'Texture9': { filepath: 'texture9' },
      'Texture10': { filepath: 'texture10' },
    };

    this.params = {
      environment: Object.keys( this.environments )[ 0 ]
    };
  }

  setupThreeJs () {
    if (this.sceneLoaded) {
      return
    }
    this.scene = new Scene()
  
    this.renderer = this.createRenderer()
    this.canvas=this.renderer.domElement;

    // Load Light
    this.addLightsToTheScene()

    this.loadEnvironment( this.params.environment );

    this.sceneLoaded = true
    this.camera = new PerspectiveCamera( 40, this.canvasWidth / this.canvasHeight, 1, 2000 );
    this.camera.position.x = 1.8;
    this.camera.position.y = 11.5;
    this.camera.position.z = 5.2;
    this.camera.lookAt( this.scene.position );
    this.model = {
      status: 'loading',
      object: null,
    }

    // this.addPostProcessing(window.innerWidth,window.innerHeight,this.dprScale)

    this.url=this.data.data.fbx_url
    if(this.url){
      this.update3dModel (this.data, this.canvas.clientWidth/3,this.canvas.clientHeight/3)
    }else{
      alert('This is not a 3d product,please change the sku or category')
    }
    
  }

  get3dModel (data, callback) {
    if (this.model && this.model.status === 'loaded' && this.model.object) {
      return this.model
    } else {
      this.load3DModel({
          url: this.url,
          // url: modelScene,
          data: data,
          callback
        }
      )
    } 
    return null
  }

  createRenderer = () => {
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
    })
  
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.toneMapping = LinearToneMapping
    renderer.toneMappingExposure = 1
    renderer.toneMappingWhitePoint = 1
    renderer.gammaInput = true
    renderer.gammaOutput = true
    const parentContainer=document.getElementById('studio-mode-parent')
    renderer.setSize(parentContainer.clientWidth, parentContainer.clientHeight);

    const canvas=renderer.domElement;
    canvas.classList.add('threeD-canvas')
    
    let threeDCanvas=document.getElementsByClassName('threeD-canvas')[0]
    const checkIfStudioModeContainsCanvas=  parentContainer.contains(threeDCanvas);
    if(!checkIfStudioModeContainsCanvas){
      parentContainer.append(canvas);
    }
    return renderer
  }

  addLightsToTheScene () {
    const ambientLight = new AmbientLight(0xffffff, 1)
    this.scene.add(ambientLight)

    this.ambientLight = ambientLight
  }

  addPostProcessing (width, height, dprScale) {
    const renderScene = new RenderPass(this.scene, this.camera)
    renderScene.clear = true
    const effectFXAA = new ShaderPass(FXAAShader)
    effectFXAA.uniforms.resolution.value.x = 1 / (width * dprScale)
    effectFXAA.uniforms.resolution.value.y = 1 / (height * dprScale)
    effectFXAA.renderToScreen = true

    const bloomPass = new TransparentBackgroundFixedUnrealBloomPass(new Vector2(width, height), 0.8, 0.5, 0.92)

    const composer = new EffectComposer(this.renderer)
    composer.setSize(width * dprScale, height * dprScale)
    composer.addPass(renderScene)
    composer.addPass(bloomPass)     
    composer.addPass(effectFXAA)

    this.composer = composer
  }

  resolveOfLoad3dModel (object, data,model,callback) {
    const box = new Box3().setFromObject(object)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())

    object = this.applyMaterial(object, data)
    object.renderOrder = 10

    this.model = {
      object: object,
      originalRotation: {
        x: object.rotation.x,
        y: object.rotation.y,
        z: object.rotation.z
      },
      status: 'loaded',
      size: size,
      center: center,
      mass: 10,
      length: 120,
      force: 10,
      stiffness: 0.97,
      initialAngle: Math.PI / 180 * 10,
      initialAngleChanged: false,
      aVelocity: 0,
      angle: 0,
      previousFaceRotation: {}
    }

    const preparedModel = this.model.object
    this.scene.add(preparedModel)

    if (callback) {
      callback()
    }
  }

  applyMaterial (object, data) {
    setRequiredMaterial(object, this.renderer, data)
    return object
  }

  renderScene () {
    requestAnimationFrame(() => {
      if (this.renderer && this.scene) {
          this.renderer.render(this.scene, this.camera)
          if(this.showHotspots && this.childFunc && this.childFunc.current){
              this.childFunc.current(this.model,this.scene,this.renderer,this.camera)
          }
        }
        if(this.controls){
          this.controls.update()
        }
        this.renderScene()
      })
  }

  async update3dModel (data, width, height) {
    const model = this.get3dModel(data, () => {
      this.update3dModel(data, width, height)
    })
    if (model) {
      this.setObjectPosition(model, data, width, height)
      await this.setupOrbitalControls()
      this.renderScene()
    }
  }

  load3DModel ( {url, data, callback}) {
    if (!this.renderer) return

      loadRequired3dModel(url).then((object) => {
        this.resolveOfLoad3dModel(object,data,this.model, callback)
      }).catch(err => {
        console.log(err)
      })
  }

  setObjectPosition (model, data, maxWidth, maxHeight) {
    const object = model.object
    const size = model.size
    // const center = model.center
    // const dprScale = this.dprScale * window.devicePixelRatio
    let algoFactor = 'height'
    // let scaleFactor = 1
    let scale = 1

    const height = maxHeight * 1.2 || 100
    const width = maxWidth || 100

    if (Math.floor(size.x) > Math.floor(size.y)) {
      algoFactor = 'width'
    } else {
      algoFactor = 'height'
    }

    if (data.data) {
      this.canvas.dataset.category = data.data.category
      this.canvas.dataset.type = '3d-' + data.data.type
    }
    
    if (algoFactor === 'height') {
      scale = height / size.y
    } else if (algoFactor === 'width') {
      scale = width / size.x
    }

    object.scale.set(scale, scale, scale)
    if (this.category === 'Earrings') {
      const box = new Box3().setFromObject(object)
      const currentSize = box.getSize(new Vector3()).length()
      object.position.y = (currentSize / 4)
    }else{
      object.position.y = 0
    }
    object.position.x = 0

    object.rotation.x = -0
    object.rotation.y = 0
    object.rotation.z = 0

    object.visible = true
  }


	setupOrbitalControls () {
		this.camera.position.set(0, 0, 1000)

		return new Promise(async (resolve) => {
		  this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.listenToKeyEvents(this.canvas)
		  resolve()
		})
	}

  rotateModelHorizontally(rotation){
    const rotationSpeed=this.controls.rotateSpeed
    this.controls.rotateSpeed=10
    let event
    if(rotation==='right'){
      event=new KeyboardEvent('keydown',{
        ctrlKey : true,
        code : this.controls.keys.LEFT,
        key : this.controls.keys.LEFT,
      })
    }
    else{
      event=new KeyboardEvent('keydown',{
        ctrlKey : true,
        code : this.controls.keys.RIGHT,
        key : this.controls.keys.RIGHT,
      })
    }
    this.canvas.dispatchEvent(event)
    this.controls.rotateSpeed=rotationSpeed
  }

  zoomInZoomOut(type){
    const evt = new Event('wheel', {bubbles: true, cancelable: true});
    evt.deltaY = type==='zoomIn'?-240:240
    this.canvas.dispatchEvent(evt);
  }

  playPauseAutoRotation(val){
    this.controls.autoRotate = val==='play'?true:false 
    this.controls.autoRotateSpeed = 2
  }

  changeJewelleryMaterial(index,currentActive){
    let materialJson
    if(this.category==='Rings'){
      if(currentActive.includes('d')){
        materialJson=diamondJson
      }else if(currentActive.includes('m') || currentActive.includes('f')){
        materialJson=metalJson
      }else if(currentActive.includes('crystal')){
        materialJson=crystalJson
      }
    }else{
      if(currentActive.includes('metal')){
        materialJson=metalJson
      }else if(currentActive.includes('bottom')){
        materialJson=bottomPearlJson
      }else if(currentActive.includes('crystal')){
        materialJson=crystalJson
      }else if(currentActive.includes('pearl')){
        materialJson=pearlJson
      }
    }
    this.current3DModel.activeNodeName=currentActive
    const dataObj = this.current3DModel && this.current3DModel.data
    let apiData = null
    const materialIndex = index
    const materialData = materialJson[materialIndex]
    if (dataObj && dataObj.meta && dataObj.meta.threedModel && dataObj.meta.calibrationData && Object.keys(dataObj.meta.calibrationData)) {
      let calibrationData = dataObj.meta.calibrationData
      if (!calibrationData) {
        calibrationData = {}
      }
      if (!calibrationData[currentActive]) {
        calibrationData[currentActive] = {}
      }
      if (currentActive && calibrationData[currentActive]) {
        if (materialData && materialData.id === calibrationData[currentActive].materialId) {
          apiData = calibrationData[currentActive]
        } else if (materialData.id) {
          // calibrationData[currentActive].materialId = materialData.id
          // callOnInput = true
        }
      }
    }

    // resetting the materials because in the next step the new materials will be assigned
    this.current3DModel.activeNodeMaterialList[currentActive] = []

    // assigning the current selected material to the active nodes of same name
    this.current3DModel.activeNodeList[currentActive].forEach(node => {
      updateRequiredMaterial(node, materialData, apiData, currentActive)
    })
  }

  handleCaratSelection(weight,modelObject){
    for (let i = 0; i < modelObject.length; i++) 
    {
      if (modelObject[i].children.length>0) {
        this.handleCaratSelection(weight,modelObject[i].children);
      } else {
        if(this.category=='Rings' && modelObject[i].material && modelObject[i].material.isDiamondMaterial){
          this.changeCaratWeight(weight,modelObject[i])
        }
        else if(this.category!='Rings' && modelObject[i].name.includes('Customizable') ){
          this.changeCaratWeight(weight,modelObject[i])
        }
      }
    }
  }

  changeCaratWeight(weight,modelObject){
    if(!this.caratWeight.x){
      this.caratWeight.x=modelObject.scale.x
    }if(!this.caratWeight.y){
      this.caratWeight.y=modelObject.scale.y
    }
    modelObject.scale.x = this.caratWeight.x * weight
    modelObject.scale.y = this.caratWeight.y * weight
  }

  // loadEnvironment(name){
  //   if ( this.environments[ name ].texture !== undefined ) {

  //     this.scene.background = this.environments[ name ].texture;
  //     this.scene.environment = this.environments[ name ].texture;
  //     return;

  //   }

  //   const filename = this.environments[ name ].filename;
  //   new RGBELoader()
  //     .setPath( '3d/textures/equirectangular/' )
  //     .load( filename,  ( texture )=> {
  //       var envMap = pmremGenerator.fromEquirectangular( texture ).texture;

  //       this.scene.background = envMap;
        
  //       this.scene.environment = envMap;

  //       texture.dispose();
  //       pmremGenerator.dispose();
  //       this.environments[ name ].texture = envMap

  //     } );
  //     var pmremGenerator = new PMREMGenerator( this.renderer );
  //     pmremGenerator.compileEquirectangularShader();
  // }

  loadEnvironment(name){
    if ( this.environments[ name ].texture !== undefined ) {
      this.scene.background = this.environments[ name ].texture;
      this.scene.environment = this.environments[ name ].texture;
      return;
    }
    const filepath = this.environments[ name ].filepath;
    const outerEnvironmentMap = new CubeTextureLoader()
        .setPath( `3d/textures/cube/${filepath}/` )
        .load( ['px.png','nx.png','py.png',
                'ny.png','pz.png','nz.png',
          ] );
    this.scene.background = outerEnvironmentMap
    this.scene.environment = outerEnvironmentMap
    this.environments[ name ].texture = outerEnvironmentMap
  }
}

const ThreeDServices = new threeDServices()

export {
  ThreeDServices
}
