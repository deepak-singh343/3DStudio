import { MeshStandardMaterial } from 'three'
import { BasicMetalMaterial } from './BasicMetalMaterial'

export class GoldMaterial extends BasicMetalMaterial {
  constructor ({ object, envMap, renderer }) {
    super({ object, envMap, renderer })
    this.id = 'GoldMaterial'
    this.color = 'rgb(215, 183, 64)'
    this.metalness = 1
    this.roughness = 0.33
    this.opacity = 1

    this.material.color = this.color
    this.material.metalness = this.metalness
    this.material.roughness = this.roughness
    this.material.opacity = this.opacity
  }

  attachMaterial (object) {
    this.material = new MeshStandardMaterial({
      color: this.color,
      metalness: this.metalness,
      roughness: this.roughness,
      opacity: this.opacity
    })

    object.material = this.material
  }
}
