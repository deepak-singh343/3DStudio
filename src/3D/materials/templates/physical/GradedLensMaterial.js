import { TextureLoader } from 'three'
import { BasicPhysicalMaterial } from '../BasicPhysicalMaterial'

export class GradedLensMaterial extends BasicPhysicalMaterial {
  constructor ({ object, envMap, renderer }) {
    super({ object, envMap, renderer })
    this.id = 'GradedLensMaterial'
    this.color = 'rgb(255, 255, 255)'

    this.loadTransmissionMap()
  }

  loadTransmissionMap () {
    const textureURL = 'https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/threejs/emissive6.jpeg'

    const texture = new TextureLoader().load(textureURL)

    this.material.emissiveMap = texture

    const textureURL2 = 'https://mirrar-medialibrary.s3.ap-south-1.amazonaws.com/threejs/Mustang_opacity.jpg'

    const texture2 = new TextureLoader().load(textureURL2)
    this.material.alphaMap = texture2
  }
}
