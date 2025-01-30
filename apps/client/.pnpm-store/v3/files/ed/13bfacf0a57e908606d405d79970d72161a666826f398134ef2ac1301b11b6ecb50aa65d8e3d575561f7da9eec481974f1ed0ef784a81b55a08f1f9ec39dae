import { createConditionalPropertyTranslator } from './utils.js';
import { addHandler } from './components/index.js';
import { traverseProperties } from './properties/index.js';
export function setupCursorCleanup(hoveredSignal, initializers) {
    //cleanup cursor effect
    initializers.push(() => () => unsetCursorType(hoveredSignal));
}
export function addHoverHandlers(target, style, properties, defaultProperties, hoveredSignal, defaultCursor) {
    let hoverPropertiesExist = false;
    traverseProperties(style, properties, defaultProperties, (p) => {
        if ('hover' in p) {
            hoverPropertiesExist = true;
        }
    });
    const cursor = style?.cursor ?? properties?.cursor ?? defaultCursor;
    if (!hoverPropertiesExist && style?.onHoverChange == null && properties?.onHoverChange == null && cursor == null) {
        //no need to listen to hover
        hoveredSignal.value.length = 0;
        return;
    }
    addHandler('onPointerOver', target, ({ pointerId }) => {
        hoveredSignal.value = [pointerId, ...hoveredSignal.value];
        if (hoveredSignal.value.length === 1) {
            properties?.onHoverChange?.(true);
            style?.onHoverChange?.(true);
        }
        if (cursor != null) {
            setCursorType(hoveredSignal, cursor);
        }
    });
    addHandler('onPointerOut', target, ({ pointerId }) => {
        hoveredSignal.value = hoveredSignal.value.filter((id) => id != pointerId);
        if (hoveredSignal.value.length === 0) {
            properties?.onHoverChange?.(false);
            style?.onHoverChange?.(false);
        }
        unsetCursorType(hoveredSignal);
    });
}
export function createHoverPropertyTransformers(hoveredSignal) {
    return {
        hover: createConditionalPropertyTranslator(() => hoveredSignal.value.length > 0),
    };
}
const cursorRefStack = [];
const cursorTypeStack = [];
export function setCursorType(ref, type) {
    cursorRefStack.push(ref);
    cursorTypeStack.push(type);
    document.body.style.cursor = type;
}
export function unsetCursorType(ref) {
    const index = cursorRefStack.indexOf(ref);
    if (index == -1) {
        return;
    }
    cursorRefStack.splice(index, 1);
    cursorTypeStack.splice(index, 1);
    document.body.style.cursor = cursorTypeStack[cursorTypeStack.length - 1] ?? 'default';
}
