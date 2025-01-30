import { Signal } from '@preact/signals-core';
export type WithFocus<T> = T & {
    focus?: T;
    onFocusChange?: (focus: boolean) => void;
};
export declare function createFocusPropertyTransformers(hasFocusSignal: Signal<boolean>): {
    focus: (properties: unknown, merged: import("./internals.js").MergedProperties) => void;
};
