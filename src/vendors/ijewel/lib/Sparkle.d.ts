import { Camera, Matrix4, Mesh, ShaderMaterial, Vector3 } from "three";
export declare class Sparkle {
    private texture_;
    private geometry_;
    private noiseTexture_;
    private material_;
    private mesh_;
    private rotationSpeedFactor_;
    constructor(sparkleTexture: any, noiseTexture: any);
    get mesh(): Mesh;
    get material(): ShaderMaterial;
    shallowCopy(): Sparkle;
    setScale(scale: Vector3): void;
    setIntensity(intensity: number): void;
    setRotation(rotation: number): void;
    setRotationSpeedFactor(rotationSpeedFactor: number): void;
    setPositionOffset(offsetx: number, offsety: number, offsetz: number): void;
    alignWithCamera(camera: Camera): void;
    syncWithTransform(transform: Matrix4, offset: Vector3): void;
}
