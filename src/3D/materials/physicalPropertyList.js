export const physicalPropertyList = {
  color: {
    type: 'color'
  },
  specular: {
    type: 'color'
  },
  shininess: {
    type: 'range',
    step: 1,
    max: 100,
    min: 0
  },
  reflectivity: {
    type: 'range',
    step: 0.01,
    max: 1,
    min: 0
  },
  refractionRatio: {
    type: 'range',
    step: 0.01,
    max: 1,
    min: 0
  },
  metalness: {
    type: 'range',
    step: 0.01,
    max: 1,
    min: 0
  },
  roughness: {
    type: 'range',
    step: 0.01,
    max: 1,
    min: 0
  },
  opacity: {
    type: 'range',
    step: 0.05,
    max: 1,
    min: 0
  },

  dispersion: {
    type: 'range',
    step: 0.01,
    max: 1,
    min: 0
  },

  squashFactor: {
    type: 'range',
    step: 0.05,
    max: 2,
    min: 0
  },
  absorbptionFactor: {
    type: 'range',
    step: 0.05,
    max: 1,
    min: 0
  },
  gammaFactor: {
    type: 'range',
    step: 0.05,
    max: 1,
    min: 0
  },
  geometryFactor: {
    type: 'range',
    step: 0.01,
    max: 0.5,
    min: 0.1
  },
  boostFactors: {
    type: 'vector3'
  },

  clearCoat: {
    type: 'range',
    step: 0.1,
    max: 1,
    min: 0
  },

  clearCoatRoughness: {
    type: 'range',
    step: 0.01,
    max: 1,
    min: 0
  },

  transmission: {
    type: 'range',
    step: 0.01,
    max: 1,
    min: 0
  },

  sheen: {
    type: 'range',
    step: 0.1,
    max: 1,
    min: 0
  },

  sheenTint: {
    type: 'color'
  }

}
