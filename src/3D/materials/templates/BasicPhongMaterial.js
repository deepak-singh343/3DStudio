import { Color, MeshPhongMaterial } from 'three'

export class BasicPhongMaterial {
  constructor ({ object, envMap, renderer }) {
    this.id = 'BasicPhongMaterial'
    this.color = 'rgb(0, 0, 0)'
    this.specular = 'rgb(0,0,0)'
    this.shininess = 100
    this.reflectivity = 1
    this.opacity = 1
    this.refractionRatio = 0.98

    this.material = new MeshPhongMaterial({
      color: this.color,
      specular: this.specular,
      transparent: true,
      opacity: this.opacity,
      reflectivity: this.reflectivity,
      refractionRatio: this.refractionRatio
    })
  }

  setMaterialProperties ({ color, shininess, reflectivity, refractionRatio, opacity, specular }) {
    this.color = color || this.color
    this.opacity = opacity || this.opacity
    this.specular = specular || this.specular
    this.shininess = shininess || this.shininess
    this.reflectivity = reflectivity || this.reflectivity
    this.refractionRatio = refractionRatio || this.refractionRatio

    this.material.color = new Color(this.color)
    this.material.opacity = parseFloat(this.opacity)
    this.material.shininess = this.shininess
    this.material.reflectivity = this.reflectivity
    this.material.refractionRatio = this.refractionRatio
    this.material.specular = new Color(this.specular)
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
