import { traverseProperties } from './properties/default.js';
import { createConditionalPropertyTranslator } from './utils.js';
import { addHandler } from './components/index.js';
export function addActiveHandlers(target, style, properties, defaultProperties, activeSignal) {
    let activePropertiesExist = false;
    traverseProperties(style, defaultProperties, properties, (p) => {
        if ('active' in p) {
            activePropertiesExist = true;
        }
    });
    if (!activePropertiesExist && style?.onActiveChange == null && properties?.onActiveChange == null) {
        //no need to listen to hover
        activeSignal.value.length = 0;
        return;
    }
    const onLeave = ({ pointerId }) => {
        activeSignal.value = activeSignal.value.filter((id) => id != pointerId);
        if (activeSignal.value.length > 0) {
            return;
        }
        properties?.onActiveChange?.(false);
        style?.onActiveChange?.(false);
    };
    addHandler('onPointerDown', target, ({ pointerId }) => {
        activeSignal.value = [pointerId, ...activeSignal.value];
        if (activeSignal.value.length != 1) {
            return;
        }
        properties?.onActiveChange?.(true);
        style?.onActiveChange?.(true);
    });
    addHandler('onPointerUp', target, onLeave);
    addHandler('onPointerLeave', target, onLeave);
}
export function createActivePropertyTransfomers(activeSignal) {
    return {
        active: createConditionalPropertyTranslator(() => activeSignal.value.length > 0),
    };
}
