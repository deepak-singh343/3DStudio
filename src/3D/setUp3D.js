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
  Box3Helper,
  Color
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { TransparentBackgroundFixedUnrealBloomPass } from '../threejs/TransparentBackgroundFixedUnrealBloomPass'
import { loadRequired3dModel } from './3DLoader'

import { setRequiredMaterial } from './materials/setRequiredMaterial'
import modelScene from '../assets/models/seamaster3.glb'

class setUp3D {
  constructor () {
    this.scene = null
    this.renderer = null
    this.ambient = null
    this.lightFront = null
    this.sceneLoaded = false


    this.canvas = null

    this.dprScale = window.devicePixelRatio

    this.canvasWidth = window.innerWidth
    this.canvasHeight = window.innerHeight
    this.scaleFactor = 1

    this.data = '{"model":"1","threedModel":"true","dragForce3d":"0.97","pointLight6":"0","pointLight5":"0","pointLight4":"0","pointLight3":"0.6","pointLight1":"0","pointLight2":"0.4","jewelryAngle3d":"10","jewelryLength3d":"200","calibrationData":{"metal":{"color":"#000000","refractionRatio":"0.98","metalness":"0.8","roughness":"0","opacity":"1","materialId":"BasicMetalMaterial"},"pearl":{"color":"#0689cb","refractionRatio":"0.98","metalness":"0.8","opacity":"1","materialId":"BasicMetalMaterial"},"crystal":{"color":"#d7b740","refractionRatio":"0.98","metalness":"1","roughness":"0.33","opacity":"1","materialId":"GoldMaterial"},"bottom_pearl":{"color":"#ff9f00","metalness":"0.8","roughness":"0","opacity":"0.8","dispersion":"1","squashFactor":"1","absorbptionFactor":"0.5","gammaFactor":"0.5","geometryFactor":"0.3","boostFactors":{"x":"2","y":"0.5","z":"0"},"materialId":"BasicCrystalMaterial"}}}'
  }

  reduceQuality () {
    if (!this.renderer) {
      return
    }

    this.dprScale = 1
    this.renderer.setPixelRatio(window.devicePixelRatio)
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
    this.model = {
      status: 'loading',
      object: null
    }

    this.addPostProcessing(window.innerWidth,window.innerHeight,this.dprScale)

    this.url='https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/3d-demo/3d/E14322-SSILBIBWM.fbx'
    // this.url="https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/3d-demo/3d/E14322-SSILBIBWM.glb"
    // this.url="https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/placement-objects/Chair.glb"
    this.update3dModel (JSON.parse(this.data), 400, 226)
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
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('studio-mode').appendChild(renderer.domElement);
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
          this.updateScreenPosition()
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

    object.position.y = 0
    object.position.x = 0
    object.position.z = 0

    object.rotation.x = -0
    object.rotation.y = 0
    object.rotation.z = 0

    object.visible = true
  }


	setupOrbitalControls () {
		this.camera.position.set(0, 0, 1000)

		return new Promise(async (resolve) => {
		  const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls')
		  this.controls = new OrbitControls(this.camera, this.renderer.domElement)
		  resolve()
		})
	}

  updateScreenPosition() {
        const object = this.model.object
        const box = new Box3().setFromObject(object)
        let helper = new Box3Helper(box, new Color(0, 255, 0));
        this.scene.add(helper);
        
        const vector1 = new Vector3(box.min.x,box.max.y,box.max.z);
        const vector2 = new Vector3(box.max.x,box.max.y,box.max.z);
        const vector3 = new Vector3(box.min.x,box.min.y,box.min.z);
        const vector4 = new Vector3(box.max.x,box.min.y,box.min.z);
        const vector5 = new Vector3(box.min.x,box.min.y,box.max.z);
        const vector6 = new Vector3(box.max.x,box.min.y,box.max.z);

        this.projectScreen(vector1)
        this.projectScreen(vector2)
        this.projectScreen(vector3)
        this.projectScreen(vector4)
        this.projectScreen(vector5)
        this.projectScreen(vector6)
       

        const frontTopLeftPoint=document.getElementById('top-left')
        this.positionPoints(frontTopLeftPoint,vector1)
        
        const frontTopRightPoint=document.getElementById('top-right')
        this.positionPoints(frontTopRightPoint,vector2)

        const backBottomLeftPoint=document.getElementById('back-bottom-left')
        this.positionPoints(backBottomLeftPoint,vector3)

        const backbottomRightPoint=document.getElementById('back-bottom-right')
        this.positionPoints(backbottomRightPoint,vector4)

        const frontBottomLeftPoint=document.getElementById('front-bottom-left')
        this.positionPoints(frontBottomLeftPoint,vector5)

        const frontBottomRightPoint=document.getElementById('front-bottom-right')
        this.positionPoints(frontBottomRightPoint,vector6)

        
        // annotation1.style.opacity = spriteBehindObject ? 0.25 : 1;
  }

  projectScreen(vector){
    const canvas = this.renderer.domElement
    vector.project(this.camera)
    vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
    vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));
  }

  positionPoints(pointElement,vector){
    pointElement.style.left = `${vector.x}px`;
    pointElement.style.top = `${vector.y}px`;
  }

}

const SetUp3D = new setUp3D()

export {
  SetUp3D
}
