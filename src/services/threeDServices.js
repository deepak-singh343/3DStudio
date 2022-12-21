import {
  AmbientLight,
  Scene,
  PMREMGenerator,
  LinearToneMapping,
  WebGLRenderer,
  OrthographicCamera,
  Vector2,
  Vector3,
  Box3,
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { TransparentBackgroundFixedUnrealBloomPass } from '../3D/TransparentBackgroundFixedUnrealBloomPass'
import { loadRequired3dModel } from '../3D/3DLoader'
import { OrbitControls } from '../3D/OrbitControls'

import { setRequiredMaterial } from '../3D/materials/setRequiredMaterial'
import modelScene from '../3D/models/seamaster3.glb'

class threeDServices {
  constructor () {
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
  }

  setupThreeJs () {
    if (this.sceneLoaded) {
      return
    }
    this.scene = new Scene()
    this.renderer = this.createRenderer()
    this.canvas=this.renderer.domElement;

    this.renderer.setClearColor(0x000000, 0.0) // the default

    // Load Light
    this.addLightsToTheScene()

    const pmremGenerator = new PMREMGenerator(this.renderer)
    const backgroundTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
    this.scene.environment = backgroundTexture
    
    this.sceneLoaded = true
    this.camera = new OrthographicCamera(-this.canvasWidth / 2, this.canvasWidth / 2, this.canvasHeight / 2, -this.canvasHeight / 2, 1, 10000)

    this.camera.position.x = 1.8;
    this.camera.position.y = 11.5;
    this.camera.position.z = 5.2;
    this.camera.lookAt( this.scene.position );
    this.model = {
      status: 'loading',
      object: null,
    }

    this.addPostProcessing(window.innerWidth,window.innerHeight,this.dprScale)

    this.url=this.data.data.fbx_url
    this.update3dModel (this.data, 400, 226)
  }

  get3dModel (data, callback) {
    if (this.model && this.model.status === 'loaded' && this.model.object) {
      return this.model
    } else {
      this.load3DModel({
          // url: this.url,
          url: modelScene,
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
    renderer.setSize(window.innerWidth, window.innerHeight-2);
    const canvas=renderer.domElement;
    canvas.id='threeD-canvas'
    let threeDCanvas=document.getElementById('threeD-canvas')
    if(!threeDCanvas){
      document.getElementById('studio-mode').append(canvas);
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

    // console.log('current model size', size)

    // const aspectRatio = size.x / size.y

    const height = maxHeight * 1.7 || 100
    const width = maxWidth || 100

    if (Math.floor(size.x) > Math.floor(size.y)) {
      algoFactor = 'width'
    } else {
      algoFactor = 'height'
    }


    if (algoFactor === 'height') {
      scale = height / size.y
    } else if (algoFactor === 'width') {
      scale = width / size.x
    }

    object.scale.set(scale, scale, scale)
    console.log(model.center)
    object.position.y = model.center.y
    object.position.x = model.center.x
    object.position.z = model.center.z

    object.rotation.x = -0
    object.rotation.y = 0
    object.rotation.z = 0

    object.visible = true
  }


	setupOrbitalControls () {
		this.camera.position.set(0, 0, 1000)

		return new Promise(async (resolve) => {
		  this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.listenToKeyEvents(document.body)
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
    document.body.dispatchEvent(event)
    this.controls.rotateSpeed=rotationSpeed
  }

  zoomInZoomOut(type){
    const evt = new Event('wheel', {bubbles: true, cancelable: true});
    evt.deltaY = type==='zoomIn'?-240:240
    this.canvas.dispatchEvent(evt);
  }

  playPauseAutoRotation(val){
    this.controls.autoRotate = val==='play'?true:false 
    this.controls.autoRotateSpeed = 4
  }

}

const ThreeDServices = new threeDServices()

export {
  ThreeDServices
}
