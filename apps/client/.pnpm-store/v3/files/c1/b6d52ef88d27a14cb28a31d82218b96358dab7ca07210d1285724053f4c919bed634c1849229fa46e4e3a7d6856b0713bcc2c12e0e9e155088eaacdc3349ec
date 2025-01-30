import { percentageRegex } from '../utils.js';
export function getGlyphOffsetX(font, fontSize, glyphInfo, prevGlyphId) {
    const kerning = prevGlyphId == null ? 0 : font.getKerning(prevGlyphId, glyphInfo.id);
    return (kerning + glyphInfo.xoffset) * fontSize;
}
function lineHeightToAbsolute(lineHeight, fontSize) {
    if (typeof lineHeight === 'number') {
        return lineHeight;
    }
    const result = percentageRegex.exec(lineHeight);
    if (result == null) {
        throw new Error(`invalid line height "${lineHeight}"`);
    }
    return (fontSize * parseFloat(result[1])) / 100;
}
export function getGlyphOffsetY(fontSize, lineHeight, glyphInfo) {
    //glyphInfo undefined for the caret, which has no yoffset
    return (glyphInfo?.yoffset ?? 0) * fontSize + (lineHeightToAbsolute(lineHeight, fontSize) - fontSize) / 2;
}
export function getOffsetToNextGlyph(fontSize, glyphInfo, letterSpacing) {
    return glyphInfo.xadvance * fontSize + letterSpacing;
}
export function getOffsetToNextLine(lineHeight, fontSize) {
    return lineHeightToAbsolute(lineHeight, fontSize);
}
export function getGlyphLayoutWidth(layout) {
    return Math.max(...layout.lines.map(({ nonWhitespaceWidth }) => nonWhitespaceWidth));
}
export function getGlyphLayoutHeight(linesAmount, { lineHeight, fontSize }) {
    return Math.max(linesAmount, 1) * lineHeightToAbsolute(lineHeight, fontSize);
}
