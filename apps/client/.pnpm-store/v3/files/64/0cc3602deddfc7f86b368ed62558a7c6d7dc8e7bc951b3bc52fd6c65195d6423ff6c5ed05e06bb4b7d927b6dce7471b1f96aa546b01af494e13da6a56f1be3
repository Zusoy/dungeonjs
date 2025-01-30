import { computed, effect, signal, untracked } from '@preact/signals-core';
import { createRoot, DEFAULT_PIXEL_SIZE } from '../components/root.js';
import { Parent, bindHandlers } from './utils.js';
import { initialize, readReactive, unsubscribeSubscriptions } from '../utils.js';
export class Root extends Parent {
    mergedProperties;
    styleSignal = signal(undefined);
    propertiesSignal;
    defaultPropertiesSignal;
    unsubscribe;
    onFrameSet = new Set();
    fontFamiliesSignal;
    pixelSizeSignal;
    internals;
    constructor(camera, renderer, properties, defaultProperties, fontFamilies, requestRender, requestFrame) {
        super();
        this.pixelSizeSignal = signal(properties?.pixelSize ?? DEFAULT_PIXEL_SIZE);
        this.matrixAutoUpdate = false;
        this.fontFamiliesSignal = signal(fontFamilies);
        this.propertiesSignal = signal(properties);
        this.defaultPropertiesSignal = signal(defaultProperties);
        this.unsubscribe = effect(() => {
            let getCamera;
            if (typeof camera === 'function') {
                getCamera = camera;
            }
            else {
                const cam = readReactive(camera);
                if (cam == null) {
                    this.contextSignal.value = undefined;
                    return;
                }
                getCamera = () => cam;
            }
            const internals = (this.internals = createRoot(computed(() => readReactive(this.pixelSizeSignal.value) ?? DEFAULT_PIXEL_SIZE), this.styleSignal, this.propertiesSignal, this.defaultPropertiesSignal, { current: this }, { current: this.childrenContainer }, getCamera, renderer, this.onFrameSet, requestRender, requestFrame));
            this.mergedProperties = internals.mergedProperties;
            this.contextSignal.value = Object.assign(internals, { fontFamiliesSignal: this.fontFamiliesSignal });
            super.add(internals.interactionPanel);
            const subscriptions = [];
            initialize(internals.initializers, subscriptions);
            bindHandlers(internals.handlers, this, subscriptions);
            return () => {
                this.onFrameSet.clear();
                this.remove(internals.interactionPanel);
                unsubscribeSubscriptions(subscriptions);
            };
        });
    }
    update(delta) {
        for (const onFrame of this.onFrameSet) {
            onFrame(delta);
        }
    }
    setFontFamilies(fontFamilies) {
        this.fontFamiliesSignal.value = fontFamilies;
    }
    getComputedProperty(key) {
        return untracked(() => this.mergedProperties?.value.read(key, undefined));
    }
    getStyle() {
        return this.styleSignal.peek();
    }
    setStyle(style, replace) {
        this.styleSignal.value = replace ? style : { ...this.styleSignal.value, ...style };
    }
    setProperties(properties) {
        this.pixelSizeSignal.value = properties?.pixelSize ?? DEFAULT_PIXEL_SIZE;
        this.propertiesSignal.value = properties;
    }
    setDefaultProperties(properties) {
        this.defaultPropertiesSignal.value = properties;
    }
    destroy() {
        this.parent?.remove(this);
        this.unsubscribe();
    }
}
