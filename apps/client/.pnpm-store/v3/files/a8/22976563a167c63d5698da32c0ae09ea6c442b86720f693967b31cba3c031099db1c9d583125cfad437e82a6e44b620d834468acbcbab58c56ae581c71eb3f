import { Matrix4 } from 'three';
import { InstancedGlyphGroup } from './instanced-glyph-group.js';
import { ColorRepresentation } from '../../utils.js';
import { ClippingRect } from '../../clipping.js';
import { Font, FontFamilyProperties, GlyphInfo } from '../font.js';
import { Signal } from '@preact/signals-core';
import { GlyphLayoutProperties } from '../layout.js';
import { TextAlignProperties, TextAppearanceProperties } from './instanced-text.js';
export type InstancedTextProperties = TextAlignProperties & TextAppearanceProperties & Omit<GlyphLayoutProperties, 'text' | 'font'> & FontFamilyProperties;
export declare function computedGylphGroupDependencies(fontSignal: Signal<Font | undefined>): import("@preact/signals-core").ReadonlySignal<{
    font: Font | undefined;
}>;
/**
 * renders an initially specified glyph
 */
export declare class InstancedGlyph {
    private readonly group;
    private baseMatrix;
    private color;
    private opacity;
    private clippingRect;
    index?: number;
    private hidden;
    private glyphInfo?;
    private x;
    private y;
    private fontSize;
    private pixelSize;
    constructor(group: InstancedGlyphGroup, baseMatrix: Matrix4 | undefined, color: ColorRepresentation, opacity: number, clippingRect: ClippingRect | undefined);
    getX(widthMultiplier: number): number;
    show(): void;
    hide(): void;
    activate(index: number): void;
    setIndex(index: number): void;
    updateClippingRect(clippingRect: ClippingRect | undefined): void;
    updateColor(color: ColorRepresentation): void;
    updateOpacity(opacity: number): void;
    updateGlyphAndTransformation(glyphInfo: GlyphInfo, x: number, y: number, fontSize: number, pixelSize: number): void;
    updateBaseMatrix(baseMatrix: Matrix4): void;
    private writeUV;
    private writeUpdatedMatrix;
}
