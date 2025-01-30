import { ReadonlySignal, Signal } from '@preact/signals-core';
import { Matrix4, Vector2Tuple } from 'three';
import { FlexNodeState } from './flex/node.js';
import { ColorRepresentation, Initializers } from './utils.js';
import { ClippingRect } from './clipping.js';
import { PanelProperties } from './panel/instanced-panel.js';
import { OrderInfo } from './order.js';
import { MergedProperties } from './properties/merged.js';
import { PanelGroupManager } from './panel/instanced-panel-group.js';
import { Object3DRef, RootContext } from './context.js';
import { ScrollListeners } from './listeners.js';
import { EventHandlers } from './events.js';
export type ScrollEventHandlers = Pick<EventHandlers, 'onPointerDown' | 'onPointerUp' | 'onPointerMove' | 'onWheel' | 'onPointerLeave' | 'onPointerCancel'>;
export declare function createScrollPosition(): Signal<Vector2Tuple>;
export declare function computedGlobalScrollMatrix(scrollPosition: Signal<Vector2Tuple>, globalMatrix: Signal<Matrix4 | undefined>, pixelSizeSignal: Signal<number>): ReadonlySignal<Matrix4 | undefined>;
export declare function applyScrollPosition(object: Object3DRef, scrollPosition: Signal<Vector2Tuple>, pixelSizeSignal: Signal<number>, initializers: Initializers): number;
export declare function computedAnyAncestorScrollable(scrollable: Signal<[boolean, boolean]>, anyAncestorScrollable: Signal<readonly [boolean, boolean]> | undefined): ReadonlySignal<readonly [boolean, boolean]>;
export declare function computedScrollHandlers(scrollPosition: Signal<Vector2Tuple | undefined>, anyAncestorScrollable: Signal<readonly [boolean, boolean]> | undefined, nodeState: FlexNodeState, object: Object3DRef, scrollbarWidth: Signal<number>, listeners: Signal<ScrollListeners | undefined>, root: Pick<RootContext, 'onFrameSet' | 'requestRender' | 'pixelSize' | 'requestFrame'>, initializers: Initializers): ReadonlySignal<ScrollEventHandlers | undefined>;
/**
 * true = positivie
 * false = negative
 */
export type Sign = boolean;
export type ScrollbarWidthProperties = {
    scrollbarWidth?: number;
};
export type ScrollbarBorderSizeProperties = {
    scrollbarBorderRightWidth?: number;
    scrollbarBorderTopWidth?: number;
    scrollbarBorderLeftWidth?: number;
    scrollbarBorderBottomWidth?: number;
};
export type ScrollbarProperties = {
    scrollbarOpacity?: number;
    scrollbarColor?: ColorRepresentation;
} & ScrollbarWidthProperties & ScrollbarBorderSizeProperties & {
    [Key in Exclude<keyof PanelProperties, 'backgroundColor' | 'backgroundOpacity'> as `scrollbar${Capitalize<Key>}`]: PanelProperties[Key];
};
export declare function createScrollbars(propertiesSignal: Signal<MergedProperties>, scrollPosition: Signal<Vector2Tuple>, flexState: FlexNodeState, globalMatrix: Signal<Matrix4 | undefined>, isVisible: Signal<boolean>, parentClippingRect: Signal<ClippingRect | undefined> | undefined, orderInfo: Signal<OrderInfo | undefined>, panelGroupManager: PanelGroupManager, scrollbarWidth: Signal<number>, initializers: Initializers): void;
