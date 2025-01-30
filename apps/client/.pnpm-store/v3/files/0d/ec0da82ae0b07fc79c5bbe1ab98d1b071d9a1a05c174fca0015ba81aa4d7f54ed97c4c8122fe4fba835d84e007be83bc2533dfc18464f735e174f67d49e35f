import { effect, signal } from '@preact/signals-core';
import { loadCachedFont } from './cache.js';
import { computedInheritableProperty } from '../properties/index.js';
import { inter } from '@pmndrs/msdfonts';
const fontWeightNames = {
    thin: 100,
    'extra-light': 200,
    light: 300,
    normal: 400,
    medium: 500,
    'semi-bold': 600,
    bold: 700,
    'extra-bold': 800,
    black: 900,
    'extra-black': 950,
};
const defaultFontFamilyUrls = {
    inter,
};
export function computedFont(properties, fontFamiliesSignal, renderer, initializers) {
    const result = signal(undefined);
    const fontFamily = computedInheritableProperty(properties, 'fontFamily', undefined);
    const fontWeight = computedInheritableProperty(properties, 'fontWeight', 'normal');
    initializers.push(() => effect(() => {
        const fontFamilies = fontFamiliesSignal?.value ?? defaultFontFamilyUrls;
        let resolvedFontFamily = fontFamily.value;
        if (resolvedFontFamily == null) {
            resolvedFontFamily = Object.keys(fontFamilies)[0];
        }
        const url = getMatchingFontUrl(fontFamilies[resolvedFontFamily], typeof fontWeight.value === 'string' ? fontWeightNames[fontWeight.value] : fontWeight.value);
        let canceled = false;
        loadCachedFont(url, renderer, (font) => !canceled && (result.value = font));
        return () => (canceled = true);
    }));
    return result;
}
function getMatchingFontUrl(fontFamily, weight) {
    let distance = Infinity;
    let result;
    for (const fontWeight in fontFamily) {
        const d = Math.abs(weight - getWeightNumber(fontWeight));
        if (d === 0) {
            return fontFamily[fontWeight];
        }
        if (d < distance) {
            distance = d;
            result = fontFamily[fontWeight];
        }
    }
    if (result == null) {
        throw new Error(`font family has no entries ${fontFamily}`);
    }
    return result;
}
function getWeightNumber(value) {
    if (value in fontWeightNames) {
        return fontWeightNames[value];
    }
    const number = parseFloat(value);
    if (isNaN(number)) {
        throw new Error(`invalid font weight "${value}"`);
    }
    return number;
}
export class Font {
    page;
    glyphInfoMap = new Map();
    kerningMap = new Map();
    questionmarkGlyphInfo;
    //needed in the shader:
    pageWidth;
    pageHeight;
    distanceRange;
    constructor(info, page) {
        this.page = page;
        const { scaleW, scaleH, lineHeight } = info.common;
        this.pageWidth = scaleW;
        this.pageHeight = scaleH;
        this.distanceRange = info.distanceField.distanceRange;
        const { size } = info.info;
        for (const glyph of info.chars) {
            glyph.uvX = glyph.x / scaleW;
            glyph.uvY = glyph.y / scaleH;
            glyph.uvWidth = glyph.width / scaleW;
            glyph.uvHeight = glyph.height / scaleH;
            glyph.width /= size;
            glyph.height /= size;
            glyph.xadvance /= size;
            glyph.xoffset /= size;
            glyph.yoffset -= lineHeight - size;
            glyph.yoffset /= size;
            this.glyphInfoMap.set(glyph.char, glyph);
        }
        for (const { first, second, amount } of info.kernings) {
            this.kerningMap.set(`${first}/${second}`, amount / size);
        }
        const questionmarkGlyphInfo = this.glyphInfoMap.get('?');
        if (questionmarkGlyphInfo == null) {
            throw new Error("missing '?' glyph in font");
        }
        this.questionmarkGlyphInfo = questionmarkGlyphInfo;
    }
    getGlyphInfo(char) {
        return (this.glyphInfoMap.get(char) ??
            (char == '\n' ? this.glyphInfoMap.get(' ') : this.questionmarkGlyphInfo) ??
            this.questionmarkGlyphInfo);
    }
    getKerning(firstId, secondId) {
        return this.kerningMap.get(`${firstId}/${secondId}`) ?? 0;
    }
}
export function glyphIntoToUV(info, target, offset) {
    target[offset + 0] = info.uvX;
    target[offset + 1] = info.uvY + info.uvHeight;
    target[offset + 2] = info.uvWidth;
    target[offset + 3] = -info.uvHeight;
}
