export class Material3D {
  constructor ({ id, type, representativeImage, label }) {
    this.id = id
    this.representativeImage = representativeImage
    this.label = label
    this.color = 0xffffff
    this.type = type
  }
}
