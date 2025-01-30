import { createImage } from '../components/image.js';
import { Parent, createParentContextSignal, setupParentContextSignal, bindHandlers } from './utils.js';
import { effect, signal, untracked } from '@preact/signals-core';
import { initialize, unsubscribeSubscriptions } from '../utils.js';
export class Image extends Parent {
    mergedProperties;
    styleSignal = signal(undefined);
    propertiesSignal;
    defaultPropertiesSignal;
    parentContextSignal = createParentContextSignal();
    unsubscribe;
    internals;
    constructor(properties, defaultProperties) {
        super();
        setupParentContextSignal(this.parentContextSignal, this);
        this.matrixAutoUpdate = false;
        this.propertiesSignal = signal(properties);
        this.defaultPropertiesSignal = signal(defaultProperties);
        this.unsubscribe = effect(() => {
            const parentContext = this.parentContextSignal.value?.value;
            if (parentContext == null) {
                return;
            }
            const internals = (this.internals = createImage(parentContext, this.styleSignal, this.propertiesSignal, this.defaultPropertiesSignal, { current: this }, { current: this.childrenContainer }));
            this.mergedProperties = internals.mergedProperties;
            this.contextSignal.value = Object.assign(internals, { fontFamiliesSignal: parentContext.fontFamiliesSignal });
            super.add(internals.interactionPanel);
            const subscriptions = [];
            initialize(internals.initializers, subscriptions);
            bindHandlers(internals.handlers, this, subscriptions);
            return () => {
                this.remove(internals.interactionPanel);
                unsubscribeSubscriptions(subscriptions);
            };
        });
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
