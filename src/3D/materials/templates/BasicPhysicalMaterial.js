import { Color, DoubleSide, MeshPhysicalMaterial } from 'three'
// import { TextureLoader } from '../../three.module.v109'

export class BasicPhysicalMaterial {
  constructor ({ object, envMap, renderer }) {
    this.id = 'BasicPhysicalMaterial'
    this.color = 'rgb(0, 0, 0)'
    this.metalness = 0.8
    this.roughness = 0
    this.opacity = 1
    this.clearCoat = 0
    this.clearCoatRoughness = 0
    this.reflectivity = 0.8
    this.transmission = 0.8
    this.sheen = 0
    this.sheenTint = 'rgb(255,255,255)'

    this.material = new MeshPhysicalMaterial({
      envMap,
      envMapIntensity: 1.0,
      metalness: this.metalness,
      roughness: this.roughness,
      clearcoat: this.clearCoat,
      clearcoatRoughness: this.clearCoatRoughness,
      transparent: true,
      opacity: this.opacity,
      reflectivity: this.reflectivity,
      transmission: this.transmission,
      sheen: this.sheen
      // map: object.material.map
    })
  }

  setMaterialProperties ({
    color, metalness, roughness,
    opacity, reflectivity, clearCoat,
    clearCoatRoughness, transmission,
    sheen, sheenTint
  }) {
    this.color = color || this.color
    this.metalness = metalness || this.metalness
    this.roughness = roughness || this.roughness
    this.opacity = opacity || this.opacity
    this.clearCoat = clearCoat || this.clearCoat
    this.clearCoatRoughness = clearCoatRoughness || this.clearCoatRoughness
    this.reflectivity = reflectivity || this.reflectivity
    this.transmission = transmission || this.transmission
    this.sheen = sheen || this.sheen
    this.sheenTint = sheenTint || this.sheenTint

    this.material.color = new Color(this.color)

    // this.material.emissive = new Color(this.sheenTint)
    this.material.metalness = parseFloat(this.metalness)
    this.material.roughness = parseFloat(this.roughness)
    this.material.clearcoat = parseFloat(this.clearCoat)
    this.material.clearcoatRoughness = parseFloat(this.clearCoatRoughness)
    this.material.reflectivity = parseFloat(this.reflectivity)
    this.material.transmission = parseFloat(this.transmission)
    this.material.opacity = parseFloat(this.opacity)
    this.material.side = DoubleSide
    // this.material.sheen = parseFloat(this.sheen)
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
