import { Color, MeshStandardMaterial } from 'three'

export class BasicMetalMaterial {
  constructor ({ object, envMap, renderer }) {
    this.id = 'BasicMetalMaterial'
    this.color = 'rgb(0, 0, 0)'
    this.metalness = 0.8
    this.roughness = 0
    this.opacity = 1

    this.material = new MeshStandardMaterial({
      color: this.color,
      metalness: this.metalness,
      roughness: this.roughness,
      transparent: true,
      opacity: this.opacity
    })
  }

  setMaterialProperties ({ color, metalness, roughness, opacity }) {
    this.color = color || this.color
    this.metalness = metalness || this.metalness
    this.roughness = roughness || this.roughness
    this.opacity = opacity || this.opacity

    this.material.color = new Color(this.color)
    this.material.metalness = this.metalness
    this.material.roughness = this.roughness
    this.material.opacity = parseFloat(this.opacity)
  }

  getMaterial () {
    return this.material
  }

  attachMaterial (object) {
    if (object.getMesh) {
      object = object.getMesh()
    }
    object.material = this.material
  }
}
