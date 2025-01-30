import { createParentContextSignal, setupParentContextSignal, bindHandlers, Component } from './utils.js';
import { effect, signal, untracked } from '@preact/signals-core';
import { initialize, unsubscribeSubscriptions } from '../utils.js';
import { createIcon } from '../components/icon.js';
export class Icon extends Component {
    mergedProperties;
    styleSignal = signal(undefined);
    propertiesSignal;
    defaultPropertiesSignal;
    parentContextSignal = createParentContextSignal();
    unsubscribe;
    internals;
    constructor(text, svgWidth, svgHeight, properties, defaultProperties) {
        super();
        this.matrixAutoUpdate = false;
        setupParentContextSignal(this.parentContextSignal, this);
        this.propertiesSignal = signal(properties);
        this.defaultPropertiesSignal = signal(defaultProperties);
        this.unsubscribe = effect(() => {
            const parentContext = this.parentContextSignal.value?.value;
            if (parentContext == null) {
                return;
            }
            const internals = (this.internals = createIcon(parentContext, text, svgWidth, svgHeight, this.styleSignal, this.propertiesSignal, this.defaultPropertiesSignal, { current: this }));
            this.mergedProperties = internals.mergedProperties;
            super.add(internals.interactionPanel);
            super.add(internals.iconGroup);
            const subscriptions = [];
            initialize(internals.initializers, subscriptions);
            bindHandlers(internals.handlers, this, subscriptions);
            return () => {
                this.remove(internals.interactionPanel);
                this.remove(internals.iconGroup);
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
