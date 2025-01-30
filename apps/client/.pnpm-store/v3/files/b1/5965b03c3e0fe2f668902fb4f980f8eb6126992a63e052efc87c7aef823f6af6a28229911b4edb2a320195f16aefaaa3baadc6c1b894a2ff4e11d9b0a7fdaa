import { Signal } from '@preact/signals-core';
import { Vector2Tuple } from 'three';
import { PropertyTransformers } from './properties/merged.js';
declare const breakPoints: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
};
export type WithResponsive<T> = T & {
    [Key in keyof typeof breakPoints]?: T;
};
export declare function createResponsivePropertyTransformers(rootSize: Signal<Vector2Tuple | undefined>): PropertyTransformers;
export {};
