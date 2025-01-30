import { createConditionalPropertyTranslator } from './utils.js';
const breakPoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};
const breakPointKeys = Object.keys(breakPoints);
const breakPointKeysLength = breakPointKeys.length;
export function createResponsivePropertyTransformers(rootSize) {
    const transformers = {};
    for (let i = 0; i < breakPointKeysLength; i++) {
        const key = breakPointKeys[i];
        transformers[key] = createConditionalPropertyTranslator(() => (rootSize.value?.[0] ?? 0) > breakPoints[key]);
    }
    return transformers;
}
