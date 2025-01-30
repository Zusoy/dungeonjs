import { Signal } from '@preact/signals-core';
import { RenderItem } from 'three';
import { MergedProperties } from './properties/merged.js';
export type WithCameraDistance = {
    cameraDistance: number;
};
export declare const cameraDistanceKey: unique symbol;
export declare const orderInfoKey: unique symbol;
export declare function reversePainterSortStable(a: RenderItem, b: RenderItem): number;
export declare const ElementType: {
    readonly Panel: 0;
    readonly Image: 1;
    readonly Object: 2;
    readonly Custom: 3;
    readonly Svg: 4;
    readonly Text: 5;
};
export type ElementType = (typeof ElementType)[keyof typeof ElementType];
export type OrderInfo = {
    majorIndex: number;
    elementType: ElementType;
    minorIndex: number;
    instancedGroupDependencies?: Signal<Record<string, any>> | Record<string, any>;
};
export type ZIndexProperties = {
    zIndexOffset?: ZIndexOffset;
};
export type ZIndexOffset = {
    major?: number;
    minor?: number;
} | number;
export declare function computedOrderInfo(propertiesSignal: Signal<MergedProperties> | undefined, type: ElementType, instancedGroupDependencies: Signal<Record<string, any>> | Record<string, any> | undefined, parentOrderInfoSignal: Signal<OrderInfo | undefined> | undefined): Signal<OrderInfo | undefined>;
export declare function setupRenderOrder<T>(result: T, rootCameraDistance: WithCameraDistance, orderInfo: {
    value: OrderInfo | undefined;
}): T;
