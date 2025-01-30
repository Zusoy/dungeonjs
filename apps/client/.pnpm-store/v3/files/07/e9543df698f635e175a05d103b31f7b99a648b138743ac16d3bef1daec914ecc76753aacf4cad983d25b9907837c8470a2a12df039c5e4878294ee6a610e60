import { createConditionalPropertyTranslator } from './utils.js';
export function createFocusPropertyTransformers(hasFocusSignal) {
    return {
        focus: createConditionalPropertyTranslator(() => hasFocusSignal.value),
    };
}
