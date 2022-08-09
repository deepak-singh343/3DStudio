import { Matrix4, Mesh, Vector3 } from "three";
export declare class Diamond {
    private mesh_;
    private sparkles_;
    private offset_;
    private boundingRadius_;
    constructor(mesh: Mesh, material: any);
    get isDiamond(): boolean;
    getCentreOffset(): Vector3;
    getBoundingRadius(): number;
    getMesh(): Mesh;
    getMaterial(): import("three").Material | import("three").Material[];
    setPosition(x: any, y: any, z: any): void;
    setRotation(x: any, y: any, z: any): void;
    setQuaternion(x: any, y: any, z: any, w: any): void;
    setScale(x: any, y: any, z: any): void;
    setTransform(xForm: Matrix4): void;
    updateDiamond(camera: any): void;
    addSparkle(sparkle: any): void;
    dispose(): void;
}
