import { BreakallWrapper, NowrapWrapper, WordWrapper } from './wrapper/index.js';
import { getGlyphLayoutHeight } from './utils.js';
import { computed } from '@preact/signals-core';
import { MeasureMode } from 'yoga-layout/load';
import { readReactive } from '../utils.js';
import { computedInheritableProperty } from '../properties/index.js';
export function computedCustomLayouting(properties, fontSignal, textSignal, propertiesRef, defaultWordBreak) {
    const fontSize = computedInheritableProperty(properties, 'fontSize', 16);
    const letterSpacing = computedInheritableProperty(properties, 'letterSpacing', 0);
    const lineHeight = computedInheritableProperty(properties, 'lineHeight', '120%');
    const wordBreak = computedInheritableProperty(properties, 'wordBreak', defaultWordBreak);
    return computed(() => {
        const font = fontSignal.value;
        if (font == null) {
            return undefined;
        }
        const text = textSignal.value;
        const layoutProperties = {
            font,
            fontSize: fontSize.value,
            letterSpacing: letterSpacing.value,
            lineHeight: lineHeight.value,
            text: Array.isArray(text) ? text.map((t) => readReactive(t)).join('') : readReactive(text),
            wordBreak: wordBreak.value,
        };
        propertiesRef.current = layoutProperties;
        const { width: minWidth } = measureGlyphLayout(layoutProperties, 0);
        const { height: minHeight } = measureGlyphLayout(layoutProperties, undefined);
        return {
            minHeight,
            minWidth,
            measure: (width, widthMode) => measureGlyphLayout(layoutProperties, widthMode === MeasureMode.Undefined ? undefined : width),
        };
    });
}
const wrappers = {
    'keep-all': NowrapWrapper,
    'break-all': BreakallWrapper,
    'break-word': WordWrapper,
};
const lineHelper = {};
export function measureGlyphLayout(properties, availableWidth) {
    const wrapper = wrappers[properties.wordBreak];
    const text = properties.text;
    let width = 0;
    let lines = 0;
    let charIndex = 0;
    while (charIndex < text.length) {
        wrapper(properties, availableWidth, charIndex, lineHelper);
        width = Math.max(width, lineHelper.nonWhitespaceWidth);
        lines += 1;
        charIndex = lineHelper.charLength + lineHelper.charIndexOffset;
    }
    if (text[text.length - 1] === '\n') {
        lines += 1;
    }
    return { width, height: getGlyphLayoutHeight(lines, properties) };
}
export function buildGlyphLayout(properties, availableWidth, availableHeight) {
    const lines = [];
    const wrapper = wrappers[properties.wordBreak];
    const text = properties.text;
    let charIndex = 0;
    while (charIndex < text.length) {
        const line = {};
        wrapper(properties, availableWidth, charIndex, line);
        lines.push(line);
        charIndex = line.charLength + line.charIndexOffset;
    }
    if (lines.length === 0 || text[text.length - 1] === '\n') {
        lines.push({
            charLength: 0,
            nonWhitespaceWidth: 0,
            whitespacesBetween: 0,
            charIndexOffset: text.length,
            nonWhitespaceCharLength: 0,
        });
    }
    return {
        lines,
        availableHeight,
        availableWidth,
        ...properties,
    };
}
