import { BasicCrystalMaterial } from './3D/materials/templates/BasicCrystalMaterial'
import { BasicMetalMaterial } from './3D/materials/templates/BasicMetalMaterial'
import { BasicPhongMaterial } from './3D/materials/templates/BasicPhongMaterial'
import { DiamondMaterial } from './3D/materials/templates/crystals/DiamondMaterial'
import { GoldMaterial } from './3D/materials/templates/GoldMaterial'
import { GradedLensMaterial } from './3D/materials/templates/physical/GradedLensMaterial'
const metalJson= [
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

const pearlJson = [
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

const bottomPearlJson = [
    {
      id: 'GoldMaterial',
      representativeImage: 'img/gold.png',
      label: 'Gold',
      type: GoldMaterial
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

const crystalJson = [
    {
      id: 'GoldMaterial',
      representativeImage: 'img/gold.png',
      label: 'Gold',
      type: GoldMaterial
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

const diamondJson = [
    {
      id: 'GoldMaterial',
      representativeImage: 'img/gold.png',
      label: 'Gold',
      type: GoldMaterial
    },
    {
      id: 'DiamondMaterial',
      representativeImage: 'img/clear-crystal.png',
      label: 'Diamond',
      type: DiamondMaterial
    }
]

export {
    metalJson,pearlJson,bottomPearlJson,crystalJson,diamondJson
}