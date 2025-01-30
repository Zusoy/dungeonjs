import { computed, Signal } from '@preact/signals-core';
import { computedInheritableProperty } from './properties/index.js';
export const percentageRegex = /(-?\d+(?:\.\d+)?)%/;
export function unsubscribeSubscriptions(subscriptions) {
    const length = subscriptions.length;
    for (let i = 0; i < length; i++) {
        subscriptions[i]();
    }
    subscriptions.length = 0;
}
export function initialize(inits, subscriptions) {
    const length = inits.length;
    for (let i = 0; i < length; i++) {
        const unsubscribe = inits[i](subscriptions);
        if (Array.isArray(unsubscribe)) {
            continue;
        }
        subscriptions.push(unsubscribe);
    }
}
export const alignmentXMap = { left: 0.5, center: 0, middle: 0, right: -0.5 };
export const alignmentYMap = { top: -0.5, center: 0, middle: 0, bottom: 0.5 };
export const alignmentZMap = { back: -0.5, center: 0, middle: 0, front: 0.5 };
/**
 * calculates the offsetX, offsetY, and scale to fit content with size [aspectRatio, 1] inside
 */
export function fitNormalizedContentInside(offsetTarget, scaleTarget, size, paddingInset, borderInset, pixelSize, aspectRatio) {
    if (size.value == null || paddingInset.value == null || borderInset.value == null) {
        return;
    }
    const [width, height] = size.value;
    const [pTop, pRight, pBottom, pLeft] = paddingInset.value;
    const [bTop, bRight, bBottom, bLeft] = borderInset.value;
    const topInset = pTop + bTop;
    const rightInset = pRight + bRight;
    const bottomInset = pBottom + bBottom;
    const leftInset = pLeft + bLeft;
    offsetTarget.set((leftInset - rightInset) * 0.5 * pixelSize, (bottomInset - topInset) * 0.5 * pixelSize, 0);
    const innerWidth = width - leftInset - rightInset;
    const innerHeight = height - topInset - bottomInset;
    const flexRatio = innerWidth / innerHeight;
    if (flexRatio > aspectRatio) {
        scaleTarget.setScalar(innerHeight * pixelSize);
        return;
    }
    scaleTarget.setScalar((innerWidth * pixelSize) / aspectRatio);
}
export function readReactive(value) {
    return value instanceof Signal ? value.value : value;
}
export function createConditionalPropertyTranslator(condition) {
    const signalMap = new Map();
    return (properties, merged) => {
        if (typeof properties != 'object') {
            throw new Error(`Invalid properties "${properties}"`);
        }
        for (const key in properties) {
            const value = properties[key];
            if (value === undefined) {
                return;
            }
            let result = signalMap.get(value);
            if (result == null) {
                signalMap.set(value, (result = computed(() => (condition() ? readReactive(value) : undefined))));
            }
            merged.add(key, result);
        }
    };
}
export function computedBorderInset(propertiesSignal, keys) {
    const sizes = keys.map((key) => computedInheritableProperty(propertiesSignal, key, 0));
    return computed(() => sizes.map((size) => size.value));
}
