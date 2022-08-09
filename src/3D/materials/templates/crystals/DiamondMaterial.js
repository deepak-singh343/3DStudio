import { Vector3 } from 'three'
import { BasicCrystalMaterial } from '../BasicCrystalMaterial'

export class DiamondMaterial extends BasicCrystalMaterial {
  constructor ({ object, envMap, renderer }) {
    super({ object, envMap, renderer })
    this.id = 'DiamondMaterial'
    this.color = '#ffffff'
    this.boostFactors = new Vector3(5, 5, 5)
    this.dispersion = 0.75
    this.opacity = 0.7
  }
}
