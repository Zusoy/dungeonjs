import { ReadonlySignal } from '@preact/signals-core';
import type { InheritableContainerProperties, InheritableRootProperties, InheritableImageProperties, InheritableContentProperties, InheritableCustomContainerProperties, InheritableTextProperties, InheritableIconProperties, InheritableInputProperties, InheritableSvgProperties } from '../components/index.js';
export type AllOptionalProperties = InheritableContainerProperties | InheritableRootProperties | InheritableImageProperties | InheritableContentProperties | InheritableCustomContainerProperties | InheritableImageProperties | InheritableSvgProperties | InheritableTextProperties | InheritableIconProperties | InheritableInputProperties;
export type WithReactive<T> = {
    [Key in keyof T]?: T[Key] | ReadonlySignal<T[Key] | undefined>;
};
export type Properties = Record<string, unknown>;
export type WithClasses<T> = T & {
    classes?: T | Array<T>;
};
export declare function traverseProperties<T>(style: WithClasses<T> | undefined, properties: WithClasses<T> | undefined, defaultProperties: AllOptionalProperties | undefined, fn: (properties: T) => void): void;
