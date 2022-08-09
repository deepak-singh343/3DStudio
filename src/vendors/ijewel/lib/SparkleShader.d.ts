import * as THREE from "three";
export declare const SparkleShader: {
    vertexShader: string;
    fragmentShader: string;
    uniforms: {
        ModelViewMatrix: {
            type: string;
            value: THREE.Matrix4;
        };
        sparkleTexture: {
            type: string;
            value: null;
        };
        screenTexture: {
            type: string;
            value: null;
        };
        noiseTexture: {
            type: string;
            value: null;
        };
        scale: {
            type: string;
            value: number;
        };
        rotation: {
            type: string;
            value: number;
        };
        intensity: {
            type: string;
            value: number;
        };
    };
    side: THREE.Side;
};
