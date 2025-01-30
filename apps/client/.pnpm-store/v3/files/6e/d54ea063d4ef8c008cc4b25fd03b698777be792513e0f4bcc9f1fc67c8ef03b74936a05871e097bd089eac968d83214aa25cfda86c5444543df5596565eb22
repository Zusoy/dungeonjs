import { Signal } from '@preact/signals-core';
import { Matrix4, Vector3Tuple } from 'three';
import { ClippingRect } from './clipping.js';
import { OrderInfo } from './order.js';
import { PanelProperties } from './panel/instanced-panel.js';
import { ColorRepresentation, Initializers } from './utils.js';
import { PanelGroupManager } from './panel/index.js';
import { MergedProperties } from './properties/index.js';
export type CaretWidthProperties = {
    caretWidth?: number;
};
export type CaretBorderSizeProperties = {
    caretBorderRightWidth?: number;
    caretBorderTopWidth?: number;
    caretBorderLeftWidth?: number;
    caretBorderBottomWidth?: number;
};
export type CaretProperties = {
    caretOpacity?: number;
    caretColor?: ColorRepresentation;
} & CaretWidthProperties & CaretBorderSizeProperties & {
    [Key in Exclude<keyof PanelProperties, 'backgroundColor' | 'backgroundOpacity'> as `caret${Capitalize<Key>}`]: PanelProperties[Key];
};
export declare function createCaret(propertiesSignal: Signal<MergedProperties>, matrix: Signal<Matrix4 | undefined>, caretPosition: Signal<Vector3Tuple | undefined>, isVisible: Signal<boolean>, parentOrderInfo: Signal<OrderInfo | undefined>, parentClippingRect: Signal<ClippingRect | undefined> | undefined, panelGroupManager: PanelGroupManager, initializers: Initializers): void;
