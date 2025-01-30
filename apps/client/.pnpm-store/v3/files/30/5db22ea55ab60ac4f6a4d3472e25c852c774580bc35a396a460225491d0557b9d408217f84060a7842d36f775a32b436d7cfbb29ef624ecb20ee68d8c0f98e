import { Signal } from '@preact/signals-core';
import { AllOptionalProperties, Properties, WithClasses } from './properties/default.js';
import { EventHandlers } from './events.js';
export type WithActive<T> = T & {
    active?: T;
    onActiveChange?: (active: boolean) => void;
};
export type ActiveEventHandlers = Pick<EventHandlers, 'onPointerDown' | 'onPointerUp' | 'onPointerLeave'>;
export declare function addActiveHandlers(target: EventHandlers, style: (WithClasses<WithActive<Properties>> & EventHandlers) | undefined, properties: (WithClasses<WithActive<Properties>> & EventHandlers) | undefined, defaultProperties: AllOptionalProperties | undefined, activeSignal: Signal<Array<number>>): void;
export declare function createActivePropertyTransfomers(activeSignal: Signal<Array<number>>): {
    active: (properties: unknown, merged: import("./internals.js").MergedProperties) => void;
};
