import { createContainer } from '../components/container.js';
import { effect, signal, untracked } from '@preact/signals-core';
import { initialize, unsubscribeSubscriptions } from '../utils.js';
import { Parent, createParentContextSignal, setupParentContextSignal, bindHandlers } from './utils.js';
export class Container extends Parent {
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
            const internals = (this.internals = createContainer(parentContext, this.styleSignal, this.propertiesSignal, this.defaultPropertiesSignal, { current: this }, { current: this.childrenContainer }));
            this.mergedProperties = internals.mergedProperties;
            this.contextSignal.value = Object.assign(internals, { fontFamiliesSignal: parentContext.fontFamiliesSignal });
            //setup events
            const subscriptions = [];
            super.add(internals.interactionPanel);
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
