import { Parent, createParentContextSignal, bindHandlers, setupParentContextSignal } from './utils.js';
import { effect, signal, untracked } from '@preact/signals-core';
import { initialize, unsubscribeSubscriptions } from '../utils.js';
import { createSvg } from '../components/svg.js';
export class Svg extends Parent {
    mergedProperties;
    styleSignal = signal(undefined);
    propertiesSignal;
    defaultPropertiesSignal;
    parentContextSignal = createParentContextSignal();
    unsubscribe;
    internals;
    constructor(properties, defaultProperties) {
        super();
        this.matrixAutoUpdate = false;
        setupParentContextSignal(this.parentContextSignal, this);
        this.propertiesSignal = signal(properties);
        this.defaultPropertiesSignal = signal(defaultProperties);
        this.unsubscribe = effect(() => {
            const parentContext = this.parentContextSignal.value?.value;
            if (parentContext == null) {
                this.contextSignal.value = undefined;
                return;
            }
            const internals = (this.internals = createSvg(parentContext, this.styleSignal, this.propertiesSignal, this.defaultPropertiesSignal, { current: this }, { current: this.childrenContainer }));
            this.mergedProperties = internals.mergedProperties;
            this.contextSignal.value = Object.assign(internals, { fontFamiliesSignal: parentContext.fontFamiliesSignal });
            super.add(internals.interactionPanel);
            super.add(internals.centerGroup);
            const subscriptions = [];
            initialize(internals.initializers, subscriptions);
            bindHandlers(internals.handlers, this, subscriptions);
            return () => {
                this.remove(internals.interactionPanel);
                this.remove(internals.centerGroup);
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
