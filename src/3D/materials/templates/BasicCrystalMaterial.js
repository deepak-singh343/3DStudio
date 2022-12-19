import * as IJEWEL from 'ijewel'
import { Color, Mesh, Vector3 } from 'three'

export class BasicCrystalMaterial {
  constructor ({ object, envMap, renderer }) {
    this.id = 'BasicCrystalMaterial'
    this.color = '#ff9f00'
    this.boostFactors = new Vector3(2, 0.50, 0)
    this.metalness = 0.8
    this.roughness = 0
    this.opacity = 0.8
    this.squashFactor = null
    this.dispersion = 1.2
    this.absorbptionFactor = null
    this.geometryFactor = null
    this.gammaFactor = null

    this.material = new IJEWEL.DiamondMaterial(object, envMap, renderer)
    this.originalObject = this.cloneObject(object)
    this.object = object
    this.objects = []
  }

  cloneObject (object) {
    return new Mesh(object.geometry, object.material)
  }

  setMaterialProperties ({
    color, metalness, roughness, opacity,
    boostFactors, dispersion, gammaFactor,
    squashFactor, absorbptionFactor, geometryFactor
  }) {
    this.color = color || this.color
    this.metalness = metalness || this.metalness
    this.roughness = roughness || this.roughness
    this.opacity = opacity || this.opacity
    this.boostFactors = boostFactors || this.boostFactors
    this.dispersion = dispersion || this.dispersion
    this.squashFactor = squashFactor || this.squashFactor
    this.absorbptionFactor = absorbptionFactor || this.absorbptionFactor
    this.geometryFactor = geometryFactor || this.geometryFactor
    this.gammaFactor = gammaFactor || this.gammaFactor

    this.objects.forEach(object => {
      object.getMaterial().envMapIntensity = 1
      object.getMaterial().transparent = true

      object.getMaterial().metalness = this.metalness
      object.getMaterial().roughness = this.roughness
      object.getMaterial().color = new Color(this.color)
      object.getMaterial().opacity = this.opacity
      object.getMaterial().dispersion = this.dispersion

      if (this.boostFactors) {
        object.getMaterial().boostFactors = this.boostFactors
      }

      if (this.squashFactor) {
        object.getMaterial().squashFactor = this.squashFactor
      }

      if (this.absorbptionFactor) {
        object.getMaterial().absorbptionFactor = this.absorbptionFactor
      }

      if (this.geometryFactor) {
        object.getMaterial().geometryFactor = this.geometryFactor
      }

      if (this.gammaFactor) {
        object.getMaterial().gammaFactor = this.gammaFactor
      }
    })
  }

  getMaterial () {
    return this.object.getMaterial()
  }

  attachMaterial (object) {
    if (object.getMesh) {
      object = object.getMesh()
    }
    object.material.dispose()
    object = new IJEWEL.Diamond(object, this.material)
    this.object = object

    this.objects.push(object)
    this.setMaterialProperties({})
  }
}
