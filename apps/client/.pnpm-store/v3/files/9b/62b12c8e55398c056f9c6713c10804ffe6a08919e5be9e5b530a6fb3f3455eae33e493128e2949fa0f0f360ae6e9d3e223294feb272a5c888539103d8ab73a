import { Signal } from '@preact/signals-core';
import { Initializers } from './utils.js';
import { PropertyTransformers } from './properties/merged.js';
import { EventHandlers } from './events.js';
import { AllOptionalProperties } from './properties/index.js';
export type WithHover<T> = T & {
    cursor?: string;
    hover?: T;
    onHoverChange?: (hover: boolean) => void;
};
export type HoverEventHandlers = Pick<EventHandlers, 'onPointerOver' | 'onPointerOut'>;
export declare function setupCursorCleanup(hoveredSignal: Signal<Array<number>>, initializers: Initializers): void;
export declare function addHoverHandlers(target: EventHandlers, style: WithHover<{}> | undefined, properties: WithHover<{}> | undefined, defaultProperties: AllOptionalProperties | undefined, hoveredSignal: Signal<Array<number>>, defaultCursor?: string): void;
export declare function createHoverPropertyTransformers(hoveredSignal: Signal<Array<number>>): PropertyTransformers;
export declare function setCursorType(ref: unknown, type: string): void;
export declare function unsetCursorType(ref: unknown): void;
