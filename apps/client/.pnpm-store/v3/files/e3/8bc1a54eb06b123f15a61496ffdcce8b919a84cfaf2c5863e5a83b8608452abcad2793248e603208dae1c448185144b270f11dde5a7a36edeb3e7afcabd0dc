import { computed } from '@preact/signals-core';
import { readReactive } from '../utils.js';
export function computedInheritableProperty(propertiesSignal, key, defaultValue) {
    return computed(() => propertiesSignal.value.read(key, defaultValue));
}
export function computedNonInheritableProperty(style, properties, key, defaultValue) {
    return computed(() => readReactive(style.value?.[key]) ?? readReactive(properties.value?.[key]) ?? defaultValue);
}
