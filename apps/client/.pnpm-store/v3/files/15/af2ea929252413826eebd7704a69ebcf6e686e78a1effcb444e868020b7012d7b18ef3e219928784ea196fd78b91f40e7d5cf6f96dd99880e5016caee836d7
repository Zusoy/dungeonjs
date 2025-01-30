import { PlaneGeometry, TypedArray } from 'three';
export type Constructor<T> = new (...args: any[]) => T;
export type FirstConstructorParameter<T extends new (...args: any[]) => any> = T extends new (property: infer P, ...args: any[]) => any ? P : never;
export declare function createPanelGeometry(): PlaneGeometry;
export declare function setComponentInFloat(from: number, index: number, value: number): number;
export declare const panelGeometry: PlaneGeometry;
export declare function setBorderRadius(data: TypedArray, indexInData: number, indexInFloat: number, value: number, height: number): void;
