import { Signal } from '@preact/signals-core';
import { PanelProperties } from './panel/instanced-panel.js';
import { Matrix4, Vector2Tuple } from 'three';
import { ClippingRect } from './clipping.js';
import { OrderInfo } from './order.js';
import { ColorRepresentation, Initializers } from './utils.js';
import { PanelGroupManager } from './panel/index.js';
import { MergedProperties } from './properties/index.js';
export type SelectionBoxes = Array<{
    size: Vector2Tuple;
    position: Vector2Tuple;
}>;
export type SelectionBorderSizeProperties = {
    selectionBorderRightWidth?: number;
    selectionBorderTopWidth?: number;
    selectionBorderLeftWidth?: number;
    selectionBorderBottomWidth?: number;
};
export type SelectionProperties = {
    selectionOpacity?: number;
    selectionColor?: ColorRepresentation;
} & SelectionBorderSizeProperties & {
    [Key in Exclude<keyof PanelProperties, 'backgroundColor' | 'backgroundOpacity'> as `selection${Capitalize<Key>}`]: PanelProperties[Key];
};
export declare function createSelection(propertiesSignal: Signal<MergedProperties>, matrix: Signal<Matrix4 | undefined>, selectionBoxes: Signal<SelectionBoxes>, isVisible: Signal<boolean>, prevOrderInfo: Signal<OrderInfo | undefined>, parentClippingRect: Signal<ClippingRect | undefined> | undefined, panelGroupManager: PanelGroupManager, initializers: Initializers): Signal<OrderInfo | undefined>;
