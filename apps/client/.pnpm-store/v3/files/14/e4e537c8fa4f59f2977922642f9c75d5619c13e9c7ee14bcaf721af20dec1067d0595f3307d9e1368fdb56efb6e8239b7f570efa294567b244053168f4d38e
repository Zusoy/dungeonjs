import { OrthographicCamera, PerspectiveCamera, Vector2 } from 'three';
import { Root } from './root.js';
import { batch, signal } from '@preact/signals-core';
import { updateSizeFullscreen } from '../components/index.js';
const vectorHelper = new Vector2();
export class Fullscreen extends Root {
    renderer;
    distanceToCamera;
    parentCameraSignal;
    sizeX;
    sizeY;
    pixelSize;
    transformTranslateZ;
    constructor(renderer, distanceToCamera, properties, defaultProperties, fontFamilies, requestRender) {
        const sizeX = signal(0);
        const sizeY = signal(0);
        const pixelSize = signal(0);
        const transformTranslateZ = signal(0);
        const parentCameraSignal = signal(undefined);
        super(parentCameraSignal, renderer, { ...properties, sizeX, sizeY, pixelSize, transformTranslateZ }, defaultProperties, fontFamilies, requestRender);
        this.renderer = renderer;
        this.distanceToCamera = distanceToCamera;
        this.matrixAutoUpdate = false;
        this.parentCameraSignal = parentCameraSignal;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.pixelSize = pixelSize;
        this.transformTranslateZ = transformTranslateZ;
        this.addEventListener('added', () => {
            if (!(this.parent instanceof PerspectiveCamera || this.parent instanceof OrthographicCamera)) {
                throw new Error(`fullscreen can only be added to a camera`);
            }
            this.parentCameraSignal.value = this.parent;
            this.distanceToCamera ??= this.parent.near + 0.1;
            this.update();
        });
        this.addEventListener('removed', () => (this.parentCameraSignal.value = undefined));
    }
    /**
     * must be called when camera.fov, camera.top, camera.bottom, camera.right, camera.left, camera.zoom, camera.aspect changes
     */
    update() {
        const parentCamera = this.parentCameraSignal.peek();
        if (this.distanceToCamera == null || parentCamera == null) {
            return;
        }
        batch(() => {
            updateSizeFullscreen(this.sizeX, this.sizeY, this.pixelSize, this.distanceToCamera, parentCamera, this.renderer.getSize(vectorHelper).y);
            this.transformTranslateZ.value = -this.distanceToCamera / this.pixelSize.value;
        });
    }
    getStyle() {
        return this.styleSignal.peek();
    }
    setStyle(style, replace) {
        super.setStyle(style, replace);
    }
    setProperties(properties) {
        super.setProperties({
            ...properties,
            sizeX: this.sizeX,
            sizeY: this.sizeY,
            pixelSize: this.pixelSize,
            transformTranslateZ: this.transformTranslateZ,
        });
    }
}
