import { Box3, InstancedBufferAttribute, Material, Mesh, Sphere } from 'three';
export declare class InstancedGlyphMesh extends Mesh {
    readonly instanceMatrix: InstancedBufferAttribute;
    readonly instanceRGBA: InstancedBufferAttribute;
    readonly instanceUV: InstancedBufferAttribute;
    readonly instanceClipping: InstancedBufferAttribute;
    count: number;
    protected readonly isInstancedMesh = true;
    readonly instanceColor: null;
    readonly morphTexture: null;
    readonly boundingBox: Box3;
    readonly boundingSphere: Sphere;
    constructor(instanceMatrix: InstancedBufferAttribute, instanceRGBA: InstancedBufferAttribute, instanceUV: InstancedBufferAttribute, instanceClipping: InstancedBufferAttribute, material: Material);
    copy(): this;
    dispose(): void;
    computeBoundingBox(): void;
    computeBoundingSphere(): void;
    updateMorphTargets(): void;
    raycast(): void;
    spherecast(): void;
}
