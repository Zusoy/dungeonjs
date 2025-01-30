import { Signal } from '@preact/signals-core';
import { Vector2Tuple, Color, Vector3Tuple, Vector3 } from 'three';
import { Inset } from './flex/node.js';
import { MergedProperties } from './properties/merged.js';
export declare const percentageRegex: RegExp;
export type ColorRepresentation = Color | string | number | Vector3Tuple;
export type Initializers = Array<(subscriptions: Subscriptions) => Subscriptions | (() => void)>;
export type Subscriptions = Array<() => void>;
export declare function unsubscribeSubscriptions(subscriptions: Subscriptions): void;
export declare function initialize(inits: Initializers, subscriptions: Subscriptions): void;
export declare const alignmentXMap: {
    left: number;
    center: number;
    middle: number;
    right: number;
};
export declare const alignmentYMap: {
    top: number;
    center: number;
    middle: number;
    bottom: number;
};
export declare const alignmentZMap: {
    back: number;
    center: number;
    middle: number;
    front: number;
};
/**
 * calculates the offsetX, offsetY, and scale to fit content with size [aspectRatio, 1] inside
 */
export declare function fitNormalizedContentInside(offsetTarget: Vector3, scaleTarget: Vector3, size: Signal<Vector2Tuple | undefined>, paddingInset: Signal<Inset | undefined>, borderInset: Signal<Inset | undefined>, pixelSize: number, aspectRatio: number): void;
export declare function readReactive<T>(value: T | Signal<T>): T;
export declare function createConditionalPropertyTranslator(condition: () => boolean): (properties: unknown, merged: MergedProperties) => void;
export declare function computedBorderInset(propertiesSignal: Signal<MergedProperties>, keys: ReadonlyArray<string>): Signal<Inset>;
