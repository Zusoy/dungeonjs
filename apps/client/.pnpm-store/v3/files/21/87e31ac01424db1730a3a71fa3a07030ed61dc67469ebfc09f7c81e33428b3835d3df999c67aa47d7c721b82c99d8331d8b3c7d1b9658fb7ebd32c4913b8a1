import { Vector2Tuple } from 'three';
import { Signal } from '@preact/signals-core';
import { FlexDirection, MeasureFunction, Node, Overflow } from 'yoga-layout/load';
import { setter } from './setter.js';
import { Subscriptions } from '../utils.js';
import { MergedProperties } from '../properties/merged.js';
import { Object3DRef } from '../context.js';
export type YogaProperties = {
    [Key in keyof typeof setter]?: Parameters<(typeof setter)[Key]>[1];
};
export type Inset = [top: number, right: number, bottom: number, left: number];
export type CustomLayouting = {
    minWidth: number;
    minHeight: number;
    measure: MeasureFunction;
};
export type FlexNodeState = ReturnType<typeof createFlexNodeState>;
export declare function createFlexNodeState(): {
    size: Signal<Vector2Tuple | undefined>;
    relativeCenter: Signal<Vector2Tuple | undefined>;
    borderInset: Signal<Inset | undefined>;
    overflow: Signal<Overflow>;
    displayed: Signal<boolean>;
    scrollable: Signal<[boolean, boolean]>;
    paddingInset: Signal<Inset | undefined>;
    maxScrollPosition: Signal<[(number | undefined)?, (number | undefined)?]>;
};
export declare class FlexNode {
    private state;
    private readonly propertiesSignal;
    private readonly requestCalculateLayout;
    private object;
    private objectVisibileDefault;
    private children;
    private yogaNode;
    private layoutChangeListeners;
    private customLayouting?;
    private active;
    private objectVisible;
    constructor(state: FlexNodeState, propertiesSignal: Signal<MergedProperties>, requestCalculateLayout: () => void, object: Object3DRef, objectVisibileDefault: boolean, subscriptions: Subscriptions);
    setCustomLayouting(layouting: CustomLayouting | undefined): void;
    private updateMeasureFunction;
    /**
     * use requestCalculateLayout instead
     */
    calculateLayout(): void;
    addChild(node: FlexNode): void;
    removeChild(node: FlexNode): void;
    commit(parentDirection: FlexDirection): void;
    updateMeasurements(displayed: boolean, parentWidth: number | undefined, parentHeight: number | undefined): Vector2Tuple;
    addLayoutChangeListener(listener: () => void): () => undefined;
}
export declare function setMeasureFunc(node: Node, func: MeasureFunction | undefined): void;
