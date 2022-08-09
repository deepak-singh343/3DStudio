import { BasicCrystalMaterial } from './templates/BasicCrystalMaterial'
import { BasicMetalMaterial } from './templates/BasicMetalMaterial'
import { BasicPhongMaterial } from './templates/BasicPhongMaterial'
import { BasicPhysicalMaterial } from './templates/BasicPhysicalMaterial'
import { DiamondMaterial } from './templates/crystals/DiamondMaterial'
import { GoldMaterial } from './templates/GoldMaterial'
import { GradedLensMaterial } from './templates/physical/GradedLensMaterial'

// this is the material list and the id should never be changed for the materials
export const materialList = [
  {
    id: 'BasicMetalMaterial',
    representativeImage: 'img/silver-metal.png',
    label: 'Metal',
    type: BasicMetalMaterial
  },
  {
    id: 'GoldMaterial',
    representativeImage: 'img/gold.png',
    label: 'Gold',
    type: GoldMaterial
  },

  {
    id: 'BasicPhongMaterial',
    representativeImage: 'img/rose-metal.png',
    label: 'PhongMaterial',
    type: BasicPhongMaterial
  },

  {
    id: 'BasicPhysicalMaterial',
    representativeImage: 'img/metal-1.png',
    label: 'PhysicalMaterial',
    type: BasicPhysicalMaterial
  },

  {
    id: 'GradedLensMaterial',
    representativeImage: 'img/metal-1.png',
    label: 'GradedLens',
    type: GradedLensMaterial
  },

  {
    id: 'BasicCrystalMaterial',
    representativeImage: 'img/pink-crystal.png',
    label: 'Crystal',
    type: BasicCrystalMaterial
  },
  {
    id: 'DiamondMaterial',
    representativeImage: 'img/clear-crystal.png',
    label: 'Diamond',
    type: DiamondMaterial
  }
]
